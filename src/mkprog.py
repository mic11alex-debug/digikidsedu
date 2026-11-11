# Δημιουργεί ξεχωριστές εφαρμογές για κάθε ενότητα του «Μικρού Προγραμματιστή»
import re
SRC='/mnt/user-data/outputs/Mikros_Programmatistis.html'
S=[
 ('alg','Prog_1_Ti_einai_algorithmos.html','Τι είναι αλγόριθμος;','Βάλε τα βήματα στη σωστή σειρά και μάθε τι είναι ο αλγόριθμος.','🧠','#7c3aed','#ec4899','🧠 📋 ✅',('intro',)),
 ('riv','Prog_2_Grifos_Barkari.html','Ο γρίφος του βαρκάρη','Ο λύκος, το πρόβατο και το λάχανο: βρες τον αλγόριθμο για να περάσουν το ποτάμι.','🛶','#0ea5e9','#22c55e','🐺 🛶 🐑 🥬',('river',)),
 ('trn','Prog_3_Strofes_Vimata.html','Στροφές και βήματα','Οδήγησε το Ρόμπι με «Μπροστά», «Στρίψε αριστερά» και «Στρίψε δεξιά».','🤖','#6366f1','#06b6d4','🤖 ⬆️ ↪️',(0,6)),
 ('rep','Prog_4_Epanalipsi.html','Επανάληψη και φιδάκι','Μάθε να γράφεις λιγότερες εντολές με το κομμάτι 🔁 Επανάληψη.','🔁','#f97316','#eab308','🔁 🤖 🐍',(6,11,21,23)),
 ('bee','Prog_5_Melissa.html','Μέλισσα: πίσω και μπροστά','Η μέλισσα πάει και πίσω! Δοκίμασε και την εντολή «Πίσω».','🐝','#facc15','#f472b6','🐝 🌸 🍯',(11,14)),
 ('col','Prog_6_Mazepse_me_ti_seira.html','Μάζεψε με τη σειρά','Μάζεψε τα αντικείμενα με τη σειρά που λέει η λίστα.','🌟','#8b5cf6','#f59e0b','🌟 🍎 🍌',(14,17)),
 ('cyp','Prog_7_Volta_Kypro.html','Βόλτα στην Κύπρο','Επισκέψου τις πόλεις της Κύπρου με τη σωστή σειρά, γράφοντας πρόγραμμα.','🏝️','#0891b2','#84cc16','🏝️ 🏛️ 🏖️',(17,21)),
 ('gif','Prog_8_Asteia_Dora.html','Αστεία δώρα','Γράψε όλο το πρόγραμμα, τρέξε το και βρες κουτιά με αστεία!','🎁','#ec4899','#f43f5e','🎁 😂 🤖',(23,26)),
]
def banner(t,d,c1,c2,sc):
    return ("<div class=\"ban\" style=\"background:linear-gradient(120deg,%s,%s)\"><div class=\"bsc\">%s</div><div><h1>%s</h1><p>%s</p></div></div>"%(c1,c2,sc,t,d))
CSS=".ban{display:flex;align-items:center;gap:18px;border-radius:24px;padding:18px 22px;margin:6px 0 16px;box-shadow:0 8px 0 #0004;position:relative;overflow:hidden}.ban:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 20%,#fff5,transparent 45%)}.ban .bsc{font-size:44px;letter-spacing:6px;white-space:nowrap;filter:drop-shadow(0 4px 0 #0003);position:relative}.ban h1{margin:0;background:none;-webkit-text-fill-color:#fff;color:#fff;font-size:32px;text-shadow:0 3px 0 #0004;position:relative}.ban p{margin:4px 0 0;font-size:18px;position:relative}@media(max-width:600px){.ban{flex-direction:column;text-align:center}.ban .bsc{font-size:36px}.ban h1{font-size:25px}}"
def card_svg(ic,c1,c2,sc=None):
    e=(sc or ic).split()
    xs=[80] if len(e)==1 else [32,80,128]
    t=''.join("<text x='%d' y='46' font-size='32' text-anchor='middle'>%s</text>"%(x,m) for x,m in zip(xs,e))
    return "<svg viewBox='0 0 160 64' width='3.2em' height='1.28em' style='vertical-align:-.2em'><defs><linearGradient id='g%s' x1='0' y1='0' x2='1' y2='.4'><stop offset='0' stop-color='%s'/><stop offset='1' stop-color='%s'/></linearGradient></defs><rect width='160' height='64' rx='12' fill='url(#g%s)'/><circle cx='140' cy='8' r='26' fill='#fff' opacity='.22'/>%s</svg>"%(c1[1:],c1,c2,c1[1:],t)
IMS={}
def main():
    h=open(SRC,encoding='utf8').read()
    a=h.index('function menu(){');e=h.index('\n',h.index("$('#in').onclick=intro"))
    old=h[a:e]
    for k,f,t,d,ic,c1,c2,sc,spec in S:
        if spec[0] in('intro','river'):
            body="$('#%s').click()"%('in' if spec[0]=='intro' else 'rv')
            # απευθείας μενού με ένα μεγάλο κουμπί
            inner=('<button class="card big" id="%s"><span class="em">%s</span><div><b>%s</b><small>Πάτα για να παίξεις</small></div><span style="margin-left:auto">${stars(s.%s)}</span></button>'%('in' if spec[0]=='intro' else 'rv',ic,t,'intro' if spec[0]=='intro' else 'river'))
            rng=[]
        else:
            rs=list(spec);rng=[(rs[i],rs[i+1]) for i in range(0,len(rs),2)]
            inner='<div class="lv">${LV.map((l,i)=>(%s)?pl(i,s):\'\').join(\'\')}</div>'%'||'.join('(i>=%d&&i<%d)'%r for r in rng)
        new=("function menu(){tk++;running=false;const s=ST.get();\n app.innerHTML=`<div class=\"wrap\">%s%s</div>`;\n"%(banner(t,d,c1,c2,sc),inner)
             +" const q=x=>document.querySelector(x);if(q('#in'))q('#in').onclick=intro;if(q('#rv'))q('#rv').onclick=river;app.querySelectorAll('.pl').forEach((b,n)=>{b.querySelector('b').textContent=n+1;b.onclick=()=>play(+b.dataset.i)})}")
        o=h[:a]+new+h[e:]
        hi=max(r[1] for r in rng)-1 if rng else -1
        o=o.replace("I<LV.length-1?play(I+1):menu()","%s?play(I+1):menu()"%("(I<%d&&%s)"%(hi,'||'.join('(I+1>=%d&&I+1<%d)'%r for r in rng)) if rng else 'false'))
        o=o.replace('<title>Ο Μικρός Προγραμματιστής','<title>'+t).replace('</style>',CSS+'</style>',1)
        open('/mnt/user-data/outputs/'+f,'w',encoding='utf8').write(o)
        IMS[k]=card_svg(ic,c1,c2)
if __name__=="__main__":main()
