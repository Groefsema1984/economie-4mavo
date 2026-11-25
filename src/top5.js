// ===== Top 5 examenonderwerpen =====
// De vijf eindtermen die op de centrale examens 2018-2026 de meeste punten opleveren (samen meer dan de helft).
// De volgorde en het aandeel worden uit de examenvragen zelf berekend, zodat het klopt als er examens bijkomen.
const TOP5_N = 5;
let _top5 = null;
function top5(){
  if(_top5) return _top5;
  const p={}; let tot=0;
  (typeof EXAMEN!=='undefined'?EXAMEN.vragen:[]).forEach(v=>{ if(!v.e||!EINDTERMEN[v.e]) return; const n=v.pnt||1; p[v.e]=(p[v.e]||0)+n; tot+=n });
  _top5 = Object.entries(p).sort((a,b)=>b[1]-a[1]).slice(0,TOP5_N).map(([e,n])=>({e,pct:Math.round(n/tot*100),aand:n/tot}));
  return _top5;
}
const top5Totaal = () => Math.round(top5().reduce((a,x)=>a+x.aand,0)*100);

// vragen bij één onderwerp: n oefenvragen (levels en rekensommen) en m examenvragen
function top5Vragen(e, n, m, al){
  al=al||new Set();
  const oef=shuffle(alleVragen().filter(v=>v.w!=='ex'&&v.e===e&&autoNakijk(v)&&!al.has(v.id)&&(typeof laagTelt!=='function'||laagTelt(v.lg))));
  const gens=Object.keys(GENS).filter(g=>{ try{ return maakGen(g).e===e }catch(x){ return false } });
  const ex=shuffle(alleVragen().filter(v=>v.w==='ex'&&v.e===e&&autoNakijk(v)&&!al.has(v.id)));
  const uit=[];
  // oefendeel: ongeveer een derde rekensommen als die er zijn
  const nGen=gens.length?Math.min(Math.round(n/3),n):0;
  oef.slice(0,n-nGen).forEach(v=>uit.push(v));
  while(uit.length<n&&gens.length) uit.push(maakGen(pick(gens)));
  ex.slice(0,m).forEach(v=>uit.push(v));
  // te weinig examenvragen: aanvullen met oefenvragen
  oef.slice(n-nGen).forEach(v=>{ if(uit.length<n+m) uit.push(v) });
  uit.forEach(v=>{ al.add(v.id); delete v._mix });
  return uit;
}
function startTop5(e){
  const t=top5().find(x=>x.e===e); if(!t){ melding('Dit onderwerp is er niet'); return }
  const v=top5Vragen(e,5,5); if(v.length<4){ melding('Hier zijn nog te weinig vragen voor'); return }
  Q={modus:'top5',titel:'Top 5 · '+EINDTERMEN[e].t,vragen:shuffle(v),i:0,res:[],terug:top5Terug}; top5Terug="go('top5')"; go('quiz');
}
// Top 5 mix: 15 vragen. Een onderwerp dat meer examenpunten oplevert en waar je zwakker in bent, komt vaker terug.
function top5Verdeling(tot){
  const t=top5(); const gw=t.map(x=>{ const s=etScore(x.e); return x.pct*(1+(100-(s==null?60:s))/100) });
  const som=gw.reduce((a,b)=>a+b,0); const aantal=t.map((_,i)=>Math.max(2,Math.floor(gw[i]/som*tot)));
  let over=tot-aantal.reduce((a,b)=>a+b,0);
  const volg=t.map((_,i)=>i).sort((a,b)=>(gw[b]/som*tot-Math.floor(gw[b]/som*tot))-(gw[a]/som*tot-Math.floor(gw[a]/som*tot)));
  for(let k=0;over>0;k++,over--) aantal[volg[k%volg.length]]++;
  for(let k=0;over<0;k++){ const i=aantal.indexOf(Math.max(...aantal)); aantal[i]--; over++ }
  return t.map((x,i)=>({e:x.e,n:aantal[i]}));
}
function startTop5Mix(){
  const al=new Set(); let v=[];
  top5Verdeling(15).forEach(x=>{ const ex=Math.ceil(x.n/2); v=v.concat(top5Vragen(x.e,x.n-ex,ex,al)) });
  if(v.length<5){ melding('Hier zijn nog te weinig vragen voor'); return }
  Q={modus:'top5',titel:'Top 5 mix',vragen:shuffle(v).slice(0,15),i:0,res:[],terug:top5Terug}; top5Terug="go('top5')"; go('quiz');
}

// inhoud van het top 5-scherm; ook gebruikt als tab in de Eindexamentrainer (terug = waar de quiz daarna heen gaat)
let top5Terug="go('top5')";
function top5Inhoud(terug){
  const t=top5(); const tg=JSON.stringify(terug||"go('top5')").replace(/"/g,'&quot;');
  const rij=x=>{ const s=etScore(x.e);
    return `<button class="lv" onclick="top5Terug=${tg};startTop5('${x.e}')"><span class="med" style="font-size:20px;font-weight:800">${x.pct}%</span>
      <span style="flex:1"><b>${esc(EINDTERMEN[x.e].t)}</b>
       <span class="t5balk" title="${x.pct}% van de examenpunten"><i style="width:${Math.min(100,x.pct*4)}%"></i></span>
       <small>${x.pct}% van de examenpunten · jouw score: ${s==null?'nog niet genoeg geoefend':s+' van 100'} · tik voor 10 vragen</small></span><span class="zacht">›</span></button>` };
  return `<div class="kaart" style="margin-bottom:10px"><p style="margin:0">Deze vijf onderwerpen leveren samen <b>${top5Totaal()}% van alle punten</b> op de eindexamens economie (2018-2026). Wie deze goed beheerst, heeft al meer dan de helft van het examen binnen.</p>
    <div class="voet" style="justify-content:flex-start;margin:12px 0 0"><button class="knop" onclick="top5Terug=${tg};startTop5Mix()">🔥 Top 5 mix · 15 vragen</button></div>
    <p class="zacht" style="font-size:14px;margin:8px 0 0">In de mix komen onderwerpen met meer examenpunten vaker terug, en ook de onderwerpen waar jij nog zwak in bent. De helft zijn echte examenvragen.</p></div>
   <div class="kaart">${t.map(rij).join('')}</div>`;
}
SCHERMEN.top5 = function(){
  return `<div class="wrap" style="max-width:760px">${kop('Top 5 examenonderwerpen',"go('leren')")}${top5Inhoud("go('top5')")}</div>${VOET()}`;
};

// tegel op het Leren-scherm, direct na Slim oefenen
const _lerenT5 = SCHERMEN.leren;
SCHERMEN.leren = function(){ const h=_lerenT5();
  const tg=`<button class="uitdaging" onclick="go('top5')"><span class="thumb" style="background:var(--bg);display:grid;place-items:center;font-size:28px">🔥</span><span><b>Top 5 examenonderwerpen</b><small>De vijf onderwerpen die samen ${top5Totaal()}% van het examen zijn. Oefen ze apart of als mix</small></span></button>`;
  const i=h.indexOf('<button class="uitdaging"', h.indexOf('startSlim()'));
  return i>0 ? h.slice(0,i)+tg+h.slice(i) : h };

// ---- docent: klasscore op de top 5 ----
function dTop5Blok(l){
  const rij=x=>{ const sc=l.map(s=>({s,v:etPct((s.et||{})[x.e])})).filter(y=>y.v!=null); const v=sc.length?Math.round(sc.reduce((a,y)=>a+y.v,0)/sc.length):null;
    return `<div class="rij" style="display:block">${balk(v,`<span style="font-size:14px">${esc(EINDTERMEN[x.e].t)} <span class="zacht">(${x.pct}%)</span></span>`).replace('class="domein"','class="domein" style="grid-template-columns:minmax(150px,1.3fr) 1fr 44px;border:0;padding:0"')}
      <div class="zacht" style="font-size:13px">${sc.length} lln met score${sc.filter(y=>y.v<50).length?` · onder 50: ${sc.filter(y=>y.v<50).length}`:''}</div></div>` };
  return `<div class="kaart" style="margin-bottom:14px"><b>Top 5 examenonderwerpen</b> <span class="zacht" style="font-size:13px">(samen ${top5Totaal()}% van de examenpunten · gemiddelde score van de klas)</span>${top5().map(rij).join('')}</div>`;
}
if(typeof dKlassikaal==='function'){
  const _dKlasT5 = dKlassikaal;
  dKlassikaal = function(sp){ const h=_dKlasT5(sp); const klassen=[...new Set(sp.map(s=>s.klas))].sort();
    let out=h; klassen.forEach(k=>{ const kop=`<div class="sectie">${esc(k)} · `; const i=out.indexOf(kop); if(i<0) return;
      const j=out.indexOf('<div style="display:grid', i); if(j<0) return;
      out=out.slice(0,j)+dTop5Blok(sp.filter(s=>s.klas===k))+out.slice(j) });
    return out };
}
