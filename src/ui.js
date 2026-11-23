// ===== Schermen =====
const app = ()=>$('#app');
let scherm='home', Q=null;
function melding(t,ms=2600){const m=document.createElement('div');m.className='melding';m.textContent=t;document.body.appendChild(m);setTimeout(()=>m.remove(),ms)}
function zetThema(){document.body.className='th-'+(S&&S.thema||'standaard')}

function go(s,arg){ scherm=s; oefenActief=(s==='quiz'); window.scrollTo(0,0); const f=SCHERMEN[s]; app().innerHTML=f(arg); if(SCHERMEN[s+'_na']) SCHERMEN[s+'_na'](arg); nav(); }
function nav(){
  let n=$('.nav'); if(!S||!S.naam||scherm==='quiz'||scherm==='welkom'){ if(n) n.remove(); return }
  if(!n){ n=document.createElement('nav'); n.className='nav'; document.body.appendChild(n) }
  const items=[['home','🗺️','Werelden'],['vaardig','📊','Vaardigheden'],['herhaal','🔁','Herhalen'],['collectie','🏅','Collectie'],['account','👤','Account']];
  n.innerHTML=items.map(([s,i,t])=>`<button class="${scherm===s?'aan':''}" onclick="go('${s}')"><span>${i}</span>${t}</button>`).join('');
}
function kop(titel,terug){ return `<div class="top">${terug?`<button class="terug" onclick="${terug}">‹ Terug</button>`:''}<h1>${titel}</h1><span class="chip">🪙 ${munten()}</span><span class="chip">⭐ ${S.xp}</span><span class="chip">⏱️ ${minuten(S.tijd)} min</span></div>` }

// --- voortgang per wereld ---
function wereldStand(w){
  const lvs=LEVELS[w]; if(!lvs) return null;
  const echte=lvs.filter(l=>l.vragen.length); let brons=0,punten=0;
  for(const l of lvs){ const r=S.lv[l.id]; if(r&&r.best>=MEDAIL[0].min) brons++; if(r) punten+=r.best }
  return {klaar:echte.filter(l=>(S.lv[l.id]||{}).best>=MEDAIL[0].min).length, totaal:echte.length, pct:Math.round(lvs.reduce((s,l)=>s+Math.min((S.lv[l.id]||{}).best||0,VRAGEN_PER_LEVEL),0)/(lvs.length*VRAGEN_PER_LEVEL)*100), diploma:!!(S.toets[w]&&S.toets[w].klaar)};
}
function levelOpen(w,i){ const lvs=LEVELS[w]; const l=lvs[i]; if(l.id.endsWith('.r')) return true; if(i===0) return true; const vorige=lvs[i-1]; return ((S.lv[vorige.id]||{}).best||0)>=MEDAIL[0].min }
function toetsOpen(w){ return LEVELS[w].filter(l=>l.vragen.length).every(l=>((S.lv[l.id]||{}).best||0)>=MEDAIL[0].min) }

const SCHERMEN = {
welkom(){
  const opties=KLASSEN.map(k=>`<option>${k}</option>`).join('');
  return `<div class="wrap" style="max-width:560px">
   <div class="groot">📈</div><h1 class="mid" style="margin:0">Economie 4 MAVO</h1><p class="mid zacht">Oefen alle hoofdstukken en de eindexamenvragen.</p>
   <div class="kaart"><h3 style="margin-top:0">Ik ben nieuw</h3>
    <label class="label">Je voor- en achternaam</label><input type="text" id="wNaam" autocomplete="name">
    <label class="label">Je klas</label><select id="wKlas">${opties}</select>
    <div class="voet"><button class="knop vol" onclick="nieuwAccount()">Start</button></div></div>
   ${serverModus()?`<div class="kaart" style="margin-top:14px"><h3 style="margin-top:0">Ik heb al een account</h3>
    <p class="zacht" style="margin-top:0">Nieuwe iPad, of de app opnieuw geopend? Vul je speler-ID en herstelcode in. Je voortgang komt terug.</p>
    <label class="label">Speler-ID</label><input type="text" id="hId" autocapitalize="characters" placeholder="bijv. ECON1-K7QD">
    <label class="label">Herstelcode (6 cijfers)</label><input type="text" id="hCode" inputmode="numeric" maxlength="6">
    <div class="voet"><button class="knop zacht vol" onclick="herstelAccount()">Herstel mijn voortgang</button></div></div>`:
   `<p class="zacht mid" style="font-size:14px">Testmodus: de voortgang staat alleen op dit apparaat.</p>`}
   <p class="zacht mid" style="font-size:13px">Tip voor de iPad: open de link in Safari, tik op deel-icoon en kies "Zet op beginscherm". Open de app daarna altijd vanaf het beginscherm.</p></div>`;
},
code(){
  return `<div class="wrap" style="max-width:560px"><div class="kaart mid"><div class="groot">🔐</div>
   <h2 style="margin-top:0">Bewaar deze gegevens goed</h2><p>Hiermee haal je je voortgang terug op een andere iPad of als de app gewist is. <b>Maak nu een screenshot.</b></p>
   <p class="zacht" style="margin-bottom:2px">Speler-ID</p><div class="code">${esc(S.id)}</div>
   <p class="zacht" style="margin-bottom:2px">Herstelcode</p><div class="code">${esc(S.code)}</div>
   <p class="zacht" style="font-size:14px">Je vindt ze later ook onder Account. Je docent kan ze ook opzoeken.</p>
   <div class="voet" style="justify-content:center"><button class="knop" onclick="go('home')">Ik heb een screenshot gemaakt</button></div></div></div>`;
},
home(){
  const w8=WERELDEN.map(w=>{const st=wereldStand(w.id); const open=!!st;
    return `<button class="tegel ${open?'':'dicht'}" style="--k:${w.kleur}" onclick="${open?`go('wereld','${w.id}')`:`melding('Hoofdstuk ${w.nr} komt binnenkort')`}">
      <span class="nr">H${w.nr}</span><span class="ic">${w.icoon}</span><h3>${esc(w.naam)}</h3>
      <p>${open?(st.diploma?'🎓 Diploma behaald':`${st.klaar} van ${st.totaal} levels`):'Binnenkort'}</p>
      ${open?`<div class="balk"><i style="width:${st.pct}%"></i></div>`:''}</button>`}).join('');
  const exOpen = typeof EXAMEN!=='undefined' && EXAMEN.vragen.length>0;
  const nh=S.herhaal.length;
  return `<div class="wrap">${kop('Hoi '+esc(S.naam.split(' ')[0])+'!')}
   <div class="sectie">Hoofdstukken</div><div class="grid">${w8}</div>
   <div class="sectie">Examen</div><div class="grid">
    <button class="tegel ${exOpen?'':'dicht'}" style="--k:#1f2430" onclick="${exOpen?"go('examen')":"melding('De eindexamentrainer komt binnenkort')"}"><span class="ic">🎓</span><h3>Eindexamentrainer</h3><p>Echte examenvragen per jaar en per domein</p></button>
    <button class="tegel ${exOpen?'':'dicht'}" style="--k:#1f2430" onclick="${exOpen?"startSprint()":"melding('De examensprint komt binnenkort')"}"><span class="ic">⚡</span><h3>Examensprint</h3><p>15 examenvragen tegen de klok</p></button>
   </div>
   <div class="sectie">Slim oefenen</div><div class="grid">
    <button class="tegel" onclick="go('vaardig')"><span class="ic">📊</span><h3>Vaardigheden</h3><p>Oefen per domein en eindterm</p></button>
    <button class="tegel" onclick="go('herhaal')"><span class="ic">🔁</span><h3>Herhaalronde</h3><p>${nh?nh+' vragen om opnieuw te doen':'Geen foute vragen, goed bezig!'}</p></button>
    <button class="tegel" onclick="go('collectie')"><span class="ic">🃏</span><h3>Collectie</h3><p>${S.kaarten.length} begrippenkaarten · ${S.badges.length} badges</p></button>
    <button class="tegel" onclick="go('docent')"><span class="ic">🔑</span><h3>Docent</h3><p>Overzicht van de klas</p></button>
   </div></div>`;
},
wereld(w){
  const W=WERELDEN.find(x=>x.id===w), lvs=LEVELS[w], st=wereldStand(w);
  const rijen=lvs.map((l,i)=>{const r=S.lv[l.id]||{}; const open=levelOpen(w,i); const m=r.best!=null?medaille(r.best):null;
    return `<button class="lv" ${open?`onclick="startLevel('${w}','${l.id}')"`:`onclick="melding('Haal eerst brons in het vorige level')"`}>
      <span class="med">${open?(m?m.e:'⚪'):'🔒'}</span><span style="flex:1"><b>${esc(l.naam)}</b><small>${esc(l.kort)}${r.best!=null?` · beste: ${r.best}/${VRAGEN_PER_LEVEL}`:''}</small></span><span class="zacht">›</span></button>`}).join('');
  const t=S.toets[w]||{}; const tOpen=toetsOpen(w);
  const kaarten=Object.keys(lvs.begrippen||{}); const heb=kaarten.filter(k=>S.kaarten.includes(k)).length;
  return `<div class="wrap" style="--k:${W.kleur}">${kop(`H${W.nr} · ${esc(W.naam)}`,"go('home')")}
   <div class="kaart" style="margin-bottom:14px"><div class="balk"><i style="width:${st.pct}%"></i></div>
    <p class="zacht" style="margin:8px 0 0">${st.klaar} van ${st.totaal} levels brons of beter · ${heb} van ${kaarten.length} begrippenkaarten</p></div>
   <div class="kaart">${rijen}</div>
   <div class="sectie">Eindtoets</div>
   <div class="kaart"><div class="rij" style="border:0"><span style="font-size:34px">${t.klaar?'🎓':(tOpen?'📝':'🔒')}</span>
    <div style="flex:1"><b>Eindtoets H${W.nr}</b><br><small class="zacht">${t.klaar?`Diploma behaald. De eerste keer had je ${t.eerste} van ${TOETS_VRAGEN} goed.`:tOpen?`${TOETS_VRAGEN} vragen uit het hele hoofdstuk. Je oefent door tot alles goed is.`:'Gaat open als je bij alle levels minstens brons hebt.'}</small></div>
    ${tOpen?`<button class="knop" onclick="startToets('${w}')">${t.klaar?'Opnieuw':'Start'}</button>`:''}</div></div></div>`;
},
quiz(){ return `<div class="wrap" style="max-width:760px;--k:${Q.kleur||'var(--acc)'}" id="qz"></div>` },
quiz_na(){ tekenVraag() },
resultaat(r){ return r },
vaardig(){
  const doms=DOMEINEN.map(d=>{const sc=domeinScore(d.id); const ets=Object.keys(EINDTERMEN).filter(k=>EINDTERMEN[k].d===d.id);
    const n=alleVragen().filter(v=>ets.includes(v.e)).length+(d.id==='rek'?1:0);
    const kl=sc==null?'var(--lijn)':sc>=75?'var(--goed)':sc>=50?'var(--goud)':'var(--fout)';
    const sub=ets.map(k=>{const s=etScore(k); const has=alleVragen().some(v=>v.e===k)||(GENS&&Object.keys(GENS).some(g=>maakGen(g).e===k));
       if(!has) return ''; const c=s==null?'var(--lijn)':s>=75?'var(--goed)':s>=50?'var(--goud)':'var(--fout)';
       return `<button class="lv" onclick="startEindterm('${k}')"><span class="med" style="font-size:14px;color:${c}">●</span><span style="flex:1"><b style="font-weight:600">${esc(EINDTERMEN[k].t)}</b><small>${s==null?'Nog niet genoeg geoefend':'Score '+s}</small></span><span class="zacht">›</span></button>`}).join('');
    return `<div class="kaart" style="margin-bottom:12px"><div class="domein" style="border:0"><span style="font-size:26px">${d.icoon}</span><div><b>${d.naam}</b><div class="balk" style="margin-top:6px"><i style="width:${sc||0}%;background:${kl}"></i></div></div><span class="pct">${sc==null?'–':sc}</span></div>
     ${n?`<button class="knop zacht vol" style="margin:6px 0" onclick="startDomein('${d.id}')">Oefen ${d.naam.toLowerCase()}</button>`:'<p class="zacht" style="margin:4px 0">Komt erbij met de volgende hoofdstukken.</p>'}${sub}</div>`}).join('');
  return `<div class="wrap">${kop('Vaardigheden','go(\'home\')')}<p class="zacht">Je score per onderdeel telt je laatste 20 antwoorden. Recente antwoorden tellen zwaarder. Groen is 75 of hoger.</p>${doms}</div>`;
},
herhaal(){
  const n=S.herhaal.length;
  return `<div class="wrap">${kop('Herhaalronde','go(\'home\')')}<div class="kaart mid"><div class="groot">🔁</div>
   <p>${n?`Er staan <b>${n}</b> vragen klaar die je eerder fout had. Een vraag verdwijnt als je hem twee keer goed hebt.`:'Je hebt geen foute vragen openstaan.'}</p>
   ${n?`<button class="knop" onclick="startHerhaal()">Start herhaalronde</button>`:''}</div></div>`;
},
collectie(){
  const blok=WERELDEN.filter(w=>LEVELS[w.id]&&LEVELS[w.id].begrippen).map(w=>{const b=LEVELS[w.id].begrippen; const ks=Object.keys(b).sort((a,c)=>a.localeCompare(c,'nl'));
    return `<div class="sectie">H${w.nr} · ${ks.filter(k=>S.kaarten.includes(k)).length} van ${ks.length} kaarten</div><div class="kaarten">${ks.map(k=>S.kaarten.includes(k)?`<div class="bk"><b>${esc(k)}</b>${esc(b[k])}</div>`:`<div class="bk nee"><b>?</b>.</div>`).join('')}</div>`}).join('');
  const bad=BADGES.map(x=>{const heb=S.badges.includes(x.id); return `<div class="bk" style="${heb?'':'opacity:.4'}"><b>${x.i} ${esc(x.n)}</b>${esc(x.o)}</div>`}).join('');
  const markt=THEMAS.map(t=>{const heb=S.gekocht.includes(t.id); return `<div class="bk"><b>${t.i} ${esc(t.n)}</b>${heb?(S.thema===t.id?'In gebruik':`<button class="knop zacht" style="min-height:38px;padding:6px 12px;margin-top:6px" onclick="kiesThema('${t.id}')">Gebruik</button>`):`<button class="knop" style="min-height:38px;padding:6px 12px;margin-top:6px" onclick="koopThema('${t.id}')">🪙 ${t.p}</button>`}</div>`}).join('');
  return `<div class="wrap">${kop('Collectie','go(\'home\')')}<p class="zacht">Elke begrippenvraag die je goed hebt levert een kaart op. Verzamel ze allemaal!</p>
   <div class="sectie">Badges</div><div class="kaarten">${bad}</div><div class="sectie">Markt: kleuren voor je app</div><div class="kaarten">${markt}</div>${blok}</div>`;
},
account(){
  const st=serverModus()?(syncStatus==='ok'?`<span class="sync ok">✔ Opgeslagen op de server${syncTijd?' om '+new Date(syncTijd).toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit'}):''}</span>`:syncStatus==='fout'?`<span class="sync fout">Nog niet opgeslagen op de server (${esc(syncFout)}). Dit gebeurt vanzelf als er internet is.</span>`:'<span class="sync">Nog niet gesynchroniseerd</span>'):'<span class="sync">Testmodus: alleen op dit apparaat</span>';
  return `<div class="wrap" style="max-width:640px">${kop('Account','go(\'home\')')}
   <div class="kaart"><p style="margin-top:0"><b>${esc(S.naam)}</b> · ${esc(S.klas)}</p>
    <p class="zacht" style="margin-bottom:2px">Speler-ID</p><div class="code">${esc(S.id||'–')}</div>
    <p class="zacht" style="margin-bottom:2px">Herstelcode</p><div class="code">${esc(S.code||'–')}</div>
    <p id="syncStat" style="margin-top:12px">${st}</p>
    ${serverModus()?`<button class="knop zacht" onclick="sync().then(()=>go('account'))">Nu opslaan</button>`:''}</div>
   <div class="sectie">Reservekopie</div><div class="kaart"><p class="zacht" style="margin-top:0">Extra zekerheid: bewaar een bestand met je voortgang, of zet er een terug.</p>
    <div class="voet" style="justify-content:flex-start"><button class="knop zacht" onclick="exportBestand()">Bewaar bestand</button>
    <label class="knop zacht">Zet bestand terug<input type="file" accept=".json,application/json" style="display:none" onchange="importBestand(this.files[0])"></label></div></div>
   <p class="zacht" style="font-size:13px">Versie ${VERSIE}</p></div>`;
},
docent(){
  return `<div class="wrap">${kop('Docent','go(\'home\')')}<div class="kaart" style="max-width:420px">
   ${serverModus()?`<label class="label" style="margin-top:0">Docentcode</label><input type="password" id="dCode" inputmode="numeric">
   <div class="voet"><button class="knop" onclick="laadDocent()">Open overzicht</button></div>`:`<p style="margin-top:0">Het klassenoverzicht werkt zodra de server is gekoppeld. Nu zie je alleen dit apparaat.</p><button class="knop" onclick="toonDocent({spelers:[samenvatLokaal()]})">Toon dit apparaat</button>`}</div><div id="dOut"></div></div>`;
}
};

// ===== Account =====
async function nieuwAccount(){
  const naam=$('#wNaam').value.trim().replace(/\s+/g,' '), klas=$('#wKlas').value;
  if(naam.length<3||!naam.includes(' ')){ melding('Vul je voor- én achternaam in'); return }
  S=nieuweStaat(); S.naam=naam; S.klas=klas;
  if(serverModus()){
    try{ const j=await api('nieuw',{naam,klas}); S.id=j.id; S.code=j.code; bewaar(false); await sync(); go('code'); }
    catch(e){ S=null; melding('Geen verbinding met de server. Probeer het opnieuw. ('+e.message+')',4000) }
  } else { S.id='LOKAAL-'+Math.random().toString(36).slice(2,6).toUpperCase(); bewaar(false); go('home') }
}
async function herstelAccount(){
  const id=$('#hId').value.trim().toUpperCase(), code=$('#hCode').value.trim();
  if(!id||!/^\d{6}$/.test(code)){ melding('Vul je speler-ID en de 6 cijfers in'); return }
  try{ const j=await api('herstel',{id,code}); S=Object.assign(nieuweStaat(),j.staat); S.id=id; S.code=code; bewaar(false); zetThema(); melding('Welkom terug, je voortgang is hersteld!'); go('home') }
  catch(e){ melding(e.message,4000) }
}
function exportBestand(){
  const b=new Blob([JSON.stringify(S)],{type:'application/json'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(b); a.download=`Economie4M_${S.klas}_${S.naam.replace(/\s+/g,'_')}_${vandaag()}.json`; a.click();
}
function importBestand(f){ if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const x=JSON.parse(r.result); if(!x.naam) throw 0; S=S?mergeStaat(S,x):Object.assign(nieuweStaat(),x); bewaar(); melding('Voortgang teruggezet'); go('home') }catch(e){ melding('Dit bestand kan ik niet lezen') } }; r.readAsText(f) }

// ===== Badges en markt =====
const BADGES=[
 {id:'start',i:'🌱',n:'Eerste stap',o:'Je eerste level gespeeld'},
 {id:'brons5',i:'🥉',n:'Op stoom',o:'5 levels brons of beter'},
 {id:'goud3',i:'🥇',n:'Goudzoeker',o:'3 levels met goud'},
 {id:'diploma',i:'🎓',n:'Geslaagd',o:'Een eindtoets helemaal goed afgerond'},
 {id:'kaart20',i:'🃏',n:'Verzamelaar',o:'20 begrippenkaarten'},
 {id:'uur',i:'⏱️',n:'Doorzetter',o:'60 minuten geoefend'},
 {id:'reken',i:'🧮',n:'Rekenwonder',o:'Goud in een rekenlab'},
 {id:'herhaal',i:'🔁',n:'Foutloos',o:'Herhaalronde leeg gemaakt'}
];
function checkBadges(){
  const nieuw=[]; const geef=id=>{ if(!S.badges.includes(id)){ S.badges.push(id); nieuw.push(BADGES.find(b=>b.id===id)) } };
  const lv=Object.entries(S.lv);
  if(lv.length) geef('start');
  if(lv.filter(([k,r])=>r.best>=6).length>=5) geef('brons5');
  if(lv.filter(([k,r])=>r.best>=8).length>=3) geef('goud3');
  if(Object.values(S.toets).some(t=>t.klaar)) geef('diploma');
  if(S.kaarten.length>=20) geef('kaart20');
  if(S.tijd>=3600) geef('uur');
  if(lv.some(([k,r])=>k.endsWith('.r')&&r.best>=8)) geef('reken');
  return nieuw;
}
const THEMAS=[{id:'standaard',i:'🟠',n:'Standaard',p:0},{id:'zee',i:'🌊',n:'Zee',p:40},{id:'bos',i:'🌲',n:'Bos',p:40},{id:'snoep',i:'🍬',n:'Snoep',p:60},{id:'nacht',i:'🌙',n:'Nacht',p:100}];
function koopThema(id){ const t=THEMAS.find(x=>x.id===id); if(munten()<t.p){ melding(`Je hebt ${t.p} munten nodig`); return } S.mUit+=t.p; S.gekocht.push(id); S.thema=id; bewaar(); zetThema(); go('collectie') }
function kiesThema(id){ S.thema=id; bewaar(); zetThema(); go('collectie') }

// ===== Oefenen: rondes starten =====
function vragenVoorLevel(l){
  const vaste=shuffle(l.vragen); const gens=(l.gens||[]);
  let set;
  if(!vaste.length) set=Array.from({length:VRAGEN_PER_LEVEL},()=>maakGen(pick(gens)));
  else { const nGen=Math.min(gens.length?2:0,VRAGEN_PER_LEVEL); set=vaste.slice(0,VRAGEN_PER_LEVEL-nGen).concat(Array.from({length:nGen},()=>maakGen(pick(gens)))); }
  return shuffle(set);
}
function startLevel(w,lid){ const l=LEVELS[w].find(x=>x.id===lid); const W=WERELDEN.find(x=>x.id===w);
  Q={modus:'level',titel:l.naam,w,lid,kleur:W.kleur,vragen:vragenVoorLevel(l),i:0,res:[],terug:`go('wereld','${w}')`}; go('quiz') }
function startToets(w){ const W=WERELDEN.find(x=>x.id===w); const lvs=LEVELS[w].filter(l=>l.vragen.length);
  let pool=[]; lvs.forEach(l=>pool.push(...shuffle(l.vragen).slice(0,3).map(v=>Object.assign({l:l.id},v)))); pool=shuffle(pool).slice(0,TOETS_VRAGEN-2);
  const gens=[...new Set(LEVELS[w].flatMap(l=>l.gens||[]))]; pool.push(maakGen(pick(gens)),maakGen(pick(gens)));
  Q={modus:'toets',titel:`Eindtoets H${W.nr}`,w,kleur:W.kleur,vragen:shuffle(pool),i:0,res:[],ronde:1,terug:`go('wereld','${w}')`}; go('quiz') }
function startHerhaal(){ const v=shuffle(S.herhaal).slice(0,10).map(vraagById).filter(Boolean); if(!v.length){go('herhaal');return}
  Q={modus:'herhaal',titel:'Herhaalronde',vragen:v,i:0,res:[],terug:"go('herhaal')"}; go('quiz') }
function startEindterm(k){ let v=shuffle(alleVragen().filter(x=>x.e===k)).slice(0,8); const g=Object.keys(GENS).filter(n=>maakGen(n).e===k);
  while(v.length<6&&g.length) v.push(maakGen(pick(g))); if(!v.length){melding('Hier zijn nog geen vragen voor');return}
  Q={modus:'et',titel:EINDTERMEN[k].t,vragen:shuffle(v),i:0,res:[],terug:"go('vaardig')"}; go('quiz') }
function startDomein(d){ const ets=Object.keys(EINDTERMEN).filter(k=>EINDTERMEN[k].d===d);
  // zwakste eindtermen vaker: sorteer op score
  let v=alleVragen().filter(x=>ets.includes(x.e)); v=shuffle(v).sort((a,b)=>(etScore(a.e)??50)-(etScore(b.e)??50)).slice(0,10);
  if(d==='rek'||v.length<6){ const g=Object.keys(GENS).filter(n=>ets.includes(maakGen(n).e)); while(v.length<10&&g.length) v.push(maakGen(pick(g))) }
  if(!v.length){melding('Hier zijn nog geen vragen voor');return}
  const D=DOMEINEN.find(x=>x.id===d); Q={modus:'domein',titel:D.naam,kleur:D.kleur,vragen:shuffle(v),i:0,res:[],terug:"go('vaardig')"}; go('quiz') }

// ===== Quiz-engine =====
let antw=null;
function tekenVraag(){
  const v=Q.vragen[Q.i]; antw=null; Q.fase='vraag';
  if(v.t==='mc'&&!v._mix){ const ord=shuffle(v.o.map((_,i)=>i)); v._mix=ord }
  const bol=Q.vragen.map((x,i)=>`<i class="${i<Q.res.length?(Q.modus==='toets'?'nu':(Q.res[i]?'g':'f')):(i===Q.i?'nu':'')}"></i>`).join('');
  let body='';
  if(v.t==='mc') body=`<div class="opties">${v._mix.map((oi,k)=>`<button class="optie" data-k="${oi}" onclick="kies(this,${oi})"><span class="l">${'ABCD'[k]}</span><span>${esc(v.o[oi])}</span></button>`).join('')}</div>`;
  else if(v.t==='ex') body=`${v.bron?`<div class="kaart" style="margin-bottom:12px;font-size:15px;white-space:pre-wrap">${esc(v.bron)}</div>`:''}<div class="opties">${v.o.map((o,k)=>`<button class="optie" data-k="${k}" onclick="kies(this,${k})"><span class="l">${'ABCDE'[k]}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
  else if(v.t==='wo') body=`<div class="opties" style="grid-template-columns:1fr 1fr"><button class="optie" data-k="true" onclick="kies(this,true)"><span class="l">✔</span><span>Waar</span></button><button class="optie" data-k="false" onclick="kies(this,false)"><span class="l">✘</span><span>Niet waar</span></button></div>`;
  else if(v.t==='koppel'){ if(!v._r) v._r=shuffle([...new Set(v.p.map(p=>p[1]))]); antw=v.p.map(()=>'');
    body=`<div class="koppel">${v.p.map((p,i)=>`<b>${esc(p[0])}</b><select data-i="${i}" onchange="antw[${i}]=this.value;$('#ok').disabled=antw.some(x=>!x)"><option value="">Kies…</option>${v._r.map(r=>`<option>${esc(r)}</option>`).join('')}</select>`).join('')}</div>`; }
  else if(v.t==='reken') body=`<div class="reken">${v.eh==='€'?'€':''}<input type="text" id="rIn" inputmode="decimal" autocomplete="off" oninput="antw=this.value;$('#ok').disabled=!this.value.trim()" onkeydown="if(event.key==='Enter'&&!$('#ok').disabled)controleer()">${v.eh==='%'?'%':''}</div><p class="zacht" style="font-size:14px">Gebruik een komma voor decimalen. ${v.eh==='€'?'Rond af op 2 decimalen.':'Rond af op 1 decimaal.'}</p>`;
  $('#qz').innerHTML=`<div class="top"><button class="terug" onclick="if(confirm('Stoppen? Deze ronde telt dan niet mee.'))${Q.terug.replace(/"/g,'&quot;')}">‹ Stop</button><h1 style="font-size:18px">${esc(Q.titel)}</h1><span class="chip">${Q.i+1} / ${Q.vragen.length}</span></div>
   <div class="voortgang">${bol}</div><div class="kaart">${v.ctx?`<p class="zacht" style="margin-top:0;font-size:14px">${esc(v.ctx)}</p>`:''}<div class="vraag">${esc(v.q)}</div>${body}<div id="fb"></div>
   <div class="voet"><button class="knop" id="ok" disabled onclick="controleer()">Controleer</button></div></div>`;
  if(v.t==='reken') setTimeout(()=>$('#rIn')&&$('#rIn').focus(),50);
}
function kies(el,k){ if(Q.fase!=='vraag') return; document.querySelectorAll('.optie').forEach(x=>x.classList.remove('kies')); el.classList.add('kies'); antw=k; $('#ok').disabled=false }
function juistTekst(v){
  if(v.t==='mc'||v.t==='ex') return v.o[v.a]; if(v.t==='wo') return v.a?'Waar':'Niet waar';
  if(v.t==='reken') return v.eh==='€'?eur(v.a):(nl1(v.a)+(v.eh==='%'?'%':'')); if(v.t==='koppel') return v.p.map(p=>p[0]+' → '+p[1]).join(' · ');
}
function controleer(){
  if(Q.fase!=='vraag') return; const v=Q.vragen[Q.i]; const goed=nakijken(v,antw); Q.res.push(goed); const nk=registreer(v,goed); if(nk) Q.kaartGemeld=(Q.kaartGemeld||[]).concat(nk); Q.fase='fb';
  const toets=Q.modus==='toets';
  if(!toets){
    if(v.t==='mc'||v.t==='wo'||v.t==='ex') document.querySelectorAll('.optie').forEach(x=>{ const k=x.dataset.k; const isJ=String(v.a)===k; if(isJ) x.classList.add('goed'); else if(x.classList.contains('kies')) x.classList.add('fout') });
    if(v.t==='koppel') document.querySelectorAll('.koppel select').forEach(s=>{ s.classList.add(s.value===v.p[s.dataset.i][1]?'goed':'fout'); s.disabled=true });
    if(v.t==='reken'){ const i=$('#rIn'); i.classList.add(goed?'goed':'fout'); i.disabled=true }
    $('#fb').innerHTML=`<div class="fb ${goed?'goed':'fout'}"><b>${goed?pick(['Goed zo!','Klopt!','Top!','Helemaal goed!']):'Niet goed.'}</b> ${goed?'':'Het juiste antwoord: <b>'+esc(juistTekst(v))+'</b>. '}${v.u?'<br>'+esc(v.u):''}${nk?`<br>🃏 Nieuwe kaart: <b>${esc(v.b)}</b>`:''}</div>`;
  }
  document.querySelectorAll('.optie').forEach(x=>x.disabled=true);
  const laatste=Q.i===Q.vragen.length-1; const ok=$('#ok'); ok.disabled=false; ok.textContent=laatste?'Bekijk resultaat':'Volgende'; ok.onclick=volgende;
  if(toets) volgende(); else bewaar();
}
function volgende(){ if(Q.i<Q.vragen.length-1){ Q.i++; tekenVraag() } else klaar() }

function klaar(){
  oefenActief=false; const n=Q.res.filter(Boolean).length, tot=Q.vragen.length; let extra='', titel='', icoon='🎉';
  if(Q.modus==='level'){
    const oud=(S.lv[Q.lid]||{}).best; const r=S.lv[Q.lid]||{best:0,n:0}; r.n++; r.best=Math.max(r.best||0,n); r.laatst=n; S.lv[Q.lid]=r;
    const m=medaille(n), mOud=oud!=null?medaille(oud):null;
    if(m&&(!mOud||m.min>mOud.min)){ const bon=m.m-(mOud?mOud.m:0); S.mVerd+=bon; extra+=`<p>${m.e} Nieuwe medaille: <b>${m.n}</b>! +${bon} munten</p>` }
    icoon=m?m.e:'💪'; titel=m?`${n} van ${tot} goed`:`${n} van ${tot} goed. Voor brons heb je ${MEDAIL[0].min} nodig.`;
  } else if(Q.modus==='toets'){
    return toetsUitslag();
  } else if(Q.modus==='herhaal'){ if(!S.herhaal.length) { S.badges.includes('herhaal')||S.badges.push('herhaal') } titel=`${n} van ${tot} goed`; extra=`<p class="zacht">Nog ${S.herhaal.length} vragen in je herhaalronde.</p>` }
  else if(Q.modus==='sprint'){ const s=S.sprint||{best:0}; const nieuwRec=n>(s.best||0); s.best=Math.max(s.best||0,n); s.n=(s.n||0)+1; S.sprint=s; titel=`${n} van ${tot} goed`; extra=`<p>${nieuwRec?'🏆 Nieuw record!':'Je record: '+s.best}</p>` }
  else titel=`${n} van ${tot} goed`;
  const nb=checkBadges(); nb.forEach(b=>extra+=`<p>${b.i} Nieuwe badge: <b>${esc(b.n)}</b></p>`);
  if(Q.kaartGemeld&&Q.kaartGemeld.length) extra+=`<p>🃏 ${Q.kaartGemeld.length} nieuwe begrippenkaart${Q.kaartGemeld.length>1?'en':''}</p>`;
  bewaar(); sync();
  const fout=Q.vragen.filter((v,i)=>!Q.res[i]);
  app().innerHTML=`<div class="wrap" style="max-width:640px"><div class="kaart mid"><div class="groot">${icoon}</div><h2 style="margin:0 0 6px">${titel}</h2>${extra}
   <div class="voet" style="justify-content:center"><button class="knop zacht" onclick="${Q.terug.replace(/"/g,'&quot;')}">Terug</button>${Q.modus==='level'?`<button class="knop" onclick="startLevel('${Q.w}','${Q.lid}')">Nog een keer</button>`:''}</div></div>
   ${fout.length?`<div class="sectie">Deze had je fout</div><div class="kaart">${fout.map(v=>`<div class="rij" style="display:block"><b>${esc(v.q)}</b><br><span class="zacht">Juist: ${esc(juistTekst(v))}</span></div>`).join('')}</div>`:''}</div>`;
  scherm='resultaat'; nav();
}
function toetsUitslag(){
  const n=Q.res.filter(Boolean).length, tot=Q.vragen.length; const t=S.toets[Q.w]||{n:0}; const W=WERELDEN.find(x=>x.id===Q.w);
  if(Q.ronde===1){ t.n=(t.n||0)+1; t.laatsteEerste=n; if(t.eerste==null) t.eerste=n; t.beste=Math.max(t.beste||0,n) }
  const fout=Q.vragen.filter((v,i)=>!Q.res[i]);
  // waar moet je nog mee oefenen: per level
  const perLevel={}; fout.forEach(v=>{ const l=v.l||(v.gen?'rekenen':'?'); perLevel[l]=(perLevel[l]||0)+1 });
  const naam=id=>{const l=(LEVELS[Q.w]||[]).find(x=>x.id===id); return l?l.naam:'Rekenen'};
  let html;
  if(!fout.length){
    t.klaar=1; S.toets[Q.w]=t; S.mVerd+=30; checkBadges(); bewaar(); sync();
    html=`<div class="kaart mid"><div class="groot">🎓</div><h2 style="margin:0">Alles goed!</h2><p>Je hebt de eindtoets van H${W.nr} afgerond en je diploma verdiend. +30 munten</p>
     ${Q.ronde>1?`<p class="zacht">Je had de eerste keer ${t.laatsteEerste} van ${TOETS_VRAGEN} goed en hebt doorgezet tot alles klopte.</p>`:''}<div class="voet" style="justify-content:center"><button class="knop" onclick="go('wereld','${Q.w}')">Terug naar H${W.nr}</button></div></div>`;
  } else {
    S.toets[Q.w]=t; bewaar(); sync();
    html=`<div class="kaart mid"><div class="groot">📝</div><h2 style="margin:0">${n} van ${tot} goed</h2><p>Nog <b>${fout.length}</b> te gaan. Bekijk de uitleg en maak die vragen opnieuw tot alles goed is.</p>
     <div class="voet" style="justify-content:center"><button class="knop" onclick="toetsOpnieuw()">Oefen de ${fout.length} foute vragen</button></div></div>
     <div class="sectie">Hier moet je nog mee oefenen</div><div class="kaart">${Object.entries(perLevel).map(([l,c])=>`<div class="rij"><span style="flex:1">${esc(naam(l))}</span><b>${c} fout</b></div>`).join('')}</div>
     <div class="sectie">Uitleg bij je fouten</div><div class="kaart">${fout.map(v=>`<div class="rij" style="display:block"><b>${esc(v.q)}</b><br>Juist: <b>${esc(juistTekst(v))}</b>${v.u?`<br><span class="zacht">${esc(v.u)}</span>`:''}</div>`).join('')}</div>`;
    Q.fout=fout;
  }
  app().innerHTML=`<div class="wrap" style="max-width:680px">${html}</div>`; scherm='resultaat'; nav();
}
function toetsOpnieuw(){ const v=Q.fout.map(x=>x.gen?maakGen(x.id.slice(4)):x); v.forEach(x=>delete x._mix); Q=Object.assign(Q,{vragen:shuffle(v),i:0,res:[],ronde:Q.ronde+1}); go('quiz') }

// ===== Docent =====
function samenvatLokaal(){ return samenvat(S) }
function samenvat(s){ // zelfde berekening als op de server
  const dom={}; DOMEINEN.forEach(d=>{ const sc=Object.keys(EINDTERMEN).filter(k=>EINDTERMEN[k].d===d.id).map(k=>{const et=(s.et||{})[k]; if(!et||et.r.length<3) return null; let a=0,w=0; et.r.forEach((x,i)=>{a+=x*(i+1);w+=i+1}); return Math.round(a/w*100)}).filter(x=>x!==null); dom[d.id]=sc.length?Math.round(sc.reduce((a,b)=>a+b,0)/sc.length):null });
  const fout={}; Object.entries(s.vr||{}).forEach(([k,r])=>{ if(r.f) fout[k]=r.f });
  return {id:s.id,naam:s.naam,klas:s.klas,code:s.code,laatst:s.upd,tijd:s.tijd||0,tijdWeek:(s.week||{})[weekId()]||0,xp:s.xp||0,lv:s.lv||{},toets:s.toets||{},dom,fout,et:s.et||{}};
}
async function laadDocent(){ const c=$('#dCode').value.trim(); try{ const j=await api('overzicht',{docentcode:c}); toonDocent(j) }catch(e){ melding(e.message,4000) } }
let D=null, dKlas='alle', dSort='week';
function toonDocent(j){ D=j; tekenDocent() }
function tekenDocent(){
  const klassen=[...new Set(D.spelers.map(s=>s.klas))].sort();
  let sp=D.spelers.filter(s=>dKlas==='alle'||s.klas===dKlas);
  sp=sp.slice().sort((a,b)=>dSort==='week'?b.tijdWeek-a.tijdWeek:dSort==='tijd'?b.tijd-a.tijd:a.naam.localeCompare(b.naam,'nl'));
  const lvNamen=Object.values(LEVELS).flat();
  const medStr=s=>WERELDEN.filter(w=>LEVELS[w.id]).map(w=>{const l=LEVELS[w.id]; const b=l.filter(x=>((s.lv[x.id]||{}).best||0)>=6).length; const t=s.toets[w.id]; return `H${w.nr}: ${b}/${l.length}${t?` · toets ${t.eerste!=null?t.eerste+'/'+TOETS_VRAGEN:''}${t.klaar?' 🎓':''}`:''}`}).join('<br>');
  const dc=v=>v==null?'<span class="zacht">–</span>':`<b style="color:${v>=75?'var(--goed)':v>=50?'var(--goud)':'var(--fout)'}">${v}</b>`;
  // top 5 vaakst fout in deze selectie
  const tel={}; sp.forEach(s=>Object.entries(s.fout||{}).forEach(([k,n])=>{ if(!k.startsWith('gen.')) tel[k]=(tel[k]||0)+n }));
  const top=Object.entries(tel).sort((a,b)=>b[1]-a[1]).slice(0,5);
  // gemiddelde per eindterm
  const etGem={}; Object.keys(EINDTERMEN).forEach(k=>{ const sc=sp.map(s=>{const et=s.et&&s.et[k]; if(!et||et.r.length<3) return null; let a=0,w=0; et.r.forEach((x,i)=>{a+=x*(i+1);w+=i+1}); return a/w*100}).filter(x=>x!=null); if(sc.length) etGem[k]={g:Math.round(sc.reduce((a,b)=>a+b,0)/sc.length),n:sc.length} });
  $('#dOut').innerHTML=`<div class="voet" style="justify-content:flex-start;margin:14px 0">
    <select style="max-width:180px" onchange="dKlas=this.value;tekenDocent()"><option value="alle">Alle klassen</option>${klassen.map(k=>`<option ${k===dKlas?'selected':''}>${esc(k)}</option>`).join('')}</select>
    <select style="max-width:240px" onchange="dSort=this.value;tekenDocent()"><option value="week" ${dSort==='week'?'selected':''}>Ranglijst: oefentijd deze week</option><option value="tijd" ${dSort==='tijd'?'selected':''}>Ranglijst: oefentijd totaal</option><option value="naam" ${dSort==='naam'?'selected':''}>Op naam</option></select>
    <button class="knop zacht" onclick="window.print()">Afdrukken</button></div>
   <div class="kaart tabelwrap"><table><thead><tr><th>#</th><th>Leerling</th><th>Klas</th><th>Deze week</th><th>Totaal</th><th>Voortgang</th>${DOMEINEN.map(d=>`<th title="${d.naam}">${d.icoon}</th>`).join('')}<th>Laatst</th><th>ID · code</th></tr></thead><tbody>
    ${sp.map((s,i)=>`<tr><td>${dSort==='naam'?'':i+1}</td><td><b>${esc(s.naam)}</b></td><td>${esc(s.klas)}</td><td>${minuten(s.tijdWeek)} min</td><td>${minuten(s.tijd)} min</td><td style="font-size:13px">${medStr(s)}</td>${DOMEINEN.map(d=>`<td>${dc(s.dom[d.id])}</td>`).join('')}<td style="font-size:13px">${s.laatst?new Date(s.laatst).toLocaleDateString('nl-NL',{day:'numeric',month:'short'}):'–'}</td><td style="font-size:12px">${esc(s.id||'')}<br>${esc(s.code||'')}</td></tr>`).join('')}
   </tbody></table></div>
   <div class="sectie">Top 5 vaakst fout${dKlas!=='alle'?' in '+esc(dKlas):''}</div><div class="kaart">${top.length?top.map(([k,n])=>{const v=vraagById(k); return `<div class="rij" style="display:block"><b>${n}× fout</b> · ${esc(v?v.q:k)}<br><span class="zacht">Juist: ${v?esc(juistTekst(v)):''}</span></div>`}).join(''):'<p class="zacht">Nog geen gegevens.</p>'}</div>
   <div class="sectie">Klasgemiddelde per eindterm</div><div class="kaart">${Object.keys(etGem).length?Object.entries(etGem).sort((a,b)=>a[1].g-b[1].g).map(([k,x])=>`<div class="rij"><span style="flex:1">${esc(EINDTERMEN[k].t)} <span class="zacht">(${k})</span></span><span class="zacht" style="font-size:13px">${x.n} lln</span>${dc(x.g)}</div>`).join(''):'<p class="zacht">Nog geen gegevens.</p>'}</div>`;
}

// ===== Start =====
function start(){
  laad(); zetThema();
  toonSyncStatus=()=>{ const el=$('#syncStat'); if(el&&scherm==='account') go('account') };
  if(!S||!S.naam) go('welkom'); else { go('home'); if(serverModus()) sync(); }
}
