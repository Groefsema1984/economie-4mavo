// ===== Instellingen =====
// URL van het Apps Script (web-app, eindigt op /exec). Leeg = alleen opslag op dit apparaat (testmodus).
const DATA_ENDPOINT_URL = "";
const KLASSEN = ['Econ1','Econ2'];           // klassen waaruit leerlingen kiezen
const KEY = 'eco4m-v1';                  // opslagsleutel op het apparaat
const VERSIE = '1.0';
const VRAGEN_PER_LEVEL = 8;
const MEDAIL = [{n:'brons',e:'🥉',min:6,m:5},{n:'zilver',e:'🥈',min:7,m:10},{n:'goud',e:'🥇',min:8,m:20}];
const TOETS_VRAGEN = 15;
const IDLE_MS = 90*1000;                 // na 90 s zonder tikken telt oefentijd niet meer

// ===== Hulpfuncties =====
const $ = (s,el=document)=>el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd = (a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const eur = x => '€ '+x.toFixed(2).replace('.',',');
const nl1 = x => x.toFixed(1).replace('.',',');
const vandaag = ()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function weekId(d=new Date()){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const dn=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-dn);const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return t.getUTCFullYear()+'-W'+String(Math.ceil(((t-y)/864e5+1)/7)).padStart(2,'0')}
const minuten = s => Math.round((s||0)/60);
function parseGetal(s){ if(s==null) return NaN; s=String(s).trim().replace(/[€%\s]/g,''); if(/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s=s.replace(/\./g,''); s=s.replace(',','.'); return s===''?NaN:Number(s) }

// ===== Toestand van de leerling =====
// Alles wat alleen kan groeien (tijd, aantallen, medailles) wordt bij samenvoegen met max/union gecombineerd,
// zodat een oud apparaat nooit nieuwe voortgang kan overschrijven.
function nieuweStaat(){
  return {v:1, id:'', code:'', naam:'', klas:'', upd:0, aangemaakt:Date.now(),
    xp:0, mVerd:0, mUit:0, tijd:0, dag:{}, week:{},
    lv:{}, toets:{}, vr:{}, et:{}, kaarten:[], badges:[], gekocht:['standaard'], thema:'standaard', herhaal:[], hgoed:{}}
}
let S = null;

const UNION = new Set(['kaarten','badges','gekocht']);
function merge(a,b){
  // b is de nieuwste (hoogste upd) bij gelijke velden die niet kunnen groeien
  if(a===undefined||a===null) return b; if(b===undefined||b===null) return a;
  if(typeof a==='number'&&typeof b==='number') return Math.max(a,b);
  if(Array.isArray(a)&&Array.isArray(b)) return b;
  if(typeof a==='object'&&typeof b==='object'){
    const o={}; for(const k of new Set([...Object.keys(a),...Object.keys(b)])){
      if(UNION.has(k)&&Array.isArray(a[k])&&Array.isArray(b[k])) o[k]=[...new Set([...a[k],...b[k]])];
      else if(k==='et') o[k]=mergeEt(a[k],b[k]);
      else o[k]=merge(a[k],b[k]);
    } return o;
  }
  return b;
}
function mergeEt(a,b){ // per eindterm een lijstje recente resultaten; neem de langste/nieuwste
  a=a||{}; b=b||{}; const o={};
  for(const k of new Set([...Object.keys(a),...Object.keys(b)])){const x=a[k]||{n:0,r:[]},y=b[k]||{n:0,r:[]};o[k]=(y.n>=x.n)?y:x}
  return o;
}
function mergeStaat(oud,nieuw){ // oud en nieuw in willekeurige volgorde
  const [x,y] = (oud.upd||0)<=(nieuw.upd||0)?[oud,nieuw]:[nieuw,oud];
  const m = merge(x,y); m.upd=Math.max(x.upd||0,y.upd||0); return m;
}

function laad(){
  try{ const r=localStorage.getItem(KEY); if(r) S=Object.assign(nieuweStaat(),JSON.parse(r)); }catch(e){ S=null }
  if(!S){ try{ const r=localStorage.getItem(KEY+'-reserve'); if(r) S=Object.assign(nieuweStaat(),JSON.parse(r)); }catch(e){} }
}
let vuil=false;
function bewaar(sync=true){
  S.upd=Date.now();
  try{ const oud=localStorage.getItem(KEY); if(oud) localStorage.setItem(KEY+'-reserve',oud); localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){}
  if(sync){ vuil=true; planSync(); }
}
const munten = ()=>Math.max(0,(S.mVerd||0)-(S.mUit||0));

// ===== Server (Apps Script) =====
const serverModus = ()=>!!DATA_ENDPOINT_URL;
let syncStatus = 'lokaal', syncTimer=null, bezig=false;
async function api(actie, data){
  const r = await fetch(DATA_ENDPOINT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(Object.assign({actie},data))});
  const j = await r.json(); if(!j.ok) throw new Error(j.fout||'Serverfout'); return j;
}
function planSync(ms=4000){ if(!serverModus()||!S||!S.id) return; clearTimeout(syncTimer); syncTimer=setTimeout(sync,ms) }
async function sync(){
  if(!serverModus()||!S||!S.id||bezig) return; bezig=true;
  try{
    const j = await api('sync',{id:S.id, code:S.code, staat:S});
    const terug = j.staat; S = mergeStaat(S, terug); S.id=terug.id||S.id; S.code=S.code||terug.code;
    try{ localStorage.setItem(KEY,JSON.stringify(S)) }catch(e){}
    vuil=false; syncStatus='ok'; syncTijd=Date.now();
  }catch(e){ syncStatus='fout'; syncFout=e.message; planSync(60000) }
  bezig=false; toonSyncStatus && toonSyncStatus();
}
let syncTijd=0, syncFout='';
let toonSyncStatus=null;
window.addEventListener('online',()=>planSync(500));
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden'&&vuil) sync(); });

// ===== Oefentijd =====
let laatsteTik=Date.now(), oefenActief=false;
['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,()=>laatsteTik=Date.now(),{passive:true}));
setInterval(()=>{
  if(!S||!oefenActief||document.visibilityState!=='visible'||Date.now()-laatsteTik>IDLE_MS) return;
  S.tijd=(S.tijd||0)+5; const d=vandaag(), w=weekId();
  S.dag[d]=(S.dag[d]||0)+5; S.week[w]=(S.week[w]||0)+5;
  if(S.tijd%60===0) bewaar(); else { try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){} }
},5000);

// ===== Rekengeneratoren (elke keer nieuwe getallen) =====
const GENS = {
  pctVan(){ const b=pick([40,60,80,120,150,180,240,250,320,450,600,750]), p=pick([3,4,5,6,8,12,15,20,21,25]); return {t:'reken', e:'K3.r', q:`Bereken ${p}% van ${eur(b)}.`, a:b*p/100, eh:'€', u:`1% = ${eur(b)} / 100 = ${eur(b/100)}. Dus ${p}% = ${eur(b/100)} × ${p} = ${eur(b*p/100)}.`} },
  deelVan(){ const g=pick([200,250,400,500,800,1250]), d=Math.round(g*pick([6,8,12,14,15,18,22,35])/100); return {t:'reken', e:'K3.r', q:`Je krijgt ${eur(d)} korting op een aankoop van ${eur(g)}. Hoeveel procent korting is dat? (1 decimaal)`, a:Math.round(d/g*1000)/10, eh:'%', u:`(deel / geheel) × 100% = (${nl1(d)} / ${g}) × 100% = ${nl1(Math.round(d/g*1000)/10)}%.`} },
  procVerandering(){ const oud=pick([8,12,15,20,24,40,50,80]), f=pick([1.05,1.08,1.1,1.15,1.2,0.9,0.85,0.95]); const nieuw=Math.round(oud*f*100)/100, p=Math.round((nieuw-oud)/oud*1000)/10; const wat=pick(['Een bioscoopkaartje','Een pizza','Een paar sokken','Een kapper']); return {t:'reken', e:'K3.v', q:`${wat} kostte ${eur(oud)} en kost nu ${eur(nieuw)}. Met hoeveel procent is de prijs veranderd? (1 decimaal, een daling is negatief)`, a:p, eh:'%', u:`((nieuw − oud) / oud) × 100% = ((${nl1(nieuw)} − ${nl1(oud)}) / ${nl1(oud)}) × 100% = ${nl1(p)}%.`} },
  weekMaand(){ const w=pick([15,20,24,30,36,45,60,75]); const m=Math.round(w*52/12*100)/100; return {t:'reken', e:'K3.t', q:`Je verdient ${eur(w)} per week met je bijbaan. Hoeveel is dat per maand?`, a:m, eh:'€', u:`Via het jaar: ${eur(w)} × 52 = ${eur(w*52)} per jaar. Gedeeld door 12 = ${eur(m)} per maand.`} },
  maandWeek(){ const m=pick([26,39,52,65,78,104,130]); const w=Math.round(m*12/52*100)/100; return {t:'reken', e:'K3.t', q:`Een abonnement kost ${eur(m)} per maand. Hoeveel is dat per week?`, a:w, eh:'€', u:`Via het jaar: ${eur(m)} × 12 = ${eur(m*12)} per jaar. Gedeeld door 52 = ${eur(w)} per week.`} },
  reservering(){ const n=pick([4,5,6,8,10,12]), b=pick([240,300,360,480,600,720,960]); const r=Math.round(b/n*100)/100; const wat=pick(['een nieuwe fiets','een laptop','een vakantie','een scooterhelm en kleding']); return {t:'reken', e:'4A.8', q:`Je wilt over ${n} maanden ${wat} van ${eur(b)} kopen. Hoeveel moet je per maand reserveren?`, a:r, eh:'€', u:`Reservering per maand = bedrag / aantal maanden = ${eur(b)} / ${n} = ${eur(r)}.`} },
  koopkracht(){ const l=pick([1,1.5,2,2.5,3,3.5,4,5]), i=pick([1.5,2,2.5,3,4,5,6]); const k=Math.round((l-i)*10)/10; return {t:'reken', e:'V1.5', q:`Je loon stijgt met ${nl1(l)}% en de inflatie is ${nl1(i)}%. Met hoeveel procent verandert je koopkracht? (een daling is negatief)`, a:k, eh:'%', u:`Koopkracht = loonstijging − inflatie = ${nl1(l)}% − ${nl1(i)}% = ${nl1(k)}%.`} },
  index(){ const b=pick([20,25,40,50,80,200]), f=pick([1.04,1.1,1.12,1.25,0.9,1.3]); const v=Math.round(b*f*100)/100, ix=Math.round(v/b*1000)/10; return {t:'reken', e:'K3.v', q:`Een product kostte in het basisjaar ${eur(b)} en nu ${eur(v)}. Wat is het indexcijfer nu? (1 decimaal, zonder %)`, a:ix, eh:'', u:`Indexcijfer = (nu / basisjaar) × 100 = (${nl1(v)} / ${b}) × 100 = ${nl1(ix)}. Geen %-teken!`} },
  saldo(){ const i=pick([180,220,260,300,340]), u=pick([150,190,240,280,320,360]); return {t:'reken', e:'4A.8', q:`Je verwachte inkomsten deze maand zijn ${eur(i)} en je verwachte uitgaven ${eur(u)}. Wat is je saldo? (een tekort is negatief)`, a:i-u, eh:'€', u:`Saldo = inkomsten − uitgaven = ${eur(i)} − ${eur(u)} = ${(i-u<0?'−':'')+eur(Math.abs(i-u))}. ${i-u<0?'Dat is een tekort.':'Dat is een overschot.'}`} }
};
function maakGen(naam){ const v=GENS[naam](); v.id='gen.'+naam; v.gen=true; return v }

// ===== Vragenbank =====
function alleVragen(){ const out=[]; for(const w in LEVELS){ for(const l of LEVELS[w]) for(const v of l.vragen) out.push(Object.assign({w,l:l.id},v)); } if(typeof EXAMEN!=='undefined') for(const v of EXAMEN.vragen) out.push(Object.assign({w:'ex'},v)); return out }
let _vmap=null; function vraagById(id){ if(!_vmap){_vmap={}; for(const v of alleVragen()) _vmap[v.id]=v} return _vmap[id] }

function nakijken(v, antw){
  if(v.t==='mc'||v.t==='ex') return antw===v.a;
  if(v.t==='wo') return antw===v.a;
  if(v.t==='koppel') return v.p.every((p,i)=>antw[i]===p[1]);
  if(v.t==='reken'){ const x=parseGetal(antw); if(isNaN(x)) return false; const tol = v.eh==='€'?0.011:0.051; return Math.abs(x-v.a)<=tol }
  return false;
}
function registreer(v, goed){
  if(!v.gen){ const r=S.vr[v.id]||{g:0,f:0}; goed?r.g++:r.f++; r.t=Date.now(); S.vr[v.id]=r; }
  else { const k=v.id; const r=S.vr[k]||{g:0,f:0}; goed?r.g++:r.f++; S.vr[k]=r; }
  if(v.e){ const et=S.et[v.e]||{n:0,r:[]}; et.r=et.r.concat(goed?1:0).slice(-20); et.n++; S.et[v.e]=et; }
  let nieuweKaart=false;
  if(goed){ S.xp+=10; S.mVerd+=1; if(v.b&&!S.kaarten.includes(v.b)){ S.kaarten.push(v.b); nieuweKaart=true } }
  // herhaalronde: foute vragen komen terug, na 2× goed verdwijnen ze
  if(!v.gen){
    if(!goed){ if(!S.herhaal.includes(v.id)) S.herhaal.push(v.id); S.hgoed[v.id]=0; }
    else if(S.herhaal.includes(v.id)){ S.hgoed[v.id]=(S.hgoed[v.id]||0)+1; if(S.hgoed[v.id]>=2){ S.herhaal=S.herhaal.filter(x=>x!==v.id); delete S.hgoed[v.id]; } }
  }
  return nieuweKaart;
}
function etScore(code){ const et=S.et[code]; if(!et||et.r.length<3) return null; let s=0,w=0; et.r.forEach((x,i)=>{const g=i+1; s+=x*g; w+=g}); return Math.round(s/w*100) }
function domeinScore(d){ const sc=Object.keys(EINDTERMEN).filter(k=>EINDTERMEN[k].d===d).map(etScore).filter(x=>x!==null); return sc.length?Math.round(sc.reduce((a,b)=>a+b,0)/sc.length):null }
function medaille(score){ let m=null; for(const x of MEDAIL) if(score>=x.min) m=x; return m }
