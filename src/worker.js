// DigiKidsEdu – λογαριασμοί χρηστών (Cloudflare Worker + D1)
const J = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
const enc = new TextEncoder();
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const unhex = (s) => Uint8Array.from(s.match(/../g).map((x) => parseInt(x, 16)));
const sha = async (s) => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
async function pbk(pw, salt) {
  const k = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, k, 256));
}
const GID = /^[A-Za-z0-9_-]{1,40}$/;
const now = () => Math.floor(Date.now() / 1000);
const cookie = (t, age) => `dke=${t}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;

async function auth(req, env) {
  const m = (req.headers.get('cookie') || '').match(/(?:^|;\s*)dke=([a-f0-9]{64})/);
  if (!m) return null;
  const r = await env.DB.prepare('SELECT u.id,u.name,u.email FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(await sha(m[1]), now()).first();
  return r || null;
}
async function newSession(env, uid) {
  const t = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').bind(await sha(t), uid, now() + 30 * 86400).run();
  return t;
}
async function limited(env, ip) {
  await env.DB.prepare('DELETE FROM attempts WHERE ts<?').bind(now() - 600).run();
  const r = await env.DB.prepare('SELECT COUNT(*) c FROM attempts WHERE ip=? AND ts>?').bind(ip, now() - 600).first();
  return r.c >= 10;
}
async function snapshot(env, u) {
  const [f, p, t] = await Promise.all([
    env.DB.prepare('SELECT game_id FROM favs WHERE user_id=?').bind(u.id).all(),
    env.DB.prepare('SELECT game_id,n,t FROM scores WHERE user_id=?').bind(u.id).all(),
    env.DB.prepare('SELECT id,title,game_id,done FROM tasks WHERE user_id=? ORDER BY done,id DESC LIMIT 200').bind(u.id).all(),
  ]);
  const prog = {};
  p.results.forEach((r) => (prog[r.game_id] = { n: r.n, t: r.t }));
  return { user: { name: u.name, email: u.email }, favs: f.results.map((r) => r.game_id), progress: prog, tasks: t.results };
}

async function api(req, env, url) {
  const path = url.pathname;
  if (req.method !== 'GET') {
    const o = req.headers.get('origin');
    if (o && new URL(o).host !== url.host) return J({ error: 'Μη επιτρεπτό αίτημα.' }, 403);
    if (!(req.headers.get('content-type') || '').includes('application/json')) return J({ error: 'Μη έγκυρο αίτημα.' }, 415);
  }
  let b = {};
  if (req.method !== 'GET') { try { b = await req.json(); } catch (e) { return J({ error: 'Μη έγκυρα δεδομένα.' }, 400); } }
  const ip = req.headers.get('cf-connecting-ip') || 'x';

  if (path === '/api/register') {
    const name = String(b.name || '').trim().slice(0, 60), email = String(b.email || '').trim().toLowerCase().slice(0, 120), pw = String(b.password || '');
    if (name.length < 2) return J({ error: 'Γράψε ένα όνομα.' }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return J({ error: 'Το email δεν είναι έγκυρο.' }, 400);
    if (pw.length < 8 || pw.length > 100) return J({ error: 'Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.' }, 400);
    if (!b.consent) return J({ error: 'Χρειάζεται να αποδεχτείς τους όρους χρήσης.' }, 400);
    if (await limited(env, ip)) return J({ error: 'Πολλές προσπάθειες. Δοκίμασε ξανά σε λίγα λεπτά.' }, 429);
    await env.DB.prepare('INSERT INTO attempts(user_id,ip,ts) VALUES(0,?,?)').bind(ip, now()).run();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    try {
      const r = await env.DB.prepare('INSERT INTO users(email,name,salt,hash,created_at) VALUES(?,?,?,?,?)').bind(email, name, hex(salt), await pbk(pw, salt), now()).run();
      const t = await newSession(env, r.meta.last_row_id);
      return J({ ok: true }, 200, { 'set-cookie': cookie(t, 30 * 86400) });
    } catch (e) { return J({ error: 'Υπάρχει ήδη λογαριασμός με αυτό το email.' }, 409); }
  }
  if (path === '/api/login') {
    if (await limited(env, ip)) return J({ error: 'Πολλές προσπάθειες. Δοκίμασε ξανά σε λίγα λεπτά.' }, 429);
    await env.DB.prepare('INSERT INTO attempts(user_id,ip,ts) VALUES(0,?,?)').bind(ip, now()).run();
    const email = String(b.email || '').trim().toLowerCase();
    const u = await env.DB.prepare('SELECT id,salt,hash FROM users WHERE email=?').bind(email).first();
    const h = u ? await pbk(String(b.password || ''), unhex(u.salt)) : '';
    if (!u || h !== u.hash) return J({ error: 'Λάθος email ή κωδικός.' }, 401);
    const t = await newSession(env, u.id);
    return J({ ok: true }, 200, { 'set-cookie': cookie(t, 30 * 86400) });
  }
  if (path === '/api/logout') {
    const m = (req.headers.get('cookie') || '').match(/dke=([a-f0-9]{64})/);
    if (m) await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await sha(m[1])).run();
    return J({ ok: true }, 200, { 'set-cookie': cookie('', 0) });
  }
  const u = await auth(req, env);
  if (path === '/api/me') return u ? J(await snapshot(env, u)) : J({ user: null });
  if (!u) return J({ error: 'Χρειάζεται σύνδεση.' }, 401);

  if (path === '/api/fav') {
    if (!GID.test(b.game_id || '')) return J({ error: 'Μη έγκυρο παιχνίδι.' }, 400);
    const ex = await env.DB.prepare('SELECT 1 x FROM favs WHERE user_id=? AND game_id=?').bind(u.id, b.game_id).first();
    if (ex) await env.DB.prepare('DELETE FROM favs WHERE user_id=? AND game_id=?').bind(u.id, b.game_id).run();
    else await env.DB.prepare('INSERT INTO favs(user_id,game_id) VALUES(?,?)').bind(u.id, b.game_id).run();
    return J({ ok: true, fav: !ex });
  }
  if (path === '/api/progress') {
    const n = Number(b.n), t = Number(b.t);
    if (!GID.test(b.game_id || '') || !Number.isInteger(n) || !Number.isInteger(t) || t < 1 || t > 30 || n < 0 || n > t) return J({ error: 'Μη έγκυρα δεδομένα.' }, 400);
    await env.DB.prepare('INSERT INTO scores(user_id,game_id,n,t,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(user_id,game_id) DO UPDATE SET n=MAX(n,excluded.n),t=excluded.t,updated_at=excluded.updated_at').bind(u.id, b.game_id, n, t, now()).run();
    return J({ ok: true });
  }
  if (path === '/api/task') {
    const title = String(b.title || '').trim().slice(0, 120);
    if (!title) return J({ error: 'Γράψε μια εργασία.' }, 400);
    const g = GID.test(b.game_id || '') ? b.game_id : null;
    const n = await env.DB.prepare('SELECT COUNT(*) c FROM tasks WHERE user_id=?').bind(u.id).first();
    if (n.c >= 200) return J({ error: 'Έχεις πολλές εργασίες. Σβήσε μερικές.' }, 400);
    await env.DB.prepare('INSERT INTO tasks(user_id,title,game_id,done,created_at) VALUES(?,?,?,0,?)').bind(u.id, title, g, now()).run();
    return J({ ok: true });
  }
  if (path === '/api/task/done') {
    await env.DB.prepare('UPDATE tasks SET done=? WHERE id=? AND user_id=?').bind(b.done ? 1 : 0, Number(b.id) || 0, u.id).run();
    return J({ ok: true });
  }
  if (path === '/api/task/delete') {
    await env.DB.prepare('DELETE FROM tasks WHERE id=? AND user_id=?').bind(Number(b.id) || 0, u.id).run();
    return J({ ok: true });
  }
  if (path === '/api/account/delete') {
    for (const t of ['favs', 'scores', 'tasks', 'sessions']) await env.DB.prepare(`DELETE FROM ${t} WHERE user_id=?`).bind(u.id).run();
    await env.DB.prepare('DELETE FROM users WHERE id=?').bind(u.id).run();
    return J({ ok: true }, 200, { 'set-cookie': cookie('', 0) });
  }
  return J({ error: 'Δεν βρέθηκε.' }, 404);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api/')) {
      try { return await api(req, env, url); } catch (e) { return J({ error: 'Σφάλμα διακομιστή. Δοκίμασε ξανά.' }, 500); }
    }
    return env.ASSETS.fetch(req);
  },
};
