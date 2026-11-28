/* DigiKidsEdu – κοινοί χαρακτήρες (Παρκούρ Ουρανού & Χτίστης Κόσμων)
   drawChar(ctx, x, y(πόδια), ύψος, είδος, πρόσωπο(±1), 'side'|'back', φάση, στον_αέρα) */
const CH_INK='#1e1b4b';
function chShade(h,f){const n=parseInt(h.slice(1),16);let r=n>>16&255,g=n>>8&255,b=n&255;if(f<1){r*=f;g*=f;b*=f}else{const q=f-1;r+=(255-r)*q;g+=(255-g)*q;b+=(255-b)*q}return'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'}
function chGrad(c,col,x0,y0,x1,y1){const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,chShade(col,1.32));g.addColorStop(.5,col);g.addColorStop(1,chShade(col,.72));return g}

/* ---------- Παλιά ζωάκια (εφεδρικά αν δεν φορτώσουν οι εικόνες) ---------- */
function drawPet(c,x,y,h,kind,face,view,ph,air){
 const dog=kind==='dog',PL={dog:['#e2a65b','#8a5524','#fff3dc'],cat:['#a78bfa','#6d28d9','#f3e8ff']}[kind]||['#a78bfa','#6d28d9','#f3e8ff'],K=h/66,body=PL[0],dark=PL[1],light=PL[2],ink=CH_INK;
 const sw=air?0:Math.sin(ph);
 const rr=(a,b,w,hh,r)=>{c.beginPath();c.roundRect(a,b,w,hh,r);c.fill();c.stroke()};
 c.save();c.translate(x,y);c.scale(K,K);c.lineWidth=2.6;c.strokeStyle=ink;c.lineJoin='round';c.lineCap='round';
 c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(0,1,19,4,0,0,7);c.fill();
 if(view==='side'&&face<0)c.scale(-1,1);
 c.fillStyle=body;rr(-16,-42,32,30,11);c.beginPath();c.arc(view==='side'?13:0,-48,14,0,7);c.fill();c.stroke();
 c.fillStyle=ink;c.beginPath();c.arc(view==='side'?18:-5,-51,3,0,7);c.fill();
 c.fillStyle=dark;rr(-12,-14,8,14-sw*2,3);rr(4,-14,8,14+sw*2,3);
 c.restore()}

/* ---------- Νέοι χαρακτήρες (chibi) ---------- */
const CHIBI={
 fox:{skin:'#f97316',lt:'#fff1e0',dk:'#7c2d12',top:'#38bdf8',trim:'#ffffff',bot:'#7c2d12',shoe:'#1e3a8a',eye:'#7c2d12'},
 bunny:{skin:'#f1f5f9',lt:'#ffffff',dk:'#cbd5e1',top:'#fde047',trim:'#f472b6',bot:'#f472b6',shoe:'#f9a8d4',eye:'#be185d'},
 boy:{skin:'#f1c27d',lt:'#ffe2b5',dk:'#c58a4a',top:'#2563eb',trim:'#ffffff',bot:'#1e3a8a',shoe:'#ef4444',hair:'#5b3a1e',eye:'#3b2a14',pack:'#f97316'},
 girl:{skin:'#f1c27d',lt:'#ffe2b5',dk:'#c58a4a',top:'#ec4899',trim:'#fde047',bot:'#7c3aed',shoe:'#f9a8d4',hair:'#7c2d12',eye:'#3b2a14',bow:'#fde047'},
 astro:{skin:'#f1c27d',lt:'#ffe2b5',dk:'#c58a4a',top:'#f8fafc',trim:'#f97316',bot:'#e2e8f0',shoe:'#64748b',eye:'#3b2a14',pack:'#94a3b8'},
 mage:{skin:'#f1c27d',lt:'#ffe2b5',dk:'#c58a4a',top:'#7c3aed',trim:'#facc15',bot:'#5b21b6',shoe:'#78350f',eye:'#3b2a14',hair:'#f1f5f9'}
};
function drawChibi(c,x,y,h,kind,face,view,ph,air){
 const o=CHIBI[kind],K=h/66,ink=CH_INK,sw=air?0:Math.sin(ph),side=view==='side';
 const fox=kind==='fox',bun=kind==='bunny',boy=kind==='boy',girl=kind==='girl',astro=kind==='astro',mage=kind==='mage',animal=fox||bun;
 const G=(col,a,b,w,hh)=>chGrad(c,col,a,b,a+w,b+hh);
 const R=(a,b,w,hh,col,r)=>{c.fillStyle=G(col,a,b,w,hh);c.beginPath();c.roundRect(a,b,w,hh,r==null?3:r);c.fill();c.stroke()};
 const E=(a,b,rx,ry,col,rot)=>{c.fillStyle=typeof col==='string'&&col[0]==='#'?G(col,a-rx,b-ry,rx*2,ry*2):col;c.beginPath();c.ellipse(a,b,rx,ry,rot||0,0,7);c.fill();c.stroke()};
 const dot=(a,b,r,col)=>{c.fillStyle=col;c.beginPath();c.arc(a,b,r,0,7);c.fill()};
 const legc=animal?(fox?o.dk:o.lt):o.bot;
 c.save();c.translate(x,y);c.scale(K,K);c.lineWidth=2.3;c.strokeStyle=ink;c.lineJoin='round';c.lineCap='round';
 c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(0,1,20,4.5,0,0,7);c.fill();
 if(side&&face<0)c.scale(-1,1);
 const leg=(px,ang)=>{c.save();c.translate(px,-16);c.rotate(air?(px<=0?.5:-.35):ang);R(-4,0,8,10,legc,3);R(-5.2,8.5,side?13:11,7,o.shoe,3.5);c.fillStyle='rgba(255,255,255,.75)';c.fillRect(-4.2,14,side?11:9,1.6);c.restore()};
 const arm=(px,ang,front)=>{c.save();c.translate(px,-36);c.rotate(air?(front?-2.5:-2.2):ang);R(-3.6,-1,7.2,11,astro?'#f8fafc':(animal?o.skin:o.top),3.5);if(!animal&&!mage&&!astro){R(-3.8,7,7.6,3,o.trim,1.5)}if(mage)R(-4.5,7,9,3.5,o.trim,1.5);dot(0,13.5,4.4,astro?'#fff':(mage||boy||girl)?o.skin:(fox?o.lt:o.lt));c.beginPath();c.arc(0,13.5,4.4,0,7);c.stroke();c.restore()};
 // ουρά / σακίδιο / κάπα (πίσω από το σώμα)
 if(side){
  if(fox){const w=air?0:Math.sin(ph*.6)*4;c.fillStyle=G(o.skin,-36,-50,28,40);c.beginPath();c.moveTo(-8,-22);c.bezierCurveTo(-26,-18+w,-38,-34+w,-32,-52+w);c.bezierCurveTo(-24,-42,-16,-38,-6,-34);c.closePath();c.fill();c.stroke();c.fillStyle=o.lt;c.beginPath();c.moveTo(-32,-52+w);c.bezierCurveTo(-24,-42+w,-22,-44,-24,-47+w);c.bezierCurveTo(-27,-44,-30,-46,-32,-52+w);c.closePath();c.fill();c.stroke()}
  if(bun){dot(-13,-22,6.5,o.lt);c.beginPath();c.arc(-13,-22,6.5,0,7);c.stroke();dot(-14.5,-24,2,'rgba(0,0,0,.08)')}
  if(boy||astro){R(-19,-40,10,21,boy?o.pack:o.pack,4);if(astro){R(-21,-37,4,8,'#cbd5e1',2)}}
  if(mage){c.fillStyle='#6d28d9';c.beginPath();c.moveTo(-9,-38);c.lineTo(-17,-12);c.lineTo(-3,-14);c.closePath();c.fill();c.stroke()}
 }
 // πίσω χέρι / πόδι
 if(side){arm(-1,-sw*.75,false);leg(-3,-sw*.7)}
 else{if(boy||astro)R(-9,-39,18,19,o.pack,4);if(fox){const w=air?0:Math.sin(ph*.6)*5;c.fillStyle=G(o.skin,-14,-34,28,22);c.beginPath();c.moveTo(0,-24);c.bezierCurveTo(-20+w,-20,-22+w,-44,-8+w,-48);c.bezierCurveTo(-2,-40,6,-38,0,-24);c.closePath();c.fill();c.stroke();E(-10+w,-46,4,5,o.lt,.4)}if(bun){E(0,-22,7,7,o.lt)}leg(-5.5,air?0:Math.max(0,sw)*.5);leg(5.5,air?0:Math.max(0,-sw)*.5)}
 // κορμός
 const bw=side?20:24,bx=-bw/2;
 if(mage){c.fillStyle=G(o.top,bx,-40,bw,30);c.beginPath();c.moveTo(bx+2,-40);c.lineTo(bx+bw-2,-40);c.lineTo(bx+bw+(side?4:6),-12);c.lineTo(bx-(side?4:6),-12);c.closePath();c.fill();c.stroke();R(bx-1,-30,bw+2,4,o.trim,2);c.fillStyle='#fde047';[[0,-22],[4,-34],[-4,-18]].forEach(([a,b])=>{c.beginPath();for(let k=0;k<10;k++){const an=-Math.PI/2+k*Math.PI/5,r=k%2?1.2:2.8;c.lineTo(a+Math.cos(an)*r,b+Math.sin(an)*r)}c.closePath();c.fill()})}
 else{R(bx,-40,bw,26,o.top,7);
  if(girl){c.fillStyle=G(o.bot,bx-4,-24,bw+8,12);c.beginPath();c.moveTo(bx,-24);c.lineTo(bx+bw,-24);c.lineTo(bx+bw+4,-14);c.lineTo(bx-4,-14);c.closePath();c.fill();c.stroke();R(bx,-26,bw,3.5,o.trim,1.5)}
  if(boy){R(bx,-20,bw,6,o.bot,3);c.fillStyle='rgba(255,255,255,.9)';c.fillRect(bx+2,-33,bw-4,3);c.fillRect(bx+2,-28,bw-4,2.4)}
  if(fox){if(side){E(5,-27,6,9,o.lt)}else{E(0,-26,8,10,o.lt)}R(bx-1,-42,bw+2,5,o.trim,2.5);R(bx,-15,bw,3,o.bot,1)}
  if(bun){R(bx,-20,bw,7,o.bot,3);dot(-4,-22,1.6,'#fff');dot(4,-22,1.6,'#fff');c.fillStyle=o.bot;c.fillRect(-5,-34,2.6,14);c.fillRect(2.4,-34,2.6,14);R(-4.6,-31,9.2,7,o.bot,2)}
  if(astro){R(-5,-36,10,8,o.trim,2);dot(-2,-32,1.2,'#fde047');dot(2,-32,1.2,'#22c55e');R(bx,-22,bw,4,'#cbd5e1',1.5);R(bx-1,-42,bw+2,4,'#cbd5e1',2)}
  if(!mage&&!astro&&!fox&&!bun&&!boy&&!girl)R(bx,-22,bw,3,o.trim,1)}
 if(fox&&!side){const w=air?0:Math.sin(ph*.6)*5;c.fillStyle=G(o.skin,-6,-34,24,26);c.beginPath();c.moveTo(-3,-17);c.bezierCurveTo(-9+w,-12,-4+w,-4,5+w,-6);c.bezierCurveTo(14+w,-12,12+w,-26,5,-30);c.bezierCurveTo(8,-24,2,-20,-3,-17);c.closePath();c.fill();c.stroke();E(5+w,-9,4.4,3.6,o.lt,.3)}
 // μπροστινό πόδι
 if(side)leg(3,sw*.7);
 // λαιμός & κεφάλι
 const hx=side?2:0,hy=-51;
 if(!animal)R(-3.5,-46,7,6,o.skin,2);
 // αυτιά (πίσω από το κεφάλι)
 if(fox){const t=Math.sin(ph*.5)*(air?0:1);[[-9,-.2],[side?6:9,.2]].forEach(([ax,rot],i)=>{c.save();c.translate(hx+ax,hy-11);c.rotate(rot+t*.04);c.fillStyle=G(o.skin,-8,-22,16,22);c.beginPath();c.moveTo(-7,2);c.lineTo(i?4:-1,-22);c.lineTo(8,2);c.closePath();c.fill();c.stroke();c.fillStyle=o.dk;c.beginPath();c.moveTo(-3.5,-7);c.lineTo(i?3:-.6,-18.5);c.lineTo(4,-7);c.closePath();c.fill();c.fillStyle='#fda4af';c.beginPath();c.moveTo(-3,0);c.lineTo(i?2.4:-.6,-13);c.lineTo(3.2,0);c.closePath();c.fill();c.restore()})}
 if(bun){const fl=air?-.5:Math.sin(ph*.8)*.12;[[-7,-.18],[side?5:7,.14]].forEach(([ax,rot],i)=>{c.save();c.translate(hx+ax,hy-10);c.rotate(rot+fl*(i?1:-1)-(side?.22:0));E(0,-15,5.4,16.5,o.skin);E(0,-14,2.6,12,'#f9a8d4');c.restore()})}
 // κεφάλι
 E(hx,hy,15.5,14.3,animal?o.skin:o.skin);
 // τρίχωμα/ματάκια
 if(side){
  if(fox){E(hx+11,hy+4,8.5,6.2,o.lt);E(hx+4,hy+9,8,4,o.lt);E(hx+9,hy+6,6,4.4,o.lt);c.fillStyle='#111827';c.beginPath();c.ellipse(hx+18,hy+2.5,2.8,2.2,0,0,7);c.fill()}
  if(bun){E(hx+11,hy+5,6.5,5,o.lt);dot(hx+15.5,hy+3,2.1,'#f472b6')}
  // μάτι
  c.fillStyle='#fff';c.beginPath();c.ellipse(hx+6.5,hy-1,4.4,5.3,0,0,7);c.fill();c.stroke();
  c.fillStyle=o.eye;c.beginPath();c.ellipse(hx+7.6,hy-.6,2.9,3.8,0,0,7);c.fill();dot(hx+8.2,hy-.8,1.6,'#0b0b1e');dot(hx+8.8,hy-2.6,1.3,'#fff');dot(hx+6.8,hy+1.4,.7,'#fff');
  c.strokeStyle='#5b3a1e';c.lineWidth=1.8;c.beginPath();c.moveTo(hx+2.6,hy-7);c.quadraticCurveTo(hx+6.5,hy-9.6,hx+10.5,hy-7.4);c.stroke();c.strokeStyle=ink;c.lineWidth=2.3;
  // στόμα / μύτη
  if(bun){c.strokeStyle='#9d174d';c.lineWidth=1.6;c.beginPath();c.moveTo(hx+12.5,hy+6);c.quadraticCurveTo(hx+14,hy+9,hx+16.5,hy+6.5);c.stroke();c.strokeStyle=ink;c.lineWidth=2.3;c.fillStyle='#fff';c.beginPath();c.roundRect(hx+13.4,hy+7.6,2.6,3.4,1);c.fill();c.stroke()}
  else if(fox){c.strokeStyle='#7c2d12';c.lineWidth=1.6;c.beginPath();c.moveTo(hx+9,hy+7.6);c.quadraticCurveTo(hx+13,hy+11,hx+17.6,hy+7);c.stroke();c.strokeStyle=ink;c.lineWidth=2.3}
  else{c.strokeStyle='#b45309';c.lineWidth=1.6;c.beginPath();c.moveTo(hx+15.4,hy+1);c.lineTo(hx+17.6,hy+3.4);c.lineTo(hx+15.2,hy+4.4);c.stroke();c.lineWidth=2;c.strokeStyle='#9a3412';c.beginPath();c.moveTo(hx+8.6,hy+8);c.quadraticCurveTo(hx+12,hy+11.6,hx+15,hy+8);c.stroke();c.strokeStyle=ink;c.lineWidth=2.3}
  c.fillStyle='rgba(244,63,94,.38)';c.beginPath();c.ellipse(hx+3.4,hy+6.6,3.4,2.2,0,0,7);c.fill();
 }
 // μαλλιά / καπέλα / κράνος
 if(boy||girl||mage){const hc=o.hair;
  if(side){c.fillStyle=G(hc,hx-16,hy-16,32,18);c.beginPath();c.arc(hx,hy,16.2,Math.PI*.74,Math.PI*1.93);c.quadraticCurveTo(hx+11,hy-9,hx+4,hy-6.5);c.quadraticCurveTo(hx-3,hy-5,hx-10.5,hy-1);c.closePath();c.fill();c.stroke();
   if(boy){c.beginPath();c.moveTo(hx+3,hy-15.4);c.quadraticCurveTo(hx+8,hy-23,hx+13,hy-14.5);c.quadraticCurveTo(hx+8,hy-17,hx+3,hy-15.4);c.fill();c.stroke()}
   if(girl){const s=air?0:Math.sin(ph+1);c.fillStyle=G(hc,hx-26,hy-8,22,36);c.beginPath();c.moveTo(hx-9,hy-9);c.bezierCurveTo(hx-26,hy-6+s*3,hx-28+s*4,hy+16,hx-17+s*4,hy+24);c.bezierCurveTo(hx-18,hy+12,hx-11,hy+4,hx-6,hy+1);c.closePath();c.fill();c.stroke();R(hx-11,hy-7,6,5,o.bow,2);E(hx-10,hy-10,5,3.4,o.bow,.5);E(hx-5.4,hy-5,3.4,5,o.bow,.6)}}
  else{c.fillStyle=G(hc,hx-16,hy-16,32,22);c.beginPath();c.arc(hx,hy,16,Math.PI*.9,Math.PI*2.1);c.lineTo(hx+15,hy+8);c.quadraticCurveTo(hx,hy+17,hx-15,hy+8);c.closePath();c.fill();c.stroke();
   if(girl){const s=air?0:Math.sin(ph+1)*3;c.fillStyle=G(hc,-6,hy+8,22,28);c.beginPath();c.moveTo(-6,hy+6);c.quadraticCurveTo(-12+s,hy+22,-6+s,hy+30);c.lineTo(6+s,hy+30);c.quadraticCurveTo(12+s,hy+22,6,hy+6);c.closePath();c.fill();c.stroke();E(0,hy-12,9,3.6,o.bow);R(-3,hy-15,6,6,o.bow,2)}}}
 if(astro){c.fillStyle='rgba(125,211,252,.28)';c.beginPath();c.ellipse(hx+1,hy-.5,19,18.2,0,0,7);c.fill();c.stroke();c.fillStyle='rgba(255,255,255,.72)';c.beginPath();c.ellipse(hx-6,hy-10,6,2.6,-.6,0,7);c.fill();c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.ellipse(hx+10,hy+8,3,1.6,-.6,0,7);c.fill();R(hx-12,hy+14,26,5,'#cbd5e1',2.5);R(hx-14.5,hy-6,4,10,'#94a3b8',2);if(!side){c.fillStyle=G('#f8fafc',hx-15,hy-17,30,22);c.beginPath();c.ellipse(hx,hy-2,15.5,14.5,0,0,7);c.fill();c.stroke()}}
 if(mage){const bx0=side?hx+2:hx;
  if(side){c.fillStyle=G(o.hair,bx0,hy+2,18,26);c.beginPath();c.moveTo(bx0+5,hy+4);c.quadraticCurveTo(bx0+17,hy+8,bx0+9,hy+22);c.quadraticCurveTo(bx0+2,hy+27,bx0-6,hy+13);c.quadraticCurveTo(bx0-3,hy+6,bx0+5,hy+4);c.closePath();c.fill();c.stroke()}
  else{c.fillStyle=G(o.hair,hx-12,hy+4,24,24);c.beginPath();c.moveTo(hx-10,hy+4);c.quadraticCurveTo(hx-12,hy+20,hx,hy+26);c.quadraticCurveTo(hx+12,hy+20,hx+10,hy+4);c.closePath();c.fill();c.stroke()}
  c.fillStyle=G('#6d28d9',hx-18,hy-34,36,34);c.beginPath();c.moveTo(hx-17,hy-9);c.quadraticCurveTo(hx-10,hy-18,hx-6,hy-32);c.quadraticCurveTo(hx+2,hy-42,hx+10,hy-34);c.quadraticCurveTo(hx+8,hy-18,hx+17,hy-9);c.quadraticCurveTo(hx,hy-14,hx-17,hy-9);c.closePath();c.fill();c.stroke();
  c.fillStyle='#4c1d95';c.beginPath();c.ellipse(hx,hy-10,19,4.4,0,0,7);c.fill();c.stroke();R(hx-12,hy-16,24,4,o.trim,2);
  c.fillStyle='#fde047';c.beginPath();c.arc(hx+2,hy-25,3.8,0,7);c.fill();c.fillStyle='#6d28d9';c.beginPath();c.arc(hx+3.4,hy-25.6,3.2,0,7);c.fill()}
 // μέτωπο αστροναύτη μπροστά στο πρόσωπο: ήδη φαίνεται μέσα από τη «γυάλα»
 // μπροστινό χέρι
 if(side){arm(1,sw*.75,true)}else{arm(-13.5,air?0:sw*.4,false);arm(13.5,air?0:-sw*.4,true)}
 // ραβδί μάγου
 if(mage&&side){c.save();c.translate(7,-23);c.rotate(air?-.2:.2+sw*.1);c.strokeStyle='#78350f';c.lineWidth=3;c.beginPath();c.moveTo(0,16);c.lineTo(0,-36);c.stroke();c.strokeStyle=ink;c.lineWidth=1;c.stroke();c.fillStyle='rgba(125,211,252,.5)';c.beginPath();c.arc(0,-40,8,0,7);c.fill();c.fillStyle='#7dd3fc';c.beginPath();c.arc(0,-40,4.4,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(-1.4,-41.6,1.6,0,7);c.fill();c.restore()}
 c.restore()}

/* ---------- Τετράγωνοι χαρακτήρες ---------- */
const BLK={knight:{h:'#d5dde8',t:'#9fb0c4',l:'#6b7c93',a:'#9fb0c4',sh:'#475569',hand:'#d5dde8',acc:'#facc15'},robot:{h:'#d3a56e',t:'#c08f55',l:'#a8b0bd',a:'#a8b0bd',sh:'#4b5563',hand:'#6b7280',acc:'#22d3ee'},builder:{h:'#f4c697',t:'#3b4656',l:'#2f6fe0',a:'#3b4656',sh:'#7c4a1e',hand:'#f4c697',acc:'#f97316'},pirate:{h:'#f4c697',t:'#f8efe0',l:'#5b3a1e',a:'#f8efe0',sh:'#2b1a0c',hand:'#f4c697',acc:'#dc2626'},rookie:{h:'#ff8aa0',t:'#9b7cf6',l:'#fbbf24',a:'#9b7cf6',sh:'#ffffff',hand:'#ff8aa0',acc:'#f472b6'}};

function drawBlock(c,x,y,h,kind,face,view,ph,air){
 const o=BLK[kind],K=h/66,ink='#1e1b4b',sw=air?0:Math.sin(ph),sd=view==='side';
 const mx=(hex,f)=>{const n=parseInt(hex.slice(1),16);let r=n>>16&255,g=n>>8&255,b=n&255;if(f<1){r*=f;g*=f;b*=f}else{const q=f-1;r+=(255-r)*q;g+=(255-g)*q;b+=(255-b)*q}return'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'};
 const R=(a,b,w,hh,f,r)=>{const g=c.createLinearGradient(a,b,a+w,b+hh);g.addColorStop(0,mx(f,1.28));g.addColorStop(.55,f);g.addColorStop(1,mx(f,.74));c.fillStyle=g;c.beginPath();c.roundRect(a,b,w,hh,r==null?3:r);c.fill();c.stroke()};
 const gl=(a,b,w,hh)=>{c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.roundRect(a,b,w,hh,1.5);c.fill()};
 const dot=(a,b,r,f)=>{c.fillStyle=f;c.beginPath();c.arc(a,b,r,0,7);c.fill()};
 const limb=(px,py,w,hh,ang,f,hand,shoe)=>{c.save();c.translate(px,py);c.rotate(ang);R(-w/2,0,w,hh,f,3);gl(-w/2+1.2,2,2,hh-6);
  if(kind==='robot'&&!shoe){c.lineWidth=1.3;for(let k=5;k<hh-3;k+=4){c.beginPath();c.moveTo(-w/2,k);c.lineTo(w/2,k);c.stroke()}}
  if(hand){R(-w/2-.5,hh-3,w+1,7,hand,3)}
  if(shoe){R(-w/2-1,hh-5,w+(sd?6:2),7,shoe,3.5);if(sd)gl(-w/2+1,hh-4,w,2)}
  c.restore()};
 c.save();c.translate(x,y);c.scale(K,K);c.lineWidth=2.3;c.strokeStyle=ink;c.lineJoin='round';c.lineCap='round';
 c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(0,1,19,4.5,0,0,7);c.fill();
 if(sd&&face<0)c.scale(-1,1);
 const lA=air?.5:sw*.7;
 if(kind==='knight'&&!sd){c.fillStyle='#b91c1c';c.beginPath();c.moveTo(-11,-45);c.lineTo(11,-45);c.lineTo(14+sw*2,-12);c.lineTo(-14+sw*2,-12);c.closePath();c.fill();c.stroke()}
 if(kind==='knight'&&sd){c.fillStyle='#b91c1c';c.beginPath();c.moveTo(-8,-45);c.lineTo(-15-sw*3,-14);c.lineTo(-7,-18);c.closePath();c.fill();c.stroke()}
 if(sd){limb(0,-43,8,17,air?-2.4:-sw*.7,o.a,o.hand);limb(-3,-21,9,15,air?.5:sw*.7,o.l,null,o.sh);limb(3,-21,9,15,air?-.4:-sw*.7,o.l,null,o.sh);R(-9,-46,18,27,o.t,4)}
 else{limb(-5.5,-21,10,15,air?0:Math.max(0,sw)*.4,o.l,null,o.sh);limb(5.5,-21,10,15,air?0:Math.max(0,-sw)*.4,o.l,null,o.sh);limb(-15,-43,8,17,air?-2.4:sw*.35,o.a,o.hand);limb(15,-43,8,17,air?-2.4:-sw*.35,o.a,o.hand);R(-12,-46,24,27,o.t,4)}
 gl(sd?-7:-10,-44,3,18);
 const bw=sd?18:24,bx=-bw/2,cxn=0;
 // σώμα: λεπτομέρειες
 if(kind==='knight'){R(bx,-32,bw,4,o.acc,1);R(bx,-46,bw,5,'#c5d0de',3);if(sd){R(-5,-40,10,7,'#e5e7eb',2);dot(0,-36.5,2,'#ef4444')}else{R(-6,-41,12,8,'#e5e7eb',2);dot(0,-37,2.3,'#ef4444')}R(bx-1,-47,5,6,'#c5d0de',2);if(!sd)R(bx+bw-4,-47,5,6,'#c5d0de',2)}
 if(kind==='robot'){c.lineWidth=1.5;R(-6,-43,12,12,'#fef3c7',2);dot(-2.5,-39,1.6,'#ef4444');dot(2.5,-39,1.6,'#22c55e');c.beginPath();c.moveTo(-4,-34);c.lineTo(4,-34);c.stroke();dot(bx+3,-44,1.4,'#6b7280');dot(bx+bw-3,-44,1.4,'#6b7280');dot(bx+3,-23,1.4,'#6b7280');dot(bx+bw-3,-23,1.4,'#6b7280');c.lineWidth=2.3}
 if(kind==='builder'){R(bx,-46,bw,6,'#ef4444',3);R(bx,-31,bw,3.5,'#f97316',1);R(bx,-26,bw,2,'#fde68a',1);R(sd?-6:-9,-28,sd?7:9,9,'#7c4a1e',2);c.lineWidth=1.3;c.beginPath();c.moveTo(sd?-6:-9,-24);c.lineTo(sd?1:0,-24);c.stroke();c.lineWidth=2.3}
 if(kind==='pirate'){R(bx+2,-46,bw-4,26,'#2563eb',3);R(bx,-31,bw,4.5,'#3a2410',1);R(-3,-31,6,4.5,'#facc15',1);c.lineWidth=1.3;c.beginPath();c.moveTo(0,-46);c.lineTo(0,-32);c.stroke();dot(0,-41,1.1,'#facc15');dot(0,-37,1.1,'#facc15');c.lineWidth=2.3;R(bx+1,-46,6,5,'#f8efe0',2)}
 if(kind==='rookie'){R(bx,-31,bw,5,'#f472b6',1);c.fillStyle='#fde047';c.strokeStyle='#a16207';c.lineWidth=1.3;c.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?2.2:5;c.lineTo(Math.cos(a)*r+(sd?0:0),-40+Math.sin(a)*r)}c.closePath();c.fill();c.stroke();c.strokeStyle=ink;c.lineWidth=2.3}
 // κεφάλι
 const hx=sd?-9:-10;R(hx,-67,20,20,o.h,kind==='robot'?2:kind==='knight'?6:5);gl(hx+2,-65,3,10);
 if(sd){
  if(kind==='knight'){R(-1,-61,10,6,'#111827',2);dot(2.5,-58,1.4,'#7dd3fc');dot(6.5,-58,1.4,'#7dd3fc');c.lineWidth=1.3;c.beginPath();c.moveTo(hx+2,-52);c.lineTo(hx+18,-52);c.stroke();c.lineWidth=2.3}
  else if(kind==='robot'){R(-1,-62,8,6,'#0f172a',1.5);dot(1.8,-59,1.8,o.acc);dot(5,-59,1.8,o.acc);c.lineWidth=1.3;for(let k=0;k<3;k++){c.beginPath();c.moveTo(-2+k*3,-53);c.lineTo(-2+k*3,-50);c.stroke()}c.lineWidth=2.3}
  else{c.fillStyle='#fff';c.beginPath();c.ellipse(4,-59,3.3,3.8,0,0,7);c.fill();c.stroke();dot(5.2,-58.6,1.9,ink);dot(5.9,-59.4,.7,'#fff');
   c.lineWidth=1.8;c.strokeStyle='#7c2d12';c.beginPath();c.moveTo(1,-64);c.lineTo(7,-64.5);c.stroke();c.beginPath();c.moveTo(2.5,-52.5);c.quadraticCurveTo(6,-49.5,9,-53);c.stroke();c.strokeStyle=ink;c.lineWidth=2.3;dot(0,-54,2.4,'rgba(244,63,94,.35)')}
 }
 // καλύμματα κεφαλιού / αξεσουάρ
 if(kind==='knight'){R(hx-1,-69,22,7,'#bcc8d6',4);R(-3,-78,6,10,'#ef4444',2.5);gl(-2,-77,1.6,7)}
 if(kind==='robot'){c.beginPath();c.moveTo(0,-67);c.lineTo(0,-76);c.stroke();dot(0,-77,3.2,'#ef4444');c.stroke();dot(-.8,-78,1,'#fecaca');R(hx-3,-61,3,8,'#6b7280',1);R(hx+20,-61,3,8,'#6b7280',1)}
 if(kind==='builder'){c.fillStyle='#f97316';const g=c.createLinearGradient(-11,-78,11,-64);g.addColorStop(0,'#fdba74');g.addColorStop(1,'#c2410c');c.fillStyle=g;c.beginPath();c.arc(0,-65.5,12,Math.PI,0);c.closePath();c.fill();c.stroke();R(-14,-66,28,3.5,'#ea580c',1.8);R(-2,-77,4,12,'#fdba74',2);if(sd){dot(8,-71,2,'#fef08a')}}
 if(kind==='pirate'){c.fillStyle='#c2410c';c.beginPath();c.arc(0,-61,11,Math.PI*1.02,Math.PI*1.98);c.lineTo(10,-56);c.lineTo(-10,-56);c.closePath();c.fill();c.stroke();
  c.fillStyle='#1f2937';c.beginPath();c.moveTo(-15,-66);c.lineTo(-8,-76);c.lineTo(8,-76);c.lineTo(15,-66);c.lineTo(8,-69);c.lineTo(-8,-69);c.closePath();c.fill();c.stroke();R(-12,-70,24,4,'#7f1d1d',2);dot(0,-73,2.2,'#f8fafc');c.lineWidth=1.2;c.beginPath();c.moveTo(-1.3,-71.5);c.lineTo(1.3,-71.5);c.stroke();c.lineWidth=2.3;
  if(sd){c.fillStyle='#111827';c.beginPath();c.ellipse(5,-58,4,3.8,0,0,7);c.fill();c.stroke();c.lineWidth=1.4;c.beginPath();c.moveTo(hx,-65);c.lineTo(11,-52);c.stroke();c.lineWidth=2.3}}
 if(kind==='rookie'){c.fillStyle='#4c1d95';[-6,0,6].forEach((k,i)=>{c.beginPath();c.moveTo(k-3.4,-67);c.lineTo(k+(i-1)*1.5,-76-(i===1?3:0));c.lineTo(k+3.4,-67);c.closePath();c.fill();c.stroke()})}
 c.restore()}
const SPR={},WK={milis:4,nasa:3},SPK={dog:'milis',cat:'nasa'},BK={};
['milis','nasa'].forEach(k=>{const i=new Image();i.src='../logo/'+k+'_body.webp?v=4';SPR[k]=i;WK[k]=Array.from({length:WK[k]},(_,j)=>{const w=new Image();w.src='../logo/'+k+'_w'+(j+1)+'.webp?v=4';return w});BK[k]={};['back','turn'].forEach(v=>{const im=new Image();im.src='../logo/'+k+'_'+v+'.webp?v=4';BK[k][v]=im})});
const imOk=i=>i&&i.complete&&i.naturalWidth>0;
function drawSprite(c,x,y,h,k,face,view,ph,air,moving){let im,fl=false;
 if(view==='back'){im=BK[k].back;fl=moving&&!air&&Math.floor(ph/1.75)%2===1}
 else{const fr=WK[k];im=imOk(fr[0])?fr[0]:SPR[k];if(air&&imOk(fr[1]))im=fr[1];else if(moving){const f=fr[Math.floor(ph/1.75)%fr.length];if(imOk(f))im=f}}
 if(!imOk(im))return false;
 const H=h*1.22,W=H*im.naturalWidth/im.naturalHeight,sw=Math.sin(ph);
 c.save();c.translate(x,y);c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(0,1,W*.4,4.5,0,0,7);c.fill();
 if(view==='back'){if(fl)c.scale(-1,1)}else if(face<0)c.scale(-1,1);if(moving&&!air)c.translate(0,-Math.abs(sw)*2);if(air)c.rotate(-.06);
 c.drawImage(im,-W/2,-H,W,H);c.restore();return true}
function drawChar(c,x,y,h,kind,face,view,ph,air){const k=SPK[kind];
 if(k&&drawSprite(c,x,y,h,k,face,view,ph,air,ph!==0))return;
 if(BLK[kind]){drawBlock(c,x,y,h,kind,face,view,ph,air);return}
 if(CHIBI[kind]){drawChibi(c,x,y,h,kind,face,view,ph,air);return}
 drawPet(c,x,y,h,kind,face,view,ph,air)}
