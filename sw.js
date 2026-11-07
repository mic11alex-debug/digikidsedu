// DigiKidsEdu service worker: πρώτα δίκτυο (πάντα η τελευταία έκδοση), αλλιώς αποθηκευμένο αντίγραφο (λειτουργία χωρίς ίντερνετ)
const C='dke-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/manifest.webmanifest','/icon-192.png','/icon-512.png','/favicon.svg']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.startsWith('/api/'))return;
 const font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
 if(u.origin!==location.origin&&!font)return;
 if(font){e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(x=>{caches.open(C).then(c=>c.put(r,x.clone()));return x}).catch(()=>m);return m||f}));return}
 e.respondWith(fetch(r).then(x=>{if(x.ok){const k=r.mode==='navigate'?'/':r;const y=x.clone();caches.open(C).then(c=>c.put(k,y))}return x}).catch(()=>caches.match(r.mode==='navigate'?'/':r).then(m=>m||new Response('Χωρίς σύνδεση',{status:503}))))});
