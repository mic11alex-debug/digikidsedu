/* DigiKidsEdu — κοινή βιβλιοθήκη για τα παιχνίδια arcade */
(function(){
const A=window.ARC={};
const css=`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}
html,body{margin:0;height:100%;overflow:hidden;font-family:'Anek Greek',system-ui,sans-serif;touch-action:none;background:#120c35}
#cv{position:fixed;inset:0;width:100%;height:100%;display:block}
.aov{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;padding:14px;background:radial-gradient(circle at 50% 40%,rgba(20,15,60,.45),rgba(8,5,30,.85));overflow:auto}
.aov.h{display:none}
.acard{background:linear-gradient(180deg,#fffaf0,var(--cb,#ffe7c2));border:5px solid #1a1446;border-radius:28px;box-shadow:0 10px 0 #1a1446,0 20px 50px #000a;padding:20px 20px 22px;max-width:540px;width:100%;text-align:center;color:#1a1446}
.acard h1{margin:4px 0 0;font-size:clamp(34px,8vw,56px);line-height:1.02;background:var(--tg,linear-gradient(180deg,#ff7a3d,#d6247a));-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 3px 0 #1a1446)}
.acard p{font-size:17px;margin:10px 0 14px;font-weight:600;color:#4a3a6a;line-height:1.35}
.aem{font-size:48px;line-height:1;display:flex;justify-content:center;gap:6px}.aem span{display:inline-block;animation:abob 1.8s ease-in-out infinite}.aem span:nth-child(2){animation-delay:.25s}.aem span:nth-child(3){animation-delay:.5s}
@keyframes abob{50%{transform:translateY(-9px) rotate(8deg)}}
.agrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.abt{font:inherit;font-weight:800;font-size:19px;border:4px solid #1a1446;border-radius:18px;padding:12px 10px 10px;cursor:pointer;box-shadow:0 5px 0 #1a1446;color:#1a1446;background:linear-gradient(180deg,#7ef0a8,#2fc46b)}
.abt small{display:block;font-size:13px;font-weight:600;margin-top:1px}
.abt:active{transform:translateY(3px);box-shadow:0 2px 0 #1a1446}
.abt.c2{background:linear-gradient(180deg,#8fd8ff,#3a9ee8)}.abt.c3{background:linear-gradient(180deg,#ffd76a,#f7a21b)}.abt.c4{background:linear-gradient(180deg,#d4b8ff,#9b6bff)}.abt.c5{background:linear-gradient(180deg,#ffb3a8,#ff5a5f)}
.abest{margin-top:12px;font-weight:700;color:#6b4b00}
.ahelp{margin-top:10px;font-size:14px;color:#5b4a7a;font-weight:600;line-height:1.5}
.ahelp b{background:#fff;border:2px solid #1a1446;border-radius:6px;padding:0 6px;font-size:13px}
.abig{font-size:60px;font-weight:800;line-height:1;margin:6px 0;color:#d6247a}
.astars{font-size:40px;letter-spacing:5px}
.atop{position:fixed;top:8px;right:8px;z-index:10;display:none;gap:6px}
.atop button{width:44px;height:44px;border-radius:14px;border:3px solid #1a1446;background:#fffaf0;font:800 18px 'Anek Greek';cursor:pointer;box-shadow:0 3px 0 #1a1446;color:#1a1446}
.apad{position:fixed;left:0;right:0;bottom:0;z-index:10;display:none;justify-content:space-between;align-items:flex-end;padding:10px;pointer-events:none}
.apad .g{display:flex;gap:8px;pointer-events:auto;align-items:flex-end}
.apad .g.dp{display:grid;grid-template-columns:repeat(3,58px);grid-template-rows:repeat(2,58px);gap:6px}
.apad button{width:58px;height:58px;border-radius:18px;border:3px solid #1a1446;background:#fffaf0cc;font:800 24px 'Anek Greek';color:#1a1446;box-shadow:0 4px 0 #1a1446;touch-action:none;cursor:pointer}
.apad button.on{transform:translateY(3px);box-shadow:0 1px 0 #1a1446;background:#ffe14d}
.apad button.big{width:78px;height:78px;border-radius:50%;background:linear-gradient(180deg,#ff8a5c,#e0245e);color:#fff;font-size:30px}
@media(max-width:440px){.apad button{width:48px;height:48px;border-radius:15px;font-size:20px}.apad button.big{width:64px;height:64px}.apad .g{gap:5px}.apad .g.dp{grid-template-columns:repeat(3,52px);grid-template-rows:repeat(2,52px)}.apad .g.dp button{width:52px;height:52px}}
.atip{position:fixed;left:50%;top:60px;transform:translateX(-50%);z-index:11;background:#1a1446d9;color:#fff;padding:7px 16px;border-radius:99px;font-weight:700;font-size:15px;pointer-events:none;transition:opacity .4s;opacity:0;white-space:nowrap;max-width:94vw;overflow:hidden;text-overflow:ellipsis}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
if(!document.querySelector('link[href*="Anek"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Anek+Greek:wght@600;800&display=swap';document.head.appendChild(l)}
A.rnd=(a,b)=>a+Math.random()*(b-a);A.ri=(a,b)=>Math.floor(A.rnd(a,b+1));A.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));A.pick=a=>a[Math.floor(Math.random()*a.length)];
A.shade=(h,p)=>{let n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(v+p*2.55)));return `rgb(${f(r)},${f(g)},${f(b)})`};
A.rr=(c,x,y,w,h,r)=>{r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
A.touch=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
// canvas
A.cv=document.createElement('canvas');A.cv.id='cv';document.body.prepend(A.cv);A.cx=A.cv.getContext('2d');
A.onResize=null;
function rs(){A.DPR=Math.min(2,devicePixelRatio||1);A.W=innerWidth;A.H=innerHeight;A.cv.width=A.W*A.DPR;A.cv.height=A.H*A.DPR;A.cx.setTransform(A.DPR,0,0,A.DPR,0,0);A.onResize&&A.onResize()}
addEventListener('resize',rs);rs();
// audio
let AC=null;A.ac=()=>{if(!AC)try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC&&AC.state=='suspended')AC.resume();return AC};
A.mute=false;try{A.mute=localStorage.getItem('arc.mute')=='1'}catch(e){}
A.tone=(f,d,type='sine',vol=.15,f2,delay=0)=>{if(A.mute)return;const a=A.ac();if(!a)return;const t0=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.001,t0+d);o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+d+.02)};
A.noise=(d,f0,f1,vol,type='lowpass')=>{if(A.mute)return;const a=A.ac();if(!a)return;const n=a.createBufferSource(),b=a.createBuffer(1,a.sampleRate*d,a.sampleRate),dt=b.getChannelData(0);for(let i=0;i<dt.length;i++)dt[i]=Math.random()*2-1;n.buffer=b;const fl=a.createBiquadFilter();fl.type=type;fl.frequency.setValueAtTime(f0,a.currentTime);fl.frequency.exponentialRampToValueAtTime(f1,a.currentTime+d);const g=a.createGain();g.gain.setValueAtTime(vol,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);n.connect(fl);fl.connect(g);g.connect(a.destination);n.start()};
A.win=()=>[0,4,7,12,16].forEach((s,i)=>A.tone(523*Math.pow(2,s/12),.22,'square',.07,0,i*.11));
A.lose=()=>[7,4,0,-5].forEach((s,i)=>A.tone(392*Math.pow(2,s/12),.28,'sawtooth',.06,0,i*.16));
A.coin=()=>{A.tone(988,.08,'square',.07);A.tone(1319,.25,'square',.07,0,.08)};
A.blip=(f=600)=>A.tone(f,.06,'square',.06);
A.boom=(v=.6)=>{A.noise(.8,1400,40,v);A.tone(70,.5,'sawtooth',.2,30)};
// storage
A.key='arc';A.get=(k,d)=>{try{const v=localStorage.getItem(A.key+'.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}};A.set=(k,v)=>{try{localStorage.setItem(A.key+'.'+k,JSON.stringify(v))}catch(e){}};
A.best=(k,score)=>{const b=A.get('best.'+k,0);if(score!=null&&score>b){A.set('best.'+k,score);return [score,true]}return [b,false]};
A.post=(n,t)=>{try{parent.postMessage({sgame:1,n:Math.max(0,Math.min(t,Math.round(n))),t},'*')}catch(e){}};
// keys
A.keys={};addEventListener('keydown',e=>{A.keys[e.key]=1;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();A.onKey&&A.onKey(e.key,e)});addEventListener('keyup',e=>{A.keys[e.key]=0;A.onKeyUp&&A.onKeyUp(e.key,e)});
A.held={};
// UI
function el(h){const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
A.tipEl=el('<div class="atip"></div>');document.body.appendChild(A.tipEl);let tt=0;A.tip=(s,ms=2600)=>{A.tipEl.textContent=s;A.tipEl.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>A.tipEl.style.opacity=0,ms)};
A.top=el('<div class="atop"><button data-a="mute" aria-label="Ήχος">🔊</button><button data-a="pause" aria-label="Παύση">❚❚</button></div>');document.body.appendChild(A.top);
const mb=A.top.querySelector('[data-a=mute]');const mupd=()=>mb.textContent=A.mute?'🔇':'🔊';mupd();mb.onclick=()=>{A.mute=!A.mute;try{localStorage.setItem('arc.mute',A.mute?'1':'0')}catch(e){}mupd()};
A.top.querySelector('[data-a=pause]').onclick=()=>A.pause();
A.paused=false;A.running=false;
A.menuEl=el('<div class="aov"><div class="acard"></div></div>');A.overEl=el('<div class="aov h"><div class="acard"></div></div>');A.pauseEl=el('<div class="aov h"><div class="acard"><h1>Παύση</h1><p>Πάρε μια ανάσα!</p><div class="agrid"><button class="abt" data-a="res">▶ Συνέχεια</button><button class="abt c3" data-a="menu">🏠 Μενού</button></div></div></div>');
document.body.append(A.menuEl,A.overEl,A.pauseEl);
A.pauseEl.querySelector('[data-a=res]').onclick=()=>A.resume();A.pauseEl.querySelector('[data-a=menu]').onclick=()=>A.toMenu();
A.setup=o=>{A.cfg=o;A.key='arc.'+o.id;const c=A.menuEl.firstChild;if(o.cardBg)document.documentElement.style.setProperty('--cb',o.cardBg);if(o.title2)document.documentElement.style.setProperty('--tg',o.title2);
 c.innerHTML=`<div class="aem">${[...(o.emoji||[])].map(e=>`<span>${e}</span>`).join('')}</div><h1>${o.title}</h1><p>${o.desc||''}</p><div class="agrid">${o.modes.map((m,i)=>`<button class="abt ${m.c||''}" data-i="${i}">${m.label}${m.small?`<small>${m.small}</small>`:''}</button>`).join('')}</div><div class="abest"></div>${o.help?`<div class="ahelp">${o.help}</div>`:''}`;
 c.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{A.ac();A.startMode(+b.dataset.i)});A.toMenu()};
A.startMode=i=>{A.modeI=i;A.menuEl.classList.add('h');A.overEl.classList.add('h');A.pauseEl.classList.add('h');A.top.style.display='flex';A.running=true;A.paused=false;A.showPad(true);A.cfg.modes[i].fn&&A.cfg.modes[i].fn(i)};
A.toMenu=()=>{A.running=false;A.paused=false;A.menuEl.classList.remove('h');A.overEl.classList.add('h');A.pauseEl.classList.add('h');A.top.style.display='none';A.showPad(false);const b=A.menuEl.querySelector('.abest');b.textContent=A.cfg.bestText?A.cfg.bestText():'';A.cfg.onMenu&&A.cfg.onMenu()};
A.pause=()=>{if(!A.running||A.paused)return;A.paused=true;A.pauseEl.classList.remove('h')};A.resume=()=>{A.paused=false;A.pauseEl.classList.add('h')};
addEventListener('keydown',e=>{if((e.key=='Escape'||e.key=='p')&&A.running){A.paused?A.resume():A.pause()}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)A.pause()});
A.gameOver=o=>{A.running=false;A.showPad(false);A.top.style.display='none';setTimeout(()=>{const c=A.overEl.firstChild;const st=o.stars==null?'':'⭐'.repeat(o.stars)+'<span style="opacity:.25">'+'⭐'.repeat(3-o.stars)+'</span>';
 c.innerHTML=`<h1>${o.title}</h1>${st?`<div class="astars">${st}</div>`:''}${o.score!=null?`<div class="abig">${o.score}</div>`:''}<p>${o.msg||''}</p><div class="agrid">${(o.buttons||[{label:'🔁 Ξανά',fn:()=>A.startMode(A.modeI)},{label:'🏠 Μενού',c:'c3',fn:()=>A.toMenu()}]).map((b,i)=>`<button class="abt ${b.c||''}" data-i="${i}">${b.label}</button>`).join('')}</div>`;
 c.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>(o.buttons||[{fn:()=>A.startMode(A.modeI)},{fn:()=>A.toMenu()}])[+b.dataset.i].fn());A.overEl.classList.remove('h')},o.delay??700)};
// touch pad
A.padEl=el('<div class="apad"></div>');document.body.appendChild(A.padEl);A.padCfg=null;
A.pad=cfg=>{A.padCfg=cfg;A.padEl.innerHTML='';for(const side of ['left','right']){const g=cfg[side];if(!g)continue;const d=document.createElement('div');d.className='g'+(g.dpad?' dp':'');
 const btns=g.dpad?[['','',''],['L','D','R']].flat():g.btns;
 if(g.dpad){const lay=[null,'U',null,'L','D','R'];lay.forEach(k=>{if(!k){d.appendChild(document.createElement('span'));return}d.appendChild(mkb(k,{U:'▲',D:'▼',L:'◀',R:'▶'}[k]))})}
 else g.btns.forEach(b=>d.appendChild(mkb(b.k,b.t,b.big)));A.padEl.appendChild(d)}
 if(!cfg.left||!cfg.right){A.padEl.style.justifyContent=cfg.left?'flex-start':'flex-end'}};
function mkb(k,t,big){const b=document.createElement('button');b.textContent=t;if(big)b.className='big';const on=e=>{e.preventDefault();A.held[k]=1;b.classList.add('on');A.onPad&&A.onPad(k,true)};const off=e=>{if(!A.held[k])return;A.held[k]=0;b.classList.remove('on');A.onPad&&A.onPad(k,false)};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);return b}
A.showPad=v=>{A.padEl.style.display=v&&A.padCfg&&A.touch?'flex':'none'};
// swipe
A.swipe=fn=>{let s=null;A.cv.addEventListener('pointerdown',e=>{s={x:e.clientX,y:e.clientY,t:performance.now()}});addEventListener('pointerup',e=>{if(!s)return;const dx=e.clientX-s.x,dy=e.clientY-s.y;const d=Math.hypot(dx,dy);if(d>24){Math.abs(dx)>Math.abs(dy)?fn(dx>0?'R':'L'):fn(dy>0?'D':'U')}else fn('tap',s);s=null})};
// loop
A.loop=fn=>{let last=0;function f(now){requestAnimationFrame(f);let dt=Math.min(.034,(now-last)/1000||0);last=now;fn(A.paused?0:dt,now/1000)}requestAnimationFrame(f)};
// particles & floating text helpers
A.P=[];A.T=[];
A.burst=(x,y,n,cols,sp=220,life=.7,sz=4,g=600)=>{for(let i=0;i<n;i++){const q=Math.random()*6.283,s=A.rnd(.3,1)*sp;A.P.push({x,y,vx:Math.cos(q)*s,vy:Math.sin(q)*s,r:A.rnd(.5,1.2)*sz,c:A.pick(cols),t:0,l:A.rnd(.6,1)*life,g})}};
A.text=(x,y,s,c='#fff',size=26)=>A.T.push({x,y,s,c,size,t:0});
A.stepFX=dt=>{for(const p of A.P){p.t+=dt;p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt}A.P=A.P.filter(p=>p.t<p.l);for(const t of A.T)t.t+=dt;A.T=A.T.filter(t=>t.t<1.1)};
A.drawFX=(c=A.cx)=>{for(const p of A.P){c.globalAlpha=Math.max(0,1-p.t/p.l);c.fillStyle=p.c;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()}c.globalAlpha=1;for(const t of A.T){const k=t.t/1.1;c.save();c.globalAlpha=1-k*k;c.font=`800 ${t.size*(1+.25*Math.sin(Math.min(1,t.t*6)*3.14))}px 'Anek Greek'`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=Math.max(3,t.size/6);c.strokeStyle='#1a1446';c.strokeText(t.s,t.x,t.y-k*40);c.fillStyle=t.c;c.fillText(t.s,t.x,t.y-k*40);c.restore()}};
A.hud=(items,c=A.cx)=>{c.save();c.font=`800 ${Math.max(18,Math.min(28,A.W*.035))}px 'Anek Greek'`;c.textBaseline='middle';let x=12;for(const it of items){const s=it;const w=c.measureText(s).width+24;c.fillStyle='rgba(20,15,50,.55)';A.rr(c,x,10,w,40,14);c.fill();c.fillStyle='#fff';c.fillText(s,x+12,31);x+=w+8}c.restore()};
})();
