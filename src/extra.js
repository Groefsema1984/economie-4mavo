// ===== Extra leermiddelen =====
// 1 flitskaarten met herhaling op afstand, 2 formulekaart en rekenhulp, 3 grafiektraining (klikken in een grafiek),
// 4 proeftoets per hoofdstuk, 5 een heel examen op tijd, 6 foutenschrift. Nergens een cijfer: alleen aantal goed of punten
// en wat je nog moet oefenen.
const DAG=864e5;
Object.assign(FOTO,{fouten:FOTO.herhaal,leren:FOTO.vaardig,flits:FOTO.collectie,flitsen:FOTO.collectie,formules:FOTO.vaardig,proef:FOTO.herhaal,exvol:FOTO.examen,uitleg:FOTO.start});

// ---------- Leren: overzicht van alle extra's ----------
SCHERMEN.leren = function(){
  const due=fkDue().length, nieuw=fkNieuw().length;
  const tegel=(ic,t,s,on)=>`<button class="uitdaging" onclick="${on}"><span class="thumb" style="background:var(--bg);display:grid;place-items:center;font-size:28px">${ic}</span><span><b>${t}</b><small>${s}</small></span></button>`;
  return `<div class="wrap" style="max-width:760px">${kop('Leren en toetsen',"go('home')")}${modusKeuze()}<div class="kaart">
   ${tegel('🎯','Slim oefenen','10 vragen over je zwakste onderwerpen, met extra vragen als je iets fout hebt',"startSlim()")}
   ${tegel('🃏','Flitskaarten',due?`${due} begrippen om nu te herhalen`:`${nieuw} nieuwe begrippen om te leren`,"go('flits')")}
   ${tegel('📕','Foutenschrift',(()=>{const g=foutGroepen(S.vr,S.herhaal).filter(x=>x.open);return g.length?`${g.reduce((a,x)=>a+x.open,0)} fouten open bij ${g.length} onderwerpen`:'Al je fouten per onderwerp, zodat je weet waar je aan moet werken'})(),"go('fouten')")}
   ${tegel('🧮','Formulekaart en rekenhulp','Alle formules voor het examen met een voorbeeld, een rekenhulp en de rekenregels',"go('formules')")}
   ${tegel('📈','Grafiektraining','Klik in de grafiek: marktevenwicht, verschuivingen, Lorenzcurve',"startGrafiek()")}
   ${tegel('⏱️','Proeftoets per hoofdstuk','15 vragen op tijd, zonder hulp tussendoor. Je ziet hoeveel je goed hebt en wat je nog moet oefenen',"go('proef')")}
   ${tegel('🎓','Examen op tijd','Een heel oud examen in 2 uur, daarna nakijken met het antwoordmodel',"exTab='tijd';go('examen')")}
  </div></div>${VOET()}`;
};

// ---------- 1. Flitskaarten ----------
// Leitner-systeem: elke kaart zit in een bak (0 t/m 6). Wist je hem, dan gaat hij een bak verder en komt hij later terug.
// S.fk[begrip] = [bak, tijdstip waarop hij weer aan de beurt is] (een array, zodat de server de nieuwste versie houdt)
const FK_INT=[0,1,3,7,14,30,60];
function alleBegrippen(d){ const out=[], gezien=new Set(); WERELDEN.forEach(w=>{ if(d&&d!==w.id) return; const b=(LEVELS[w.id]||{}).begrippen||{};
  Object.keys(b).forEach(k=>{ if(!gezien.has(k)){ gezien.add(k); out.push({k,def:b[k],w:w.id}) } }) }); return out }
function fkStaat(){ if(!S.fk||Array.isArray(S.fk)) S.fk={}; return S.fk }
function fkDue(d){ const fk=fkStaat(), nu=Date.now(); return alleBegrippen(d).filter(x=>fk[x.k]&&fk[x.k][1]<=nu) }
function fkNieuw(d){ const fk=fkStaat(); return shuffle(alleBegrippen(d).filter(x=>!fk[x.k])).sort((a,b)=>(S.kaarten.includes(b.k)?1:0)-(S.kaarten.includes(a.k)?1:0)) }
let FK=null, fkOm=false;
function startFlits(d){ const due=shuffle(fkDue(d)).slice(0,30); const nw=fkNieuw(d).slice(0,Math.max(0,Math.min(10,30-due.length)));
  const lijst=due.concat(nw); if(!lijst.length){ melding('Hier zijn nu geen kaarten om te oefenen'); return }
  FK={d,lijst,i:0,om:false,ok:0,bijna:0,nee:0}; go('flitsen') }
SCHERMEN.flits = function(){
  const fk=fkStaat();
  const rij=(d,naam,ic)=>{ const al=alleBegrippen(d); if(!al.length) return ''; const due=fkDue(d).length, nw=al.filter(x=>!fk[x.k]).length, vast=al.filter(x=>fk[x.k]&&fk[x.k][0]>=4).length;
    return `<button class="lv" onclick="startFlits(${d?`'${d}'`:''})"><span class="med">${ic}</span><span style="flex:1"><b>${esc(naam)}</b><small>${due?`<b style="color:var(--fout)">${due} om te herhalen</b> · `:''}${nw} nieuw · ${vast} van ${al.length} zitten vast</small><div class="balk" style="margin-top:6px"><i style="width:${Math.round(vast/al.length*100)}%"></i></div></span><span class="zacht">›</span></button>` };
  return `<div class="wrap" style="max-width:760px">${kop('Flitskaarten',"go('leren')")}
   <div class="kaart" style="margin-bottom:14px"><p style="margin:0">Je ziet een begrip. Bedenk de betekenis, draai de kaart om en zeg eerlijk of je hem wist. Kaarten die je weet komen later terug (na 1, 3, 7, 14, 30 en 60 dagen), kaarten die je niet weet komen meteen nog een keer.</p>
   <label class="label" style="margin-top:10px"><input type="checkbox" ${fkOm?'checked':''} onchange="fkOm=this.checked"> Andersom oefenen: je ziet de betekenis en noemt het begrip</label></div>
   ${typeof modusKeuze==='function'?modusKeuze():''}
   ${typeof kernStand==='function'?(()=>{const [v,t]=kernStand(); return t?`<div class="kaart" style="margin-bottom:14px"><b>🎯 Kernbegrippen: ${v} van ${t} zitten vast</b><div class="balk" style="margin-top:8px"><i style="width:${Math.round(v/t*100)}%"></i></div><small class="zacht">Kernbegrippen zijn de examenstof. Een kaart zit vast als je hem vier keer achter elkaar wist.</small></div>`:''})():''}
   <div class="kaart">${rij('',typeof oefenModus==='function'&&oefenModus()==='examen'?'Alle kernbegrippen door elkaar':'Alle begrippen door elkaar','🃏')}${WERELDEN.map(w=>rij(w.id,'H'+w.nr+' · '+w.naam,w.icoon)).join('')}</div>
   </div>${VOET()}`;
};
SCHERMEN.flitsen = function(){
  if(!FK) return SCHERMEN.flits();
  const x=FK.lijst[FK.i]; const voor=fkOm?x.def:x.k, achter=fkOm?x.k:x.def; const W=WERELDEN.find(w=>w.id===x.w)||{};
  return `<div class="wrap" style="max-width:640px"><div class="top" style="display:flex;align-items:center;gap:10px;margin:8px 0 14px"><button class="terug" onclick="fkKlaar()">‹ Stop</button><b style="flex:1">Flitskaarten</b><span class="chip">${FK.i+1} / ${FK.lijst.length}</span></div>
   <button class="flitskaart ${FK.om?'om':''}" style="--k:${W.kleur||'var(--acc)'}" onclick="fkDraai()"><small>${esc(W.icoon||'')} H${esc(String(W.nr||''))} · ${fkOm?'Welk begrip is dit?':'Wat betekent dit begrip?'}</small>
    <span class="voor">${esc(voor)}</span>${FK.om?`<span class="achter">${esc(achter)}</span>`:'<span class="zacht" style="font-size:14px">Tik om de kaart om te draaien</span>'}</button>
   ${FK.om?`<div class="fkknoppen"><button class="knop zacht" onclick="fkAntw(0)">✘ Wist ik niet</button><button class="knop zacht" onclick="fkAntw(1)">≈ Twijfel</button><button class="knop" onclick="fkAntw(2)">✔ Wist ik</button></div>`:''}</div>`;
};
function fkDraai(){ if(!FK||FK.om) return; FK.om=true; go('flitsen') }
function fkAntw(s){
  const x=FK.lijst[FK.i], fk=fkStaat(), r=fk[x.k]||[0,0], nu=Date.now();
  if(s===2){ const b=Math.min(r[0]+1,6); fk[x.k]=[b,nu+FK_INT[b]*DAG]; FK.ok++; S.xp+=2; if(!S.kaarten.includes(x.k)) S.kaarten.push(x.k) }
  else if(s===1){ fk[x.k]=[Math.max(1,r[0]),nu+DAG]; FK.bijna++ }
  else { fk[x.k]=[0,nu]; FK.nee++; x.n=(x.n||0)+1; if(x.n<3) FK.lijst.push(x) }
  FK.i++; FK.om=false; bewaar(false);
  if(FK.i>=FK.lijst.length) fkKlaar(); else go('flitsen');
}
function fkKlaar(){ if(!FK) return go('flits'); const f=FK; FK=null; bewaar(); checkBadges();
  if(!f.ok&&!f.bijna&&!f.nee) return go('flits');
  go('flits'); melding(`Klaar: ${f.ok} gekend, ${f.bijna} twijfel, ${f.nee} nog niet. Morgen weer even herhalen!`,4500) }


// ---------- 2. Formulekaart en rekenhulp ----------
const _g = s => parseGetal(s);
const FORMULES = [
 {d:'rek',n:'Procent van een bedrag',f:'deel = percentage / 100 × geheel',u:'Eerst 1% uitrekenen (delen door 100) en dan keer het percentage.',
  vb:'21% btw over € 80:\n80 / 100 × 21 = € 16,80',in:[['p','Percentage'],['g','Geheel (€)']],r:x=>`${nl1(x.p)} / 100 × ${eur(x.g)} = <b>${eur(x.p/100*x.g)}</b>`,g:['pctVan']},
 {d:'rek',n:'Welk percentage is het?',f:'deel / geheel × 100%',u:'Deel door het geheel, niet andersom.',
  vb:'€ 30 korting op € 240:\n30 / 240 × 100% = 12,5%',in:[['d','Deel'],['g','Geheel']],r:x=>`${nl1(x.d)} / ${nl1(x.g)} × 100% = <b>${nl1(x.d/x.g*100)}%</b>`,g:['deelVan','marktaandeel']},
 {d:'rek',n:'Procentuele verandering',f:'(nieuw − oud) / oud × 100%',u:'Altijd delen door het OUDE getal. Een daling geeft een negatief getal.',
  vb:'Een kaartje gaat van € 8,00 naar € 7,60.\n(7,60 − 8,00) / 8,00 × 100% = −5,0%',in:[['oud','Oud'],['nw','Nieuw']],r:x=>`(${nl1(x.nw)} − ${nl1(x.oud)}) / ${nl1(x.oud)} × 100% = <b>${nl1((x.nw-x.oud)/x.oud*100)}%</b>`,g:['procVerandering','bbpGroei']},
 {d:'rek',n:'Procentpunt',f:'nieuw percentage − oud percentage',u:'Werkloosheid van 4% naar 3% is 1 procentpunt lager, maar in procenten is dat −25%.',
  vb:'Van 4% naar 3%:\nverschil = −1 procentpunt\nprocentuele verandering = (3 − 4) / 4 × 100% = −25%',in:[['oud','Oud percentage'],['nw','Nieuw percentage']],r:x=>`Verschil <b>${nl1(x.nw-x.oud)} procentpunt</b> · procentuele verandering <b>${nl1((x.nw-x.oud)/x.oud*100)}%</b>`,g:['procentpunt']},
 {d:'rek',n:'Indexcijfer',f:'waarde nu / waarde basisjaar × 100',u:'Het basisjaar is 100. Een indexcijfer heeft geen %-teken. Van index 110 naar 121 is +10%, niet +11%.',
  vb:'Basisjaar € 50, nu € 45.\n45 / 50 × 100 = 90',in:[['b','Waarde basisjaar'],['nu','Waarde nu']],r:x=>`${nl1(x.nu)} / ${nl1(x.b)} × 100 = <b>${nl1(x.nu/x.b*100)}</b>`,g:['index']},
 {d:'rek',n:'Week, maand en jaar',f:'per week × 52 = per jaar · per jaar / 12 = per maand',u:'Reken altijd via het jaar. Een maand is niet 4 weken!',
  vb:'€ 30 per week:\n30 × 52 = € 1.560 per jaar\n1.560 / 12 = € 130 per maand',in:[['w','Bedrag per week']],r:x=>`${eur(x.w)} × 52 = ${eur(x.w*52)} per jaar · / 12 = <b>${eur(x.w*52/12)}</b> per maand`,g:['weekMaand','maandWeek']},
 {d:'con',n:'Koopkracht',f:'koopkrachtverandering ≈ % loonstijging − % inflatie',u:'Stijgen de prijzen harder dan je inkomen, dan daalt je koopkracht.',
  vb:'Loon +2%, inflatie +3,5%:\n2 − 3,5 = −1,5%',in:[['l','Loonstijging (%)'],['i','Inflatie (%)']],r:x=>`${nl1(x.l)} − ${nl1(x.i)} = <b>${nl1(x.l-x.i)}%</b>`,g:['koopkracht']},
 {d:'con',n:'Rente',f:'enkelvoudig: bedrag × rente% × jaren · samengesteld: bedrag × (1 + r)ⁿ',u:'Bij samengestelde rente krijg je ook rente over de rente.',
  vb:'€ 1.000, 3%, 2 jaar samengesteld:\n1.000 × 1,03 × 1,03 = € 1.060,90',in:[['k','Bedrag'],['r','Rente (%)'],['n','Jaren']],r:x=>`enkelvoudig: <b>${eur(x.k*x.r/100*x.n)}</b> rente · samengesteld: eindbedrag <b>${eur(x.k*Math.pow(1+x.r/100,x.n))}</b>`,g:['enkelRente','samenRente']},
 {d:'con',n:'Kosten van een lening',f:'totaal terugbetaald − geleend bedrag',u:'Tel alle termijnen bij elkaar op en trek het geleende bedrag eraf.',
  vb:'Lenen € 2.000, 24 termijnen van € 95:\n24 × 95 = € 2.280\n2.280 − 2.000 = € 280',in:[['k','Geleend'],['n','Aantal termijnen'],['t','Bedrag per termijn']],r:x=>`${gt(x.n)} × ${eur(x.t)} − ${eur(x.k)} = <b>${eur(x.n*x.t-x.k)}</b>`,g:['kredietkosten']},
 {d:'int',n:'Wisselkoers',f:'bedrag in euro = bedrag in vreemde valuta / koers (als € 1 = koers)',u:'Staat er "€ 1 = $ 1,10", dan deel je dollars door 1,10 voor euro\'s en doe je euro\'s keer 1,10 voor dollars. Staat er "1 dollar = € 0,92", dan doe je dollars keer 0,92.',
  vb:'€ 1 = $ 1,10, product kost $ 45:\n45 / 1,10 = € 40,91',in:[['b','Bedrag in vreemde valuta'],['k','Koers (€ 1 = …)']],r:x=>`${nl1(x.b)} / ${String(x.k).replace('.',',')} = <b>${eur(x.b/x.k)}</b>`,g:['dollarEuro','euroDollar']},
 {d:'arb',n:'Omzet, kosten en winst',f:'omzet = prijs × afzet · winst = omzet − totale kosten',u:'Totale kosten = vaste kosten + variabele kosten per stuk × afzet.',
  vb:'Prijs € 15, afzet 4.000, variabel € 5 per stuk, vaste kosten € 25.000.\nOmzet 60.000 · kosten 25.000 + 20.000 = 45.000 · winst € 15.000',in:[['p','Prijs'],['q','Afzet'],['v','Variabele kosten per stuk'],['c','Vaste kosten']],r:x=>{const o=x.p*x.q,k=x.c+x.v*x.q; return `omzet ${eur(o)} · kosten ${eur(k)} · winst <b>${eur(o-k)}</b>`},g:['omzet','winstTotaal','brutoNetto']},
 {d:'arb',n:'Kostprijs',f:'(vaste kosten + variabele kosten) / aantal producten',u:'De kostprijs is wat één product gemiddeld kost.',
  vb:'Vaste kosten € 10.000, variabel € 8.000, 2.000 stuks:\n18.000 / 2.000 = € 9',in:[['c','Vaste kosten'],['v','Variabele kosten (totaal)'],['q','Aantal']],r:x=>`(${eur(x.c)} + ${eur(x.v)}) / ${gt(x.q)} = <b>${eur((x.c+x.v)/x.q)}</b>`,g:['kostprijs']},
 {d:'arb',n:'Break-evenafzet',f:'vaste kosten / (prijs − variabele kosten per stuk)',u:'Bij deze afzet is de winst precies nul. Rond naar boven af: je verkoopt geen halve producten.',
  vb:'Vaste kosten € 30.000, prijs € 20, variabel € 5:\n30.000 / (20 − 5) = 2.000 stuks',in:[['c','Vaste kosten'],['p','Prijs'],['v','Variabele kosten per stuk']],r:x=>`${eur(x.c)} / (${nl1(x.p)} − ${nl1(x.v)}) = <b>${nl1(x.c/(x.p-x.v))}</b> stuks`,g:['breakEven']},
 {d:'arb',n:'Btw',f:'prijs incl. btw = prijs excl. × 1,21 (of 1,09) · excl. = incl. / 1,21',u:'Btw reken je over de prijs zonder btw. Terugrekenen doe je door te delen, niet door 21% eraf te halen.',
  vb:'€ 60,50 inclusief 21% btw:\n60,50 / 1,21 = € 50 exclusief, btw = € 10,50',in:[['i','Prijs inclusief btw'],['t','Btw-tarief (21 of 9)']],r:x=>`${eur(x.i)} / ${nl1(1+x.t/100)} = <b>${eur(x.i/(1+x.t/100))}</b> exclusief · btw <b>${eur(x.i-x.i/(1+x.t/100))}</b>`,g:['exclBtw','inclBtw']},
 {d:'arb',n:'Arbeidsproductiviteit',f:'productie / aantal werknemers (of uren)',u:'Stijgt de productie sneller dan het aantal werknemers, dan stijgt de arbeidsproductiviteit.',
  vb:'12.000 fietsen, 40 werknemers:\n12.000 / 40 = 300 per werknemer',in:[['p','Productie'],['a','Werknemers']],r:x=>`${gt(x.p)} / ${gt(x.a)} = <b>${nl1(x.p/x.a)}</b>`,g:['productiviteit']},
 {d:'arb',n:'Werkloosheidspercentage',f:'werklozen / beroepsbevolking × 100%',u:'Beroepsbevolking = werkenden + werklozen.',
  vb:'2.000 werklozen, 38.000 werkenden:\n2.000 / 40.000 × 100% = 5%',in:[['w','Werklozen'],['k','Werkenden']],r:x=>`${gt(x.w)} / ${gt(x.w+x.k)} × 100% = <b>${nl1(x.w/(x.w+x.k)*100)}%</b>`,g:['werkloosheidPct']},
 {d:'ovh',n:'Begrotingssaldo en staatsschuld',f:'saldo = inkomsten − uitgaven · in % bbp: saldo / bbp × 100%',u:'De EU-normen: tekort maximaal 3% van het bbp, staatsschuld maximaal 60% van het bbp.',
  vb:'Tekort € 25 miljard, bbp € 1.000 miljard:\n−25 / 1.000 × 100% = −2,5% (binnen de 3%-norm)',in:[['s','Saldo (− is tekort)'],['b','Bbp']],r:x=>`${nl1(x.s)} / ${nl1(x.b)} × 100% = <b>${nl1(x.s/x.b*100)}%</b>`,g:['begrotingSaldo','schuldPct']},
 {d:'ovh',n:'Gemiddelde belastingdruk',f:'te betalen belasting / inkomen × 100%',u:'Bij een progressief tarief stijgt de gemiddelde belastingdruk als je inkomen stijgt.',
  vb:'€ 9.000 belasting op € 40.000 inkomen:\n9.000 / 40.000 × 100% = 22,5%',in:[['b','Belasting'],['i','Inkomen']],r:x=>`${eur(x.b)} / ${eur(x.i)} × 100% = <b>${nl1(x.b/x.i*100)}%</b>`,g:['belastingdruk','verschuldigd']},
 {d:'ovh',n:'Lorenzcurve',f:'aandeel van een groep = inkomen groep / totaal × 100% · cumulatief optellen',u:'Op de Lorenzcurve tel je de aandelen op: de armste 20%, dan de armste 40%, enzovoort. Hoe verder de curve van de diagonaal, hoe groter de inkomensverschillen.',
  vb:'Groepen € 19.000, € 25.000, € 32.000, € 39.000, € 55.000 (totaal € 170.000):\narmste 40% = (19.000 + 25.000) / 170.000 × 100% = 25,9%',in:[['d','Inkomen van de groepen samen'],['t','Totaal inkomen']],r:x=>`${eur(x.d)} / ${eur(x.t)} × 100% = <b>${nl1(x.d/x.t*100)}%</b>`,g:['lorenzAandeel','grafLorenz']},
];
// Rekenregels uit het correctievoorschrift: hier verliezen mavo-leerlingen de meeste punten
const REKENREGELS=['Procentuele verandering: deel altijd door het OUDE getal.','Geld: rond af op 2 decimalen (€ 64,31), tenzij de vraag iets anders zegt.','Aantallen (producten, mensen) die je minimaal nodig hebt: rond naar boven af.','Vergelijk altijd bedragen over dezelfde periode: reken week, maand of jaar eerst om.','Schrijf je berekening op, met de stappen. Een goed antwoord zonder berekening levert vaak geen punten op.','Vraagt de opgave om een conclusie ("in welk land is het goedkoper?"), schrijf die dan op. Die conclusie is vaak een punt waard.','Let op procent en procentpunt: van 4% naar 3% is −1 procentpunt, maar −25%.'];
let fDom='';
SCHERMEN.formules = function(){
  const doms=DOMEINEN.filter(d=>FORMULES.some(f=>f.d===d.id));
  const chips=[['','Alle']].concat(doms.map(d=>[d.id,d.icoon+' '+d.naam])).map(([k,t])=>`<button class="knop ${fDom===k?'':'zacht'} klein" onclick="fDom='${k}';go('formules')">${esc(t)}</button>`).join('');
  const kaarten=FORMULES.map((f,i)=>[f,i]).filter(([f])=>!fDom||f.d===fDom).map(([f,i])=>`<div class="kaart formule">
    <span class="eyebrow" style="color:var(--zacht)">${esc((DOMEINEN.find(d=>d.id===f.d)||{}).naam||'')}</span><h3 style="margin:2px 0 8px">${esc(f.n)}</h3>
    <div class="fbox">${esc(f.f)}</div><p style="margin:8px 0">${esc(f.u)}</p>
    <details><summary>Uitgewerkt voorbeeld</summary><div class="vb">${esc(f.vb)}</div></details>
    <details><summary>Rekenhulp</summary><div class="rh">${f.in.map(([k,l])=>`<label>${esc(l)}<input type="text" inputmode="decimal" data-k="${k}" oninput="rekenhulp(${i},this)"></label>`).join('')}</div><p class="rhUit zacht" id="rh${i}">Vul alle velden in.</p></details>
    ${f.g.length?`<button class="knop zacht klein" style="margin-top:8px" onclick="startFormule(${i})">Oefen met ${f.g.some(g=>g.startsWith('graf'))?'sommen en grafieken':'6 sommen'}</button>`:''}</div>`).join('');
  return `<div class="wrap">${kop('Formulekaart',"go('leren')")}
   <div class="kaart" style="margin-bottom:12px"><p style="margin:0 0 10px">Alle formules die je voor het examen moet kennen, met een uitgewerkt voorbeeld. Met de rekenhulp controleer je je eigen berekening. Oefen daarna met sommen die steeds andere getallen hebben.</p>
   <div class="voet" style="justify-content:flex-start;flex-wrap:wrap;margin:0">${chips}</div><div class="voet" style="justify-content:flex-start;margin:10px 0 0"><button class="knop" onclick="startFormule(-1)">Oefen 10 sommen door elkaar${fDom?' (dit domein)':''}</button></div></div>
   <div class="kaart" style="margin-bottom:12px;border-left:5px solid var(--acc)"><b>✅ Zo haal je alle rekenpunten</b><ul style="margin:8px 0 0;padding-left:20px">${REKENREGELS.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>
   <div class="formules">${kaarten}</div></div>${VOET()}`;
};
function rekenhulp(i,el){ const f=FORMULES[i]; const box=el.closest('.rh'); const x={}; let ok=true;
  box.querySelectorAll('input').forEach(inp=>{ const g=_g(inp.value); if(isNaN(g)) ok=false; x[inp.dataset.k]=g });
  const uit=$('#rh'+i); if(!ok){ uit.innerHTML='Vul alle velden in.'; return }
  let t; try{ t=f.r(x) }catch(e){ t='' } uit.innerHTML=/NaN|Infinity/.test(t)||!t?'Deze getallen kunnen niet (delen door nul?)':t; uit.classList.remove('zacht') }
function startFormule(i){
  const lijst=(i>=0?FORMULES[i].g:FORMULES.filter(f=>!fDom||f.d===fDom).flatMap(f=>f.g)).filter(g=>GENS[g]);
  const n=i>=0?6:10; const v=[]; for(let k=0;k<n;k++) v.push(maakGen(lijst[k%lijst.length]));
  Q={modus:'formule',titel:i>=0?FORMULES[i].n:'Formules oefenen',vragen:shuffle(v),i:0,res:[],terug:"go('formules')"}; go('quiz') }

// nieuwe rekengeneratoren (examenstof die nog ontbrak)
Object.assign(GENS,{
  procentpunt(){ const o=pick([4,5,6,8,10,12]), n=o+pick([-2,-1,1,2,3]); return {t:'reken',e:'K3.v',q:`Het werkloosheidspercentage gaat van ${o}% naar ${n}%. Met hoeveel procent is het werkloosheidspercentage veranderd? (1 decimaal, een daling is negatief)`,a:Math.round((n-o)/o*1000)/10,eh:'%',u:`Het verschil is ${n-o} procentpunt. In procenten: (${n} − ${o}) / ${o} × 100% = ${nl1((n-o)/o*100)}%.`} },
  dollarEuro(){ const k=pick([1.05,1.08,1.1,1.12,1.2,1.25]), d=pick([45,80,120,250,640,1200]); return {t:'reken',e:'7.1',q:`De wisselkoers is € 1 = $ ${String(k).replace('.',',')}. Een product kost in de VS $ ${gt(d)}. Hoeveel is dat in euro?`,a:Math.round(d/k*100)/100,eh:'€',u:`Van dollars naar euro's deel je door de koers: ${gt(d)} / ${String(k).replace('.',',')} = ${eur(d/k)}.`} },
  euroDollar(){ const k=pick([1.05,1.08,1.1,1.12,1.2]), e=pick([20,50,75,150,400]); const a=Math.round(e*k*100)/100; return {t:'reken',e:'7.1',q:`De wisselkoers is € 1 = $ ${String(k).replace('.',',')}. Hoeveel dollar krijg je voor € ${e}? (2 decimalen)`,a,eh:'',u:`Van euro's naar dollars vermenigvuldig je met de koers: ${e} × ${String(k).replace('.',',')} = $ ${a.toFixed(2).replace('.',',')}.`} },
  breakEven(){ const c=pick([12000,20000,30000,45000,60000]), p=pick([12,15,20,25,40]), v=Math.round(p*pick([.3,.4,.5,.6])); const q=Math.ceil(c/(p-v)); return {t:'reken',e:'5A.1',q:`Een bedrijf heeft ${eur(c)} vaste kosten. Het verkoopt een product voor ${eur(p)} en de variabele kosten zijn ${eur(v)} per stuk. Hoeveel stuks moet het minimaal verkopen om geen verlies te maken?`,a:q,eh:'',u:`Per stuk blijft ${eur(p)} − ${eur(v)} = ${eur(p-v)} over. ${eur(c)} / ${eur(p-v)} = ${nl1(c/(p-v))}, naar boven afronden: ${q} stuks.`} },
  winstTotaal(){ const p=pick([8,12,15,20]), q=pick([2000,3000,4000,5000]), v=Math.round(p*pick([.3,.4,.5])), c=pick([8000,10000,15000,20000]); const w=p*q-c-v*q; return {t:'reken',e:'5A.1',q:`Een bedrijf verkoopt ${gt(q)} producten voor ${eur(p)}. De vaste kosten zijn ${eur(c)} en de variabele kosten ${eur(v)} per stuk. Hoeveel is de winst? (verlies is negatief)`,a:w,eh:'€',u:`Omzet = ${gt(q)} × ${eur(p)} = ${eur(p*q)}. Kosten = ${eur(c)} + ${gt(q)} × ${eur(v)} = ${eur(c+v*q)}. Winst = ${eur(w)}.`} },
  belastingdruk(){ const i=pick([25000,32000,40000,48000,60000]), b=Math.round(i*pick([.12,.15,.18,.22,.25,.3])); return {t:'reken',e:'V1.2',q:`Iemand verdient ${eur(i)} en betaalt ${eur(b)} inkomstenbelasting. Hoeveel procent is de gemiddelde belastingdruk? (1 decimaal)`,a:Math.round(b/i*1000)/10,eh:'%',u:`Gemiddelde belastingdruk = ${eur(b)} / ${eur(i)} × 100% = ${nl1(b/i*100)}%.`} },
  lorenzAandeel(){ const g=[pick([15,18,19,20]),pick([24,25,27]),pick([31,32,34]),pick([38,39,42]),pick([52,55,60])].map(x=>x*1000); const t=g.reduce((a,b)=>a+b,0); const k=pick([2,3,4]); const s=g.slice(0,k).reduce((a,b)=>a+b,0);
    return {t:'reken',e:'V1.3',q:`Een land heeft vijf even grote inkomensgroepen. Het gemiddelde inkomen per groep is ${g.map(eur).join(', ')} (samen ${eur(t)}). Welk percentage van het totale inkomen hebben de armste ${k*20}% van de mensen samen? Dit is een punt op de Lorenzcurve. (1 decimaal)`,a:Math.round(s/t*1000)/10,eh:'%',u:`Tel de armste ${k} groepen op: ${eur(s)}. ${eur(s)} / ${eur(t)} × 100% = ${nl1(s/t*100)}%.`} },
});

// ---------- 3. Grafiekvragen: klik op een punt, lijn of gebied ----------
const GR={x0:46,y0:250,w:300,h:226};
function grafMarkt(){
  const Qe=pick([40,50,60]), Pe=pick([6,8,10]), k1=pick([4,6,8]), k2=pick([2,3,4]);
  const m={Qe,Pe,pv:Pe+k1,bv:k1/Qe,pa:Pe-k2,ba:k2/Qe}; m.Qmax=Math.ceil(m.pv/m.bv/10)*10; m.Pmax=m.pv+2; return m }
function grafSvg(m,extra,opts){ opts=opts||{};
  const sx=q=>GR.x0+q/m.Qmax*GR.w, sy=p=>GR.y0-p/m.Pmax*GR.h;
  const lijn=(f,kl,lab,stip)=>{ const pts=[]; for(let q=0;q<=m.Qmax;q+=m.Qmax/60){ const p=f(q); if(p>=0&&p<=m.Pmax) pts.push(sx(q).toFixed(1)+','+sy(p).toFixed(1)) }
    const l=pts[pts.length-1].split(','); return `<polyline points="${pts.join(' ')}" fill="none" stroke="${kl}" stroke-width="3" ${stip?'stroke-dasharray="7 5"':''}/>${lab&&!opts.zonderLabel?`<text x="${+l[0]+4}" y="${+l[1]-4}" font-size="13" font-weight="700" fill="${kl}">${lab}</text>`:''}` };
  let raster=''; for(let p=2;p<=m.Pmax;p+=2) raster+=`<line x1="${GR.x0}" x2="${GR.x0+GR.w}" y1="${sy(p)}" y2="${sy(p)}" class="rast"/><text x="${GR.x0-6}" y="${sy(p)+4}" text-anchor="end" font-size="11" class="as">${p}</text>`;
  const stap=m.Qmax>100?20:10; for(let q=stap;q<=m.Qmax;q+=stap) raster+=`<line y1="${GR.y0}" y2="${GR.y0-GR.h}" x1="${sx(q)}" x2="${sx(q)}" class="rast"/><text x="${sx(q)}" y="${GR.y0+15}" text-anchor="middle" font-size="11" class="as">${q}</text>`;
  const lijnen=(m.vraag!==false?lijn(q=>m.pv-m.bv*q,'#2f7de0','V'):'')+(m.aanbod!==false?lijn(q=>m.pa+m.ba*q,'#e07a2f','A'):'')+(m.t?lijn(q=>m.pa+m.t+m.ba*q,'#e07a2f','A + accijns',true):'');
  return `<svg id="graf" viewBox="0 0 360 280" onclick="grafKlik(event)" role="img" aria-label="Marktdiagram">${raster}
   <line x1="${GR.x0}" y1="${GR.y0}" x2="${GR.x0+GR.w+6}" y2="${GR.y0}" class="ax"/><line x1="${GR.x0}" y1="${GR.y0}" x2="${GR.x0}" y2="${GR.y0-GR.h-8}" class="ax"/>
   <text x="${GR.x0+4}" y="${GR.y0-GR.h-10}" font-size="12" class="as">P (€)</text><text x="${GR.x0+GR.w}" y="${GR.y0+28}" font-size="12" text-anchor="end" class="as">Q (× 1.000)</text>
   ${lijnen}${extra||''}<g id="grafOpl"></g><g id="grafMark"></g></svg>`;
}
const grafPt=(m,q,p)=>[GR.x0+q/m.Qmax*GR.w, GR.y0-p/m.Pmax*GR.h];
function inDriehoek(p,a,b,c){ const s=(p1,p2,p3)=>(p1[0]-p3[0])*(p2[1]-p3[1])-(p2[0]-p3[0])*(p1[1]-p3[1]); const d1=s(p,a,b),d2=s(p,b,c),d3=s(p,c,a); return !((d1<0||d2<0||d3<0)&&(d1>0||d2>0||d3>0)) }
const dichtbij=(p,q,r)=>Math.hypot(p[0]-q[0],p[1]-q[1])<=(r||16);
const oplPunt=(xy)=>`<circle cx="${xy[0]}" cy="${xy[1]}" r="9" fill="none" stroke="var(--goed)" stroke-width="3"/>`;
const oplVlak=(pts)=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="color-mix(in srgb,var(--goed) 35%,transparent)" stroke="var(--goed)" stroke-width="2"/>`;
Object.assign(GENS,{
  grafEvenwicht(){ const m=grafMarkt(); const e=grafPt(m,m.Qe,m.Pe);
    return {t:'klik',e:'5A.1',q:'Hieronder zie je de vraaglijn (V) en de aanbodlijn (A) op een markt. Klik op het marktevenwicht.',svg:grafSvg(m),raak:p=>dichtbij(p,e),opl:oplPunt(e),
      juist:`het snijpunt van V en A (P = € ${m.Pe}, Q = ${m.Qe}.000)`,u:'Het evenwicht ligt waar de gevraagde en de aangeboden hoeveelheid gelijk zijn: het snijpunt van de vraaglijn en de aanbodlijn. Daar hoort de evenwichtsprijs bij.'} },
  grafLijn(){ const m=grafMarkt(); const aanbod=Math.random()<.5; const f=aanbod?(q=>m.pa+m.ba*q):(q=>m.pv-m.bv*q);
    const raak=p=>{ for(let q=0;q<=m.Qmax;q+=m.Qmax/200){ const P=f(q); if(P>=0&&P<=m.Pmax&&dichtbij(p,grafPt(m,q,P),12)) return true } return false };
    const opl=`<polyline points="${Array.from({length:61},(_,i)=>i*m.Qmax/60).filter(q=>f(q)>=0&&f(q)<=m.Pmax).map(q=>grafPt(m,q,f(q)).join(',')).join(' ')}" fill="none" stroke="var(--goed)" stroke-width="7" opacity=".5"/>`;
    return {t:'klik',e:'5A.1',q:`De namen staan er niet bij. Klik op de ${aanbod?'aanbodlijn':'vraaglijn'}.`,svg:grafSvg(m,'',{zonderLabel:true}),raak,opl,
      juist:aanbod?'de stijgende lijn':'de dalende lijn',u:aanbod?'De aanbodlijn stijgt: bij een hogere prijs willen producenten meer verkopen.':'De vraaglijn daalt: bij een hogere prijs willen consumenten minder kopen.'} },
  grafVerschuiving(){ const m=grafMarkt(); const meer=Math.random()<.5; const d=pick([2,3]); const pv2=m.pv+(meer?d:-d);
    const q=(pv2-m.pa)/(m.bv+m.ba), p=m.pa+m.ba*q; const xy=grafPt(m,q,p);
    const pts=[]; for(let qq=0;qq<=m.Qmax;qq+=m.Qmax/60){ const P=pv2-m.bv*qq; if(P>=0&&P<=m.Pmax) pts.push(grafPt(m,qq,P).map(x=>x.toFixed(1)).join(',')) }
    const l=pts[pts.length-1].split(',');
    const extra=`<polyline points="${pts.join(' ')}" fill="none" stroke="#2f7de0" stroke-width="3" stroke-dasharray="7 5"/><text x="${+l[0]+4}" y="${+l[1]-4}" font-size="13" font-weight="700" fill="#2f7de0">V2</text>`;
    const oorzaak=meer?pick(['Het product wordt populairder door een reclamecampagne.','De inkomens van de consumenten stijgen.','Het wordt warm weer en iedereen wil dit product.']):pick(['Het product raakt uit de mode.','De inkomens van de consumenten dalen.','Een vervangend product wordt veel goedkoper.']);
    return {t:'klik',e:'5A.1',q:`${oorzaak} De vraaglijn verschuift daardoor naar ${meer?'rechts':'links'} (stippellijn V2). Klik op het nieuwe marktevenwicht.`,svg:grafSvg(m,extra),raak:p2=>dichtbij(p2,xy),opl:oplPunt(xy),
      juist:`het snijpunt van V2 met de aanbodlijn (P ≈ € ${nl1(p)})`,u:meer?'Als de vraag toeneemt, verschuift de vraaglijn naar rechts. De evenwichtsprijs en de verhandelde hoeveelheid stijgen allebei.':'Als de vraag afneemt, verschuift de vraaglijn naar links. De evenwichtsprijs en de verhandelde hoeveelheid dalen allebei.'} },
  grafPrijsbeleid(){ const m=grafMarkt(); const max=Math.random()<.5; const Pm=max?Math.max(m.pa+1,m.Pe-pick([1,2])):m.Pe+pick([1,2]);
    const qa=(Pm-m.pa)/m.ba, qv=(m.pv-Pm)/m.bv, q=max?qa:qv; const xy=grafPt(m,q,Pm);
    const st=`<line x1="${GR.x0}" x2="${GR.x0+GR.w}" y1="${xy[1]}" y2="${xy[1]}" stroke="#d64f7a" stroke-width="2" stroke-dasharray="6 5"/><text x="${GR.x0+GR.w}" y="${xy[1]-5}" text-anchor="end" font-size="12" fill="#d64f7a" font-weight="700">${max?'maximumprijs':'minimumprijs'}</text>`;
    return {t:'klik',e:'5A.1',q:`De overheid stelt een ${max?'maximumprijs':'minimumprijs'} in (de stippellijn). Klik op het punt dat aangeeft hoeveel er dan op de markt wordt verhandeld.`,svg:grafSvg(m,st),raak:p=>dichtbij(p,xy),opl:oplPunt(xy),
      juist:`het snijpunt van de stippellijn met de ${max?'aanbodlijn':'vraaglijn'}`,u:max?'Bij een maximumprijs onder het evenwicht willen producenten minder verkopen: de aanbodlijn bepaalt hoeveel er verhandeld wordt. Er ontstaat een tekort.':'Bij een minimumprijs boven het evenwicht willen consumenten minder kopen: de vraaglijn bepaalt hoeveel er verhandeld wordt. Er ontstaat een overschot.'} },
  grafLorenz(){ // Lorenzcurve: klik op het punt dat bij een gegeven percentage hoort
    const g=[pick([5,6,8]),pick([10,12,13]),pick([16,17,18]),pick([22,23,24])]; const cum=[0]; g.forEach((x,i)=>cum.push(cum[i]+x)); cum.push(100);
    const X0=56,Y0=250,W=250,H=220; const sx=p=>X0+p/100*W, sy=p=>Y0-p/100*H; const k=pick([1,2,3,4]);
    let r=''; for(let p=20;p<=100;p+=20) r+=`<line x1="${X0}" x2="${X0+W}" y1="${sy(p)}" y2="${sy(p)}" class="rast"/><text x="${X0-6}" y="${sy(p)+4}" text-anchor="end" font-size="11" class="as">${p}</text><line y1="${Y0}" y2="${Y0-H}" x1="${sx(p)}" x2="${sx(p)}" class="rast"/><text x="${sx(p)}" y="${Y0+15}" text-anchor="middle" font-size="11" class="as">${p}</text>`;
    const pts=cum.map((c,i)=>`${sx(i*20)},${sy(c)}`).join(' ');
    const svg=`<svg id="graf" viewBox="0 0 360 290" onclick="grafKlik(event)" role="img" aria-label="Lorenzcurve">${r}<line x1="${X0}" y1="${Y0}" x2="${X0+W}" y2="${Y0}" class="ax"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0-H}" class="ax"/>
      <line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(100)}" y2="${sy(100)}" stroke="#999" stroke-width="2" stroke-dasharray="5 4"/><polyline points="${pts}" fill="none" stroke="#7a4fd6" stroke-width="3"/>
      <text x="${X0+4}" y="${Y0-H-6}" font-size="11" class="as">% van het inkomen</text><text x="${X0+W}" y="${Y0+30}" font-size="11" text-anchor="end" class="as">% van de huishoudens (opgeteld)</text><g id="grafOpl"></g><g id="grafMark"></g></svg>`;
    const xy=[sx(k*20),sy(cum[k])];
    return {t:'klik',e:'V1.3',q:`Hieronder staat de Lorenzcurve van een land. De armste ${k*20}% van de huishoudens krijgt samen ${cum[k]}% van het totale inkomen. Klik op het punt van de Lorenzcurve dat dit laat zien.`,svg,raak:p=>dichtbij(p,xy,16),opl:oplPunt(xy),
      juist:`het punt bij ${k*20}% huishoudens en ${cum[k]}% inkomen`,u:'Op de horizontale as staan de huishoudens van arm naar rijk (opgeteld), op de verticale as hun deel van het inkomen (opgeteld). De stippellijn is de lijn van volledige gelijkheid. Hoe verder de curve daaronder ligt, hoe groter de inkomensverschillen.'} },
});
const GRAF_GENS=['grafEvenwicht','grafLijn','grafVerschuiving','grafPrijsbeleid','grafLorenz'];
function grafKlik(ev){ if(!Q||Q.fase!=='vraag') return; const v=Q.vragen[Q.i]; if(v.t!=='klik') return;
  const svg=$('#graf'); const pt=svg.createSVGPoint(); pt.x=ev.clientX; pt.y=ev.clientY; const p=pt.matrixTransform(svg.getScreenCTM().inverse());
  antw=[p.x,p.y]; $('#grafMark').innerHTML=`<circle cx="${p.x}" cy="${p.y}" r="7" fill="var(--knop)" stroke="#fff" stroke-width="2"/>`; $('#ok').disabled=false }
function startGrafiek(){ const v=shuffle(GRAF_GENS.concat(pick([GRAF_GENS]))).slice(0,8).map(maakGen); Q={modus:'formule',titel:'Grafiektraining',vragen:v,i:0,res:[],terug:"go('leren')"}; go('quiz') }
const _nakijkenG=nakijken; nakijken=function(v,a){ if(v.t==='klik') return !!a&&v.raak(a); return _nakijkenG(v,a) };
const _juistG=juistTekst; juistTekst=function(v){ return v.t==='klik'?v.juist:_juistG(v) };


// ---------- 4. Proeftoets per hoofdstuk ----------
// Zoals een toets in de klas: 15 vragen, ongeveer 75 seconden per vraag, pas aan het eind zie je wat goed was. GEEN cijfer:
// alleen het aantal goed en per onderwerp wat je nog moet oefenen. Foute vragen gaan naar de herhaalronde.
const PROEF_N=15;
function proefGroepen(){ return WERELDEN.filter(w=>LEVELS[w.id]).map(w=>({key:w.id,w:w.id,hfd:'H'+w.nr+' · '+w.naam,lvs:LEVELS[w.id],n:LEVELS[w.id].reduce((a,l)=>a+l.vragen.filter(autoNakijk).length,0)})).filter(g=>g.n>=8) }
function startProef(key){ const g=proefGroepen().find(x=>x.key===key); if(!g){ melding('Deze toets is er niet'); return }
  let pool=shuffle(g.lvs.flatMap(l=>l.vragen.filter(autoNakijk).filter(v=>typeof laagTelt!=='function'||laagTelt(v.lg)).map(v=>Object.assign({w:g.w,l:l.id},v)))).slice(0,PROEF_N);
  const gens=[...new Set(g.lvs.flatMap(l=>l.gens||[]))]; if(gens.length&&pool.length>=PROEF_N) pool.splice(-2,2,maakGen(pick(gens)),maakGen(pick(gens)));
  pool.forEach(v=>delete v._mix);
  Q={modus:'proef',geenFb:true,titel:'Proeftoets · '+g.hfd,key,w:g.w,vragen:shuffle(pool),i:0,res:[],terug:"go('proef')",start:Date.now(),eind:Date.now()+pool.length*75*1000};
  go('quiz'); startKlok() }
let klokTimer=null;
function startKlok(){ clearInterval(klokTimer); klokTimer=setInterval(()=>{ if(scherm!=='quiz'||!Q||!Q.eind||Q.modus==='sprint'){ clearInterval(klokTimer); return }
  const s=Math.max(0,Math.round((Q.eind-Date.now())/1000)); const el=$('#klok'); if(el){ el.textContent=`⏱️ ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; el.classList.toggle('bijna',s<60) }
  if(s<=0){ clearInterval(klokTimer); Q.tijdOp=true; while(Q.res.length<Q.vragen.length) Q.res.push(false); klaar() } },1000) }
const _tekenVraagX=tekenVraag;
tekenVraag=function(){ _tekenVraagX(); const v=Q.vragen[Q.i];
  if(Q.eind&&Q.modus!=='sprint'){ const t=$('#qz .top .chip'); if(t) t.insertAdjacentHTML('beforebegin','<span class="chip" id="klok">⏱️</span>') }
  if(v.t==='klik'){ $('#fb').insertAdjacentHTML('beforebegin',`<div class="graf">${v.svg}</div><p class="zacht" style="font-size:14px;margin:4px 0 0">Tik of klik in de grafiek. Je kunt je keuze aanpassen tot je op Controleer drukt.</p>`) } };
const _afrondenX=afronden;
afronden=function(v){ const g=v.t==='klik'?$('#grafOpl'):null; _afrondenX(v); if(g&&g.isConnected&&!Q.geenFb) g.innerHTML=v.opl };
const _klaarX=klaar;
klaar=function(){ clearInterval(klokTimer); if(Q&&Q.modus==='proef') return proefUitslag(); return _klaarX() };
function proefUitslag(){
  oefenActief=false; const n=Q.res.filter(Boolean).length, tot=Q.vragen.length;
  if(!S.pt) S.pt={}; const r=S.pt[Q.key]||{b:0,n:0}; r.n++; r.b=Math.max(r.b||0,n); r.l=n; r.tot=tot; r.t=Date.now(); S.pt[Q.key]=r;
  if(n>=Math.ceil(tot*.7)) S.mVerd+=5; checkBadges(); bewaar(); sync();
  const fout=Q.vragen.filter((v,i)=>!Q.res[i]); const per={}; fout.forEach(v=>{ const k=v.e||'?'; per[k]=(per[k]||0)+1 });
  const min=Math.round((Math.min(Date.now(),Q.eind)-Q.start)/60000);
  app().innerHTML=`<div class="wrap" style="max-width:680px"><div class="kaart mid"><div class="groot">${fout.length?'📝':'🏆'}</div>
    <h2 style="margin:6px 0">${n} van ${tot} goed</h2><p class="zacht">${esc(Q.titel.replace('Proeftoets · ',''))} · ${Q.tijdOp?'de tijd was om':`klaar in ${min} minuten`} · je beste score ${r.b} van ${tot}</p>
    <p>${fout.length?'Kijk hieronder waar het misging. De foute vragen staan in je herhaalronde: oefen door tot ze goed zijn.':'Alles goed! Je beheerst dit hoofdstuk.'}</p>
    <div class="voet" style="justify-content:center"><button class="knop zacht" onclick="go('proef')">Terug</button><button class="knop" onclick="startProef('${esc(Q.key)}')">Nieuwe proeftoets</button>${fout.length?`<button class="knop zacht" onclick="startHerhaal()">Oefen je fouten</button>`:''}</div></div>
   ${fout.length?`<div class="sectie">Hier moet je nog mee oefenen</div><div class="kaart">${Object.entries(per).sort((a,b)=>b[1]-a[1]).map(([k,x])=>`<button class="lv" onclick="${EINDTERMEN[k]?`startEindterm('${k}')`:`go('proef')`}"><span class="med">${ldDomein(k).icoon||'📘'}</span><span style="flex:1"><b>${esc(ldNaam(k))}</b><small>${x} fout · tik om dit onderwerp te oefenen</small></span><span class="zacht">›</span></button>`).join('')}</div>
   <div class="sectie">Uitleg bij je fouten</div><div class="kaart">${fout.map(v=>`<div class="rij" style="display:block"><b>${esc(v.q)}</b><br>Juist: <b>${esc(juistTekst(v))}</b>${v.u?`<br><span class="zacht">${esc(v.u)}</span>`:''}</div>`).join('')}</div>`:''}</div>`;
  scherm='resultaat'; nav();
}
SCHERMEN.proef = function(){
  const gr=proefGroepen(); const pt=S.pt||{};
  const blok=`<div class="kaart">${gr.map(g=>{ const r=pt[g.key]; const W=WERELDEN.find(w=>w.id===g.w);
      return `<button class="lv" onclick="startProef('${esc(g.key)}')"><span class="med">${r?(r.b>=(r.tot||PROEF_N)?'✅':'📝'):W.icoon}</span><span style="flex:1"><b>${esc(g.hfd)}</b><small>${Math.min(PROEF_N,g.n)} vragen · ${Math.round(Math.min(PROEF_N,g.n)*1.25)} minuten${r?` · beste score ${r.b} van ${r.tot||PROEF_N} · laatste ${r.l} · ${r.n}× gemaakt`:''}</small></span><span class="zacht">›</span></button>` }).join('')}</div>`;
  return `<div class="wrap" style="max-width:760px">${kop('Proeftoets per hoofdstuk',"go('leren')")}
   <div class="kaart" style="margin-bottom:6px"><p style="margin:0">Een toets zoals in de klas: ${PROEF_N} vragen uit één hoofdstuk, ongeveer 1 minuut per vraag. Je ziet pas aan het eind wat goed en fout was. Je krijgt geen cijfer, wel hoeveel je goed hebt en welke onderwerpen je nog moet oefenen. Foute vragen komen in je herhaalronde.</p></div>
   ${blok}</div>${VOET()}`;
};

// ---------- 6. Examen op tijd ----------
// Een heel examen op één pagina, met 120 minuten (zoals het echte centraal examen GL/TL). Daarna kijkt de leerling alles na met het
// antwoordmodel (meerkeuze en invulvragen gaan vanzelf). Geen cijfer: alleen punten per domein en wat je nog moet oefenen. S.exvol = het examen dat bezig is, S.exr = uitslagen.
const EX_MIN=120;
const exvVragen = c => EXAMEN.vragen.filter(v=>v.ex===c).sort((a,b)=>a.nr-b.nr);
const exvMax = l => l.reduce((a,v)=>a+(v.pnt||1),0);
let exvTimer=null, exvSave=null;
const exvGedaan = a => Array.isArray(a)?a.some(x=>x>=0):(a!=null&&a!=='');
function exTijdLijst(){ const r=S.exr||{};
  return `<div class="kaart" style="margin-bottom:12px"><p style="margin:0">Maak een heel examen onder examenomstandigheden: alle vragen op één pagina en ${EX_MIN} minuten, net als op de echte examendag. Je antwoorden worden steeds bewaard, maar de klok loopt door. Na het inleveren kijk je alles na met het antwoordmodel. Je ziet je punten per domein en wat je nog moet oefenen. Je krijgt geen cijfer.</p></div>
   <div class="kaart">${exLijst().map(({c})=>{ const l=exvVragen(c); const x=r[c]; const bezig=S.exvol&&S.exvol.c===c;
     return `<button class="lv" onclick="go('exvol','${c}')"><span class="med">${bezig?'✍️':x?'✅':'🎓'}</span><span style="flex:1"><b>Examen ${exNaam(c)}</b><small>${l.length} vragen · ${exvMax(l)} punten${bezig?' · <b>bezig</b>':''}${x?` · laatste keer ${x.p} van ${x.m} punten`:''}</small></span><span class="zacht">›</span></button>` }).join('')}</div>`; }
SCHERMEN.exvol = function(c){
  c=c||(S.exvol||{}).c; const l=exvVragen(c||''); if(!l.length) return `<div class="wrap">${kop('Examen op tijd',"go('examen')")}<div class="kaart"><p style="margin:0">Dit examen is niet gevonden.</p></div></div>`;
  const E=S.exvol&&S.exvol.c===c?S.exvol:null;
  if(!E) return `<div class="wrap" style="max-width:680px">${kop('Examen '+exNaam(c),"exTab='tijd';go('examen')")}<div class="kaart">
    <p style="margin-top:0"><b>${l.length} vragen · ${exvMax(l)} punten · ${EX_MIN} minuten</b></p>
    <ul><li>Je ziet alle vragen op één pagina, met de teksten en bronnen erbij.</li><li>Schrijf je antwoorden zoals op het echte examen. Ze worden steeds bewaard, ook als je de app sluit.</li><li>De klok loopt door, ook als je even weggaat. Is de tijd om, dan wordt het examen ingeleverd.</li><li>Daarna kijk je alles na met het antwoordmodel. Meerkeuze- en invulvragen worden vanzelf nagekeken. Je krijgt geen cijfer, wel je punten per domein en wat je nog moet oefenen.</li></ul>
    ${S.exvol?`<p class="zacht">Let op: je bent nog bezig met examen ${exNaam(S.exvol.c)}. Als je dit examen start, vervalt dat.</p>`:''}
    <label class="label"><input type="checkbox" id="exvExtra"> Ik heb recht op extra tijd (30 minuten)</label>
    <div class="voet"><button class="knop" onclick="exvStart('${c}')">Start het examen</button></div></div></div>`;
  if(E.fase==='uitslag') return exvUitslag(c,l,E);
  const nakijk=E.fase==='nakijken';
  let vorigeCtx='', vorigeTitel='';
  const blokken=l.map((v,i)=>{ let h='';
    if(v.titel&&v.titel!==vorigeTitel){ h+=`<h2 class="exvOpgave">${esc(v.titel)}</h2>`; vorigeTitel=v.titel }
    if(v.ctx&&v.ctx!==vorigeCtx){ h+=`<div class="exvCtx">${fmt(v.ctx)}</div>`; vorigeCtx=v.ctx }
    const imgs=(v.img||[]).map(s=>`<button class="knop zacht klein" onclick="exvImg(${i},'${s}')">${s.includes('-b-')?'📊 Informatiebron':'📄 Examenpagina'}</button>`).join(' ');
    const a=E.antw[v.id];
    let inv;
    if(v.gaps) inv=`<div class="koppel">${v.gaps.map((g,k)=>{ const kz=(a||[])[k]; return `<b>(${g.n})</b><select ${nakijk?'disabled':''} class="${nakijk?(kz===g.a?'goed':'fout'):''}" onchange="exvGat(${i},${k},+this.value)"><option value="-1">Kies…</option>${g.o.map((o,j)=>`<option value="${j}" ${kz===j?'selected':''}>${esc(o)}</option>`).join('')}</select>` }).join('')}</div>`;
    else if(v.t==='ex') inv=`<div class="opties">${v.o.map((o,k)=>`<button class="optie ${a===k?'kies':''} ${nakijk?(k===v.a?'goed':a===k?'fout':''):''}" ${nakijk?'disabled':''} onclick="exvMc(${i},${k})"><span class="l">${'ABCDE'[k]}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    else inv=nakijk?`<div class="exvMijn">${a?esc(a):'<span class="zacht">Geen antwoord gegeven.</span>'}</div>`:`<textarea rows="4" oninput="exvTyp(${i},this.value)" placeholder="Je antwoord">${esc(a||'')}</textarea>`;
    return h+`<div class="kaart exvVraag" id="exv${i}"><div class="exvKop"><b>Vraag ${v.nr}</b><span class="zacht">${v.pnt||1}p</span>${nakijk?`<span class="exvPnt" id="exvP${i}"></span>`:''}</div>
      ${imgs?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">${imgs}</div><div id="exvImg${i}"></div>`:''}
      <div class="vraag lang">${fmt(v.q,true)}</div>${inv}${nakijk?exvNakijkBlok(v,i,E):''}</div>`; }).join('');
  const nB=l.filter(v=>exvGedaan(E.antw[v.id])).length;
  const balk=nakijk?`<div class="exvBalk"><b>Nakijken</b><span id="exvTot"></span><span style="flex:1"></span><button class="knop klein" onclick="exvKlaar('${c}')">Klaar met nakijken</button></div>`
    :`<div class="exvBalk"><b id="exKlok">⏱️</b><span class="zacht" id="exvN">${nB} van ${l.length} beantwoord</span><span style="flex:1"></span><button class="knop zacht klein" onclick="go('home')">Pauze</button><button class="knop klein" onclick="if(confirm('Weet je zeker dat je wilt inleveren?'))exvInleveren()">Inleveren</button></div>`;
  return `<div class="wrap" style="max-width:860px"><div class="exvTitel"><span class="eyebrow">Centraal examen</span><h1>Economie ${exNaam(c)}</h1>${nakijk?'<p>Kijk elke vraag na met het antwoordmodel. Meerkeuzevragen zijn al nagekeken. Vink per deelscore aan wat er in je antwoord staat, of kies het aantal punten.</p>':''}</div>${balk}${blokken}
   <div class="voet" style="justify-content:center;margin:20px 0">${nakijk?`<button class="knop" onclick="exvKlaar('${c}')">Klaar met nakijken</button>`:`<button class="knop" onclick="if(confirm('Weet je zeker dat je wilt inleveren?'))exvInleveren()">Inleveren</button>`}</div></div>`;
};
SCHERMEN.exvol_na = function(){ const E=S.exvol; clearInterval(exvTimer); if(!E) return;
  if(E.fase==='maken'){ const tik=()=>{ if(scherm!=='exvol'){ clearInterval(exvTimer); return } const s=Math.max(0,Math.round((E.eind-Date.now())/1000)); const el=$('#exKlok');
      if(el){ el.textContent=`⏱️ ${Math.floor(s/3600)}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; el.classList.toggle('bijna',s<600) }
      if(s<=0){ clearInterval(exvTimer); melding('De tijd is om. Je examen is ingeleverd.',4000); exvInleveren() } };
    tik(); exvTimer=setInterval(tik,1000) }
  if(E.fase==='nakijken') exvTel() };
function exvStart(c){ const extra=$('#exvExtra')&&$('#exvExtra').checked; S.exvol={c,start:Date.now(),eind:Date.now()+(EX_MIN+(extra?30:0))*60000,antw:{},pnt:{},fase:'maken'}; bewaar(); go('exvol',c) }
function exvBewaar(){ clearTimeout(exvSave); exvSave=setTimeout(()=>bewaar(false),800) }
function exvTyp(i,t){ const E=S.exvol; const v=exvVragen(E.c)[i]; E.antw[v.id]=t; exvBewaar(); exvTelB() }
function exvGat(i,k,j){ const E=S.exvol; if(E.fase!=='maken') return; const v=exvVragen(E.c)[i]; const a=Array.isArray(E.antw[v.id])?E.antw[v.id]:v.gaps.map(()=>-1); a[k]=j; E.antw[v.id]=a; exvBewaar(); exvTelB() }
function exvMc(i,k){ const E=S.exvol; if(E.fase!=='maken') return; const v=exvVragen(E.c)[i]; E.antw[v.id]=k; document.querySelectorAll(`#exv${i} .optie`).forEach((b,j)=>b.classList.toggle('kies',j===k)); exvBewaar(); exvTelB() }
function exvTelB(){ const E=S.exvol, l=exvVragen(E.c); const el=$('#exvN'); if(el) el.textContent=`${l.filter(v=>exvGedaan(E.antw[v.id])).length} van ${l.length} beantwoord` }
function exvImg(i,s){ const b=$('#exvImg'+i); if(!b) return; if(b.dataset.s===s){ b.innerHTML=''; b.dataset.s=''; return } b.dataset.s=s;
  b.innerHTML=`<div style="overflow:auto;max-height:70vh;border:1px solid var(--lijn);border-radius:12px;margin-bottom:10px;background:#fff"><img src="${EX_IMG}${s}.jpg" alt="Examenpagina" style="width:100%;display:block"></div>` }
function exvInleveren(){ const E=S.exvol; if(!E) return; clearInterval(exvTimer); E.fase='nakijken'; E.ingeleverd=Date.now();
  exvVragen(E.c).forEach(v=>{ if(v.t==='ex') E.pnt[v.id]=E.antw[v.id]===v.a?(v.pnt||1):0; else if(v.gaps) E.pnt[v.id]=invulPunten(v,E.antw[v.id]) }); bewaar(); go('exvol',E.c) }
function exvNakijkBlok(v,i,E){
  if(v.gaps){ const n=v.gaps.filter((g,k)=>(E.antw[v.id]||[])[k]===g.a).length; return `<div class="fb ${n===v.gaps.length?'goed':'fout'}"><b>${n} van ${v.gaps.length} goed.</b> Juist: ${v.gaps.map(g=>`(${g.n}) ${esc(g.o[g.a])}`).join(' · ')}</div>` }
  if(v.t==='ex') return `<div class="fb ${E.antw[v.id]===v.a?'goed':'fout'}"><b>${E.antw[v.id]===v.a?'Goed':'Fout'}.</b> Het juiste antwoord is ${'ABCDE'[v.a]}.</div>`;
  const ds=v.pnt?deelscoresVan(v):null; const tekst=String(E.antw[v.id]||''); const p=E.pnt[v.id];
  let ui;
  if(ds){ const gekozen=E.deel&&E.deel[v.id];
    ui=`<div class="deelscores">${ds.map((d,k)=>{ const g=uitkomstVan(d.t); const auto=bevatGetal(tekst,g); const aan=gekozen?gekozen.includes(k):auto;
      return `<label class="deel"><input type="checkbox" ${aan?'checked':''} onchange="exvDeel(${i})"><span>${esc(d.t.replace(/^(Een juist antwoord bevat|Een juiste (berekening|uitleg|verklaring) is|Uit het antwoord moet blijken)( dat)?:?\s*/i,''))} <b class="zacht">(${d.p}p)</b>${auto?`<br><small class="auto">🤖 De computer vond ${esc(g)} in je antwoord</small>`:''}</span></label>` }).join('')}</div>`;
    if(p==null){ E.pnt[v.id]=ds.reduce((a,d,k)=>a+(bevatGetal(tekst,uitkomstVan(d.t))?d.p:0),0) } }
  else ui=`<div class="voet" style="justify-content:flex-start;flex-wrap:wrap;margin-top:8px">${Array.from({length:(v.pnt||1)+1},(_,k)=>k).map(k=>`<button class="knop klein ${p===k?'':'zacht'}" onclick="exvPunt(${i},${k})">${k} punt${k===1?'':'en'}</button>`).join('')}</div>`;
  return `<details class="exvModel" open><summary>Antwoordmodel</summary><div>${fmt(ds?String(v.model).split(/\n\s*Puntenverdeling:?/)[0]:v.model)}</div></details>${ui}`;
}
function exvDeel(i){ const E=S.exvol, v=exvVragen(E.c)[i]; const ds=deelscoresVan(v); const box=$('#exv'+i); const aan=[...box.querySelectorAll('.deelscores input')].map((x,k)=>x.checked?k:-1).filter(k=>k>=0);
  E.deel=E.deel||{}; E.deel[v.id]=aan; E.pnt[v.id]=aan.reduce((a,k)=>a+ds[k].p,0); exvBewaar(); exvTel() }
function exvPunt(i,k){ const E=S.exvol, v=exvVragen(E.c)[i]; E.pnt[v.id]=k; $('#exv'+i).querySelectorAll('.voet .knop').forEach((b,j)=>b.classList.toggle('zacht',j!==k)); exvBewaar(); exvTel() }
function exvTel(){ const E=S.exvol, l=exvVragen(E.c); let p=0, open=0; l.forEach((v,i)=>{ const x=E.pnt[v.id]; if(x==null) open++; else p+=x; const el=$('#exvP'+i); if(el) el.innerHTML=x==null?'<span class="zacht">nog nakijken</span>':`<b>${x} van ${v.pnt||1}</b>` });
  const t=$('#exvTot'); if(t) t.innerHTML=`${p} van ${exvMax(l)} punten${open?` · nog ${open} vragen nakijken`:''}`; return {p,open} }
function exvKlaar(c){ const E=S.exvol, l=exvVragen(c); const {p,open}=exvTel(); if(open&&!confirm(`Je hebt ${open} vragen nog niet nagekeken. Die tellen als 0 punten. Toch afronden?`)) return;
  const m=exvMax(l);
  l.forEach(v=>{ const x=E.pnt[v.id]||0, mx=v.pnt||1; const kopie=Object.assign({},v); if(v.t==='open') kopie._pt={p:x,max:mx}; registreer(kopie,x>=mx) });
  if(!S.exr) S.exr={}; const minuten=Math.round(((E.ingeleverd||Date.now())-E.start)/60000);
  S.exr[c]={p,m,t:Date.now(),min:minuten}; E.fase='uitslag'; E.p=p; E.m=m; E.min=minuten;
  S.mVerd+=15; checkBadges(); bewaar(); sync(); go('exvol',c) }
function exvUitslag(c,l,E){
  const perD={}, perE={}; l.forEach(v=>{ const x=E.pnt[v.id]||0, mx=v.pnt||1; const d=perD[v.d]||(perD[v.d]={p:0,m:0}); d.p+=x; d.m+=mx;
    if(v.e&&EINDTERMEN[v.e]&&!v.e.startsWith('EX.')){ const e=perE[v.e]||(perE[v.e]={p:0,m:0}); e.p+=x; e.m+=mx } });
  const doms=Object.entries(perD).map(([d,x])=>{ const D=DOMEINEN.find(y=>y.id===d)||{naam:d,icoon:''}; const pc=Math.round(x.p/x.m*100); return `<div class="domein"><span>${D.icoon}</span><div><small>${esc(D.naam)} · ${x.p} van ${x.m} punten</small><div class="balk"><i style="width:${pc}%;background:${pc>=75?'var(--goed)':pc>=50?'var(--goud)':'var(--fout)'}"></i></div></div><span class="pct">${x.p}/${x.m}</span></div>` }).join('');
  const zwak=Object.entries(perE).filter(([k,x])=>x.p<x.m).sort((a,b)=>(a[1].p/a[1].m)-(b[1].p/b[1].m)).slice(0,6);
  return `<div class="wrap" style="max-width:680px">${kop('Examen '+exNaam(c),"exTab='tijd';go('examen')")}<div class="kaart mid"><div class="groot">🎓</div>
   <h2 style="margin:6px 0">${E.p} van ${E.m} punten</h2><p class="zacht">Gemaakt in ${E.min} minuten. Kijk hieronder waar je de meeste punten liet liggen en oefen die onderwerpen.</p>
   <div class="voet" style="justify-content:center"><button class="knop zacht" onclick="S.exvol=null;bewaar();exTab='tijd';go('examen')">Terug naar de examens</button><button class="knop" onclick="S.exvol=null;bewaar();startHerhaal()">Oefen je fouten</button></div></div>
   <div class="sectie">Punten per domein</div><div class="kaart">${doms}</div>
   ${zwak.length?`<div class="sectie">Hier moet je nog mee oefenen</div><div class="kaart">${zwak.map(([k,x])=>`<button class="lv" onclick="S.exvol=null;bewaar();startEindterm('${k}')"><span class="med">${ldDomein(k).icoon}</span><span style="flex:1"><b>${esc(ldNaam(k))}</b><small>${x.p} van ${x.m} punten gehaald · oefen dit onderwerp</small></span><span class="zacht">›</span></button>`).join('')}</div>`:''}</div>`;
}

// ---------- Foutenschrift ----------
// Alle vragen die de leerling ooit fout had, gegroepeerd per leerdoel (eindterm/onderwerp). 'Open' = nog niet weggewerkt:
// staat nog in de herhaalronde (leerling) of vaker fout dan goed (docent). Rekensommen met wisselende getallen tellen per soort.
function foutGroepen(vr, herhaal){
  const g={};
  Object.entries(vr||{}).forEach(([id,r])=>{ if(!r||!r.f) return; let v;
    if(id.startsWith('gen.')){ try{ v=maakGen(id.slice(4)) }catch(e){ return } } else v=vraagById(id);
    if(!v||!v.e) return; const open=herhaal&&!v.gen?herhaal.includes(id):r.f>(r.g||0);
    (g[v.e]=g[v.e]||{e:v.e,items:[]}).items.push({id,v,r,open}) });
  return Object.values(g).map(x=>{ x.items.sort((a,b)=>(b.open-a.open)||(b.r.f-a.r.f)); x.open=x.items.filter(i=>i.open).length; x.tot=x.items.length; return x })
    .sort((a,b)=>b.open-a.open||b.tot-a.tot);
}
const ldNaam = e => (EINDTERMEN[e]||{}).t||e;
const ldDomein = e => DOMEINEN.find(d=>d.id===(EINDTERMEN[e]||{}).d)||{icoon:'',naam:''};
let fsAlles=false;
SCHERMEN.fouten = function(){
  const gr=foutGroepen(S.vr,S.herhaal).filter(x=>fsAlles||x.open);
  const nOpen=gr.reduce((a,x)=>a+x.open,0);
  const item=i=>{ const v=i.v; const q=v.gen?'Rekensom: '+v.q:v.q;
    return `<div class="rij fsItem" style="display:block"><div style="display:flex;gap:8px;align-items:baseline"><span>${i.open?'🔴':'✅'}</span><span style="flex:1">${esc(q.length>260?q.slice(0,260)+'…':q)}</span></div>
     <div class="zacht" style="font-size:13px;margin:2px 0 0 26px">${i.r.f}× fout${i.r.g?' · '+i.r.g+'× goed':''}${v.w==='ex'&&v.jaar?` · examen ${v.jaar} tijdvak ${v.tv} vraag ${v.nr}`:''}${i.open?'':' · weggewerkt'}</div>
     <div style="margin:4px 0 0 26px;font-size:14px">${v.t==='open'?`<details><summary style="cursor:pointer;color:var(--acc);font-weight:700">Antwoordmodel</summary>${fmt(v.model||'')}</details>`:`Juist: <b>${esc(v.gen?'(steeds andere getallen)':String(juistTekst(v)))}</b>${v.u?`<br><span class="zacht">${esc(v.u)}</span>`:''}`}</div></div>` };
  const blok=gr.map(x=>{ const D=ldDomein(x.e), sc=etScore(x.e);
    const items=x.items.filter(i=>fsAlles||i.open);
    return `<div class="kaart fsLd" style="margin-bottom:12px"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span style="font-size:26px">${D.icoon}</span>
      <span style="flex:1;min-width:200px"><span class="zacht" style="font-size:13px">${esc(D.naam)} · onderwerp</span><br><b>${esc(ldNaam(x.e))}</b></span>
      <span style="text-align:right"><b style="color:${x.open?'var(--fout)':'var(--goed)'}">${x.open} open</b><br><span class="zacht" style="font-size:13px">${x.tot} ooit fout${sc!=null?' · score '+sc:''}</span></span></div>
      <div class="voet" style="justify-content:flex-start;flex-wrap:wrap;margin:10px 0 4px">${x.open?`<button class="knop klein" onclick="startFoutLd('${x.e}')">Oefen deze foute vragen</button>`:''}<button class="knop zacht klein" onclick="${x.e.startsWith('EX.')?`startExDomein('${x.e.slice(3)}')`:`startEindterm('${x.e}')`}">Nieuwe vragen over dit onderwerp</button></div>
      <details ${gr.length<=3?'open':''}><summary style="cursor:pointer;font-weight:700">Bekijk de ${items.length} vragen</summary>${items.map(item).join('')}</details></div>` }).join('');
  return `<div class="wrap" style="max-width:860px">${kop('Foutenschrift',"go('leren')")}
   <div class="kaart" style="margin-bottom:14px"><p style="margin:0 0 8px">Hier staan alle vragen die je fout had, per onderwerp. Bovenaan staan de onderwerpen waar je nog de meeste fouten open hebt: daar moet je dus specifiek aan werken. Een fout is weggewerkt als je de vraag daarna twee keer goed hebt.</p>
   <p style="margin:0 0 10px"><b>${nOpen}</b> fouten nog open, verdeeld over <b>${gr.filter(x=>x.open).length}</b> onderwerpen.</p>
   <div class="voet" style="justify-content:flex-start;flex-wrap:wrap;margin:0"><label class="label" style="margin:0"><input type="checkbox" ${fsAlles?'checked':''} onchange="fsAlles=this.checked;go('fouten')"> Ook weggewerkte fouten tonen</label><span style="flex:1"></span><button class="knop zacht klein" onclick="document.querySelectorAll('.fsLd details').forEach(d=>d.open=true);window.print()">Afdrukken</button></div></div>
   ${blok||'<div class="kaart"><p class="zacht" style="margin:0">Nog geen fouten. Goed bezig, of nog niet genoeg geoefend!</p></div>'}</div>${VOET()}`;
};
function startFoutLd(e){ const gr=foutGroepen(S.vr,S.herhaal).find(x=>x.e===e); if(!gr) return;
  const v=gr.items.filter(i=>i.open).map(i=>i.v.gen?maakGen(i.id.slice(4)):i.v).slice(0,12).map(x=>{ const c=Object.assign({},x); delete c._mix; return c });
  Q={modus:'herhaal',titel:'Foutenschrift · '+ldNaam(e),vragen:shuffle(v),i:0,res:[],terug:"go('fouten')"}; go('quiz') }
// voor het docentendashboard: compact overzicht per leerdoel
function foutenschriftDocent(s){ const gr=foutGroepen(s.vr); if(!gr.length) return '<p class="zacht" style="margin:0">Nog geen fouten.</p>';
  return gr.slice(0,15).map(x=>{ const D=ldDomein(x.e); const sc=etPct((s.et||{})[x.e]);
    return `<details class="rij" style="display:block"><summary style="cursor:pointer;display:flex;gap:10px;align-items:center"><span>${D.icoon}</span><span style="flex:1;font-size:14px">${esc(ldNaam(x.e))}</span><b style="color:${x.open?'var(--fout)':'var(--goed)'}">${x.open} open</b><span class="zacht" style="font-size:13px;min-width:70px;text-align:right">${x.tot} ooit fout</span>${dc(sc)}</summary>
     ${x.items.slice(0,8).map(i=>`<div style="font-size:13px;margin:4px 0 0 30px">${i.open?'🔴':'✅'} ${esc((i.v.gen?'Rekensom: ':'')+(i.v.q.length>180?i.v.q.slice(0,180)+'…':i.v.q))} <span class="zacht">(${i.r.f}× fout${i.r.g?', '+i.r.g+'× goed':''})</span></div>`).join('')}</details>` }).join('') }
