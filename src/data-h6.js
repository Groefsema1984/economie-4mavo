// ===== Hoofdstuk 6: Iedereen betaalt belasting (bron: 01_KADER_MAVO_4_PINCODE_H6 en 03_REKENREGELS deel 2C/3C) =====
// Leertarieven uit het rekenregelbestand: box 1 36% tot € 40.000, 38% tot € 80.000, 50% daarboven.
// Box 3: heffingsvrij € 60.000, fictief rendement 6%, tarief 36%.
const BEGRIPPEN_H6 = {
  'Primair inkomen':'Inkomen dat je zelf verdient: uit arbeid (loon) of uit bezit (huur, rente, dividend).',
  'Secundair inkomen':'Je netto-inkomen plus uitkeringen en toeslagen.',
  'Toeslagen':'Bijdragen van de overheid voor lage inkomens, zoals huurtoeslag en zorgtoeslag.',
  'Loonbelasting':'Belasting op je loon. Hoort samen met de premie volksverzekeringen bij de loonheffing.',
  'Inkomstenbelasting':'Belasting over je inkomen. De loonheffing is een voorschot hierop.',
  'Aangifte':'Eens per jaar geef je je inkomen door aan de Belastingdienst. Dan krijg je geld terug of moet je bijbetalen.',
  'Boxensysteem':'Box 1 werk en woning, box 2 aanmerkelijk belang, box 3 sparen en beleggen.',
  'Belastbaar inkomen':'Inkomsten uit werk + eigenwoningforfait − aftrekposten.',
  'Eigenwoningforfait':'Bedrag dat je bij je inkomen optelt als je een eigen huis hebt.',
  'Aftrekposten':'Kosten die je van je inkomen mag aftrekken, zoals hypotheekrente en giften.',
  'Schijventarief':'Je inkomen wordt in schijven verdeeld met per schijf een eigen percentage.',
  'Progressief tarief':'Hoe hoger je inkomen, hoe hoger het percentage belasting.',
  'Degressief tarief':'Hoe hoger je inkomen, hoe lager het percentage belasting.',
  'Proportioneel tarief':'Iedereen betaalt hetzelfde percentage (vlaktaks).',
  'Vermogen':'Spaargeld + beleggingen − schulden.',
  'Heffingsvrij vermogen':'Het deel van je vermogen waarover je geen belasting betaalt.',
  'Fictief rendement':'Geschatte opbrengst van je vermogen waarover je box 3-belasting betaalt.',
  'Vermogensrendementsheffing':'De belasting in box 3 over het fictief rendement.',
  'Heffingskorting':'Korting op de belasting zelf, zoals de algemene heffingskorting en de arbeidskorting.',
  'Arbeidskorting':'Heffingskorting voor mensen die werken.',
  'Actieven':'Mensen met een betaalde baan.',
  'Inactieven':'Mensen zonder betaald werk, zoals gepensioneerden, zieken en werklozen.',
  'Herverdeling':'De overheid haalt geld op bij actieven en geeft het aan inactieven.',
  'Nivellering':'Inkomensverschillen worden in procenten kleiner.',
  'Denivellering':'Inkomensverschillen worden in procenten groter.',
  'Draagkrachtbeginsel':'Wie meer kan dragen, betaalt meer belasting.',
  'Profijtbeginsel':'Wie gebruikmaakt van een voorziening, betaalt ervoor.',
  'BPM':'Belasting die je eenmalig betaalt bij aanschaf van een auto of motor.',
  'Belastingontduiking':'Opzettelijk te weinig belasting betalen. Strafbaar.',
  'Belastingontwijking':'De regels slim gebruiken om minder belasting te betalen. Mag wel.'
};

LEVELS.h6 = [
 {id:'h6.0', naam:'Weet je het nog?', kort:'Voorkennis inkomen', vragen:[
  {id:'h6.0.01', t:'koppel', e:'V1.3', q:'Primair of secundair inkomen?', p:[['Loon van je bijbaan','Primair inkomen'],['Huur die je ontvangt van een huurder','Primair inkomen'],['Zorgtoeslag','Secundair inkomen'],['Een WW-uitkering','Secundair inkomen']], u:'Primair verdien je zelf (arbeid of bezit). Secundair: netto-inkomen plus uitkeringen en toeslagen.'},
  {id:'h6.0.02', t:'mc', e:'V1.3', b:'Toeslagen', q:'Welke van deze is een toeslag?', o:['Huurtoeslag','Dividend','Loon','Rente'], a:0, u:'Toeslagen zijn er voor mensen met een laag inkomen: huurtoeslag, zorgtoeslag.'},
  {id:'h6.0.03', t:'mc', e:'V1.3', b:'Primair inkomen', q:'Rente op je spaarrekening is ...', o:['primair inkomen uit bezit','primair inkomen uit arbeid','secundair inkomen','een toeslag'], a:0, u:'Rente, huur en dividend zijn inkomen uit bezit.'},
  {id:'h6.0.04', t:'wo', e:'V1.2', q:'Je nettoloon is hoger dan je brutoloon.', a:false, u:'Netto = bruto − loonheffing. Netto is dus lager.'},
  {id:'h6.0.05', t:'mc', e:'6.3', q:'De AOW is een ...', o:['volksverzekering','werknemersverzekering','sociale voorziening','toeslag'], a:0, u:'De AOW geldt voor alle inwoners.'},
  {id:'h6.0.06', t:'mc', e:'V1.3', b:'Secundair inkomen', q:'Wat is secundair inkomen?', o:['Je netto-inkomen plus uitkeringen en toeslagen','Alleen je brutoloon','Alleen rente en dividend','Geld dat je leent'], a:0, u:'Na belastingen en premies, plus overdrachten.'},
  {id:'h6.0.07', t:'wo', e:'6.3', q:'Werknemersverzekeringen gelden voor iedereen in Nederland.', a:false, u:'Alleen voor werknemers. Volksverzekeringen gelden voor iedereen.'},
  {id:'h6.0.08', t:'mc', e:'V1.2', q:'Je brutoloon is € 1.000 en er wordt € 90 loonheffing ingehouden. Wat is je nettoloon?', o:['€ 910','€ 1.090','€ 90','€ 1.000'], a:0, u:'Nettoloon = brutoloon − loonheffing = 1.000 − 90 = € 910.'}
 ]},
 {id:'h6.1', naam:'6.1 Je inkomen wordt belast', kort:'Loonheffing, aangifte en boxen', vragen:[
  {id:'h6.1.01', t:'mc', e:'V1.2', b:'Loonbelasting', q:'Uit welke twee delen bestaat de loonheffing?', o:['Loonbelasting en premies volksverzekeringen','Btw en accijns','Inkomstenbelasting en vennootschapsbelasting','Huur en rente'], a:0, u:'Loonheffing = loonbelasting + premie volksverzekeringen.'},
  {id:'h6.1.02', t:'mc', e:'V1.2', b:'Inkomstenbelasting', q:'De loonheffing is een voorschot op ...', o:['de inkomstenbelasting','de btw','de motorrijtuigenbelasting','de OZB'], a:0, u:'Bij de aangifte wordt afgerekend.'},
  {id:'h6.1.03', t:'mc', e:'V1.2', b:'Aangifte', q:'Er is meer loonheffing ingehouden dan je aan inkomstenbelasting moet betalen. Wat gebeurt er?', o:['Je krijgt geld terug','Je moet bijbetalen','Er gebeurt niets','Je krijgt een boete'], a:0, u:'Te veel betaald = geld terug. Te weinig = bijbetalen.'},
  {id:'h6.1.04', t:'koppel', e:'V1.2', b:'Boxensysteem', q:'Koppel het inkomen aan de box.', p:[['Loon uit werk','Box 1'],['Inkomen uit je eigen woning','Box 1'],['Spaargeld en beleggingen','Box 3']], u:'Box 1 = werk en woning. Box 3 = sparen en beleggen.'},
  {id:'h6.1.05', t:'mc', e:'V1.2', b:'Belastbaar inkomen', q:'Welke formule geeft het belastbaar inkomen in box 1?', o:['Inkomsten uit werk + eigenwoningforfait − aftrekposten','Inkomsten uit werk − eigenwoningforfait + aftrekposten','Brutoloon − loonheffing','Inkomsten uit werk × belastingtarief'], a:0, u:'Het eigenwoningforfait tel je op, aftrekposten trek je af.'},
  {id:'h6.1.06', t:'mc', e:'V1.2', b:'Aftrekposten', q:'Welke uitgave is een aftrekpost?', o:['Hypotheekrente','Boodschappen','Je telefoonabonnement','Een vakantie'], a:0, u:'Hypotheekrente, giften aan goede doelen en reiskosten met het ov naar je werk zijn aftrekposten.'},
  {id:'h6.1.07', t:'wo', e:'V1.2', b:'Eigenwoningforfait', q:'Het eigenwoningforfait trek je af van je inkomen.', a:false, u:'Het eigenwoningforfait tel je juist op bij je inkomen.'},
  {id:'h6.1.08', t:'mc', e:'K3.r', q:'Karin verdient € 52.000. Haar eigenwoningforfait is € 1.500 en haar hypotheekrente € 3.500. Wat is haar belastbaar inkomen?', o:['€ 50.000','€ 54.000','€ 57.000','€ 47.000'], a:0, u:'52.000 + 1.500 − 3.500 = € 50.000.'},
  {id:'h6.1.09', t:'mc', e:'K3.r', q:'Sam had € 180 loonheffing ingehouden en hoeft € 0 inkomstenbelasting te betalen. Wat gebeurt er?', o:['Sam krijgt € 180 terug','Sam moet € 180 bijbetalen','Sam krijgt niets terug','Sam moet € 0 bijbetalen en krijgt € 0'], a:0, u:'Terug of bijbetalen = ingehouden − verschuldigd = 180 − 0 = € 180 terug.'},
  {id:'h6.1.10', t:'mc', e:'V1.2', q:'Wat zegt "box 2" over iemand?', o:['Hij heeft een groot aandelenbelang in een BV of NV','Hij heeft een eigen huis','Hij heeft spaargeld','Hij werkt in loondienst'], a:0, u:'Box 2 is voor aandeelhouders met een aanmerkelijk belang. Die stof hoef je nu niet te kennen.'}
 ], gens:['belastbaarInkomen','terugBijbetalen']},
 {id:'h6.2', naam:'6.2 Hoeveel belasting betaal je?', kort:'Schijven, box 3 en kortingen', vragen:[
  {id:'h6.2.01', t:'koppel', e:'V1.2', q:'Koppel het tarief aan de omschrijving.', p:[['Progressief tarief','Hoe hoger je inkomen, hoe hoger het percentage'],['Degressief tarief','Hoe hoger je inkomen, hoe lager het percentage'],['Proportioneel tarief','Iedereen betaalt hetzelfde percentage']], u:'Nederland heeft een progressief tarief in box 1.'},
  {id:'h6.2.02', t:'mc', e:'V1.2', b:'Schijventarief', q:'Je verdient € 50.000. Leertarief: 36% tot € 40.000 en 38% daarboven. Over welk deel betaal je 38%?', o:['€ 10.000','€ 50.000','€ 40.000','€ 0'], a:0, u:'Alleen het deel boven € 40.000: 50.000 − 40.000 = € 10.000. Niet het hele inkomen!'},
  {id:'h6.2.03', t:'mc', e:'K3.r', q:'Met de leertarieven (36% tot € 40.000, 38% tot € 80.000): hoeveel belasting betaal je over € 50.000?', o:['€ 18.200','€ 19.000','€ 18.000','€ 3.800'], a:0, u:'Schijf 1: 40.000 : 100 × 36 = 14.400. Schijf 2: 10.000 : 100 × 38 = 3.800. Samen € 18.200.'},
  {id:'h6.2.04', t:'wo', e:'V1.2', q:'Als je net in een hogere schijf komt, betaal je over je hele inkomen het hogere percentage.', a:false, u:'Alleen het deel in de hogere schijf krijgt het hogere percentage.'},
  {id:'h6.2.05', t:'mc', e:'V1.2', b:'Vermogen', q:'Hoe bereken je je vermogen?', o:['Spaargeld + beleggingen − schulden','Spaargeld − beleggingen','Inkomen − uitgaven','Spaargeld × rente'], a:0, u:'Vermogen = wat je bezit min wat je schuldig bent.'},
  {id:'h6.2.06', t:'mc', e:'V1.2', b:'Heffingsvrij vermogen', q:'Leertarief box 3: heffingsvrij € 60.000. Je vermogen is € 110.000. Over welk bedrag wordt het fictief rendement berekend?', o:['€ 50.000','€ 110.000','€ 60.000','€ 170.000'], a:0, u:'110.000 − 60.000 = € 50.000. Over het eerste deel betaal je niets.'},
  {id:'h6.2.07', t:'mc', e:'K3.r', b:'Fictief rendement', q:'Box 3 (leertarief): € 50.000 boven het heffingsvrij vermogen, fictief rendement 6%, tarief 36%. Hoeveel belasting?', o:['€ 1.080','€ 3.000','€ 18.000','€ 1.800'], a:0, u:'Rendement = 50.000 : 100 × 6 = 3.000. Belasting = 3.000 : 100 × 36 = € 1.080.'},
  {id:'h6.2.08', t:'mc', e:'V1.2', b:'Heffingskorting', q:'Waar haal je een heffingskorting vanaf?', o:['Van de belasting','Van je inkomen','Van je vermogen','Van je spaargeld'], a:0, u:'Het woord zegt het al: korting op de heffing. Aftrekposten gaan van het inkomen af.'},
  {id:'h6.2.09', t:'mc', e:'V1.2', b:'Arbeidskorting', q:'Welke heffingskorting krijg je alleen als je werkt?', o:['De arbeidskorting','De algemene heffingskorting','De huurtoeslag','Het eigenwoningforfait'], a:0, u:'De arbeidskorting is er voor werkenden.'},
  {id:'h6.2.10', t:'mc', e:'K3.r', q:'Je belasting is € 2.000 en je heffingskortingen zijn samen € 2.600. Hoeveel belasting betaal je?', o:['€ 0,00','− € 600','€ 600','€ 4.600'], a:0, u:'Een belasting wordt nooit lager dan € 0,00.'},
  {id:'h6.2.11', t:'mc', e:'V1.2', b:'Vermogensrendementsheffing', q:'Hoe heet de belasting in box 3?', o:['Vermogensrendementsheffing','Loonheffing','Vennootschapsbelasting','BPM'], a:0, u:'Je betaalt belasting over het fictief rendement van je vermogen.'}
 ], gens:['schijven','box3','verschuldigd']},
 {id:'h6.3', naam:'6.3 Eerlijk zullen we alles delen', kort:'Herverdelen en nivelleren', vragen:[
  {id:'h6.3.01', t:'koppel', e:'V1.3', q:'Actief of inactief?', p:[['Een verpleegkundige','Actieven'],['Een gepensioneerde','Inactieven'],['Iemand met een WW-uitkering','Inactieven'],['Een zzp\'er','Actieven']], u:'Actieven hebben betaald werk.'},
  {id:'h6.3.02', t:'mc', e:'V1.3', b:'Herverdeling', q:'Hoe herverdeelt de overheid inkomen?', o:['Belasting bij actieven, uitkeringen en toeslagen naar inactieven','Iedereen krijgt hetzelfde loon','Bedrijven betalen alle uitkeringen','Door de prijzen te verlagen'], a:0, u:'Dat is herverdeling van inkomens.'},
  {id:'h6.3.03', t:'mc', e:'V1.3', q:'Door de vergrijzing ...', o:['moeten minder actieven betalen voor meer inactieven','komen er meer actieven per AOW\'er','dalen de kosten van de AOW','stijgt het aantal werkenden'], a:0, u:'Meer ouderen, relatief minder werkenden: druk op de AOW.'},
  {id:'h6.3.04', t:'mc', e:'V1.3', b:'Nivellering', q:'De inkomensverschillen worden in procenten kleiner. Dit heet ...', o:['nivellering','denivellering','herverdeling','progressie'], a:0, u:'Nivelleren = verschillen kleiner. Denivelleren = groter.'},
  {id:'h6.3.05', t:'mc', e:'K3.r', q:'Verhouding voor: € 60.000 : € 20.000 = 3. Na een maatregel: € 61.000 : € 21.000 = 2,90. Wat is er gebeurd?', o:['Nivellering, de verhouding is kleiner','Denivellering, de verhouding is groter','Geen van beide','Dat kun je niet zeggen'], a:0, u:'Altijd hoog : laag. Kleiner getal = nivellering.'},
  {id:'h6.3.06', t:'mc', e:'V1.3', q:'Iedereen krijgt er € 50 per maand bij. Wat gebeurt er met de inkomensverschillen?', o:['Nivellering','Denivellering','Ze blijven gelijk','Dat hangt van de btw af'], a:0, u:'Een vast bedrag is voor een laag inkomen een groter percentage. Dus nivellering.'},
  {id:'h6.3.07', t:'mc', e:'V1.3', q:'Alle inkomens stijgen met 2%. Wat gebeurt er met de verhouding?', o:['Die blijft gelijk','Nivellering','Denivellering','Die wordt nul'], a:0, u:'Een vast percentage erbij laat de verhouding gelijk.'},
  {id:'h6.3.08', t:'wo', e:'V1.3', b:'Denivellering', q:'Als het verschil in euro\'s groter wordt, is er altijd denivellering.', a:false, u:'Het gaat om de verhouding in procenten, niet om het verschil in euro\'s.'},
  {id:'h6.3.09', t:'mc', e:'V1.3', q:'Een progressief belastingtarief zorgt voor ...', o:['nivellering','denivellering','vergrijzing','inflatie'], a:0, u:'Hoge inkomens betalen een hoger percentage, dus de verschillen na belasting worden kleiner.'},
  {id:'h6.3.10', t:'mc', e:'V1.3', b:'Inactieven', q:'Waarom is de groei van het aantal inactieven een probleem?', o:['Er moet meer geld naar uitkeringen terwijl minder mensen belasting betalen','Inactieven betalen meer belasting','Er zijn dan meer vacatures','De prijzen dalen'], a:0, u:'De kosten stijgen en de inkomsten van de overheid dalen.'}
 ], gens:['verhouding','procentStijging']},
 {id:'h6.4', naam:'6.4 Iedereen betaalt mee', kort:'Draagkracht, profijt en fraude', vragen:[
  {id:'h6.4.01', t:'koppel', e:'6.2', q:'Draagkracht of profijt?', p:[['Wie meer verdient, betaalt een hoger percentage','Draagkrachtbeginsel'],['Wie een auto heeft, betaalt voor de wegen','Profijtbeginsel'],['Je betaalt collegegeld voor je opleiding','Profijtbeginsel'],['Box 3-belasting voor mensen met veel vermogen','Draagkrachtbeginsel']], u:'Draagkracht = wat je kunt dragen. Profijt = wat je gebruikt.'},
  {id:'h6.4.02', t:'mc', e:'6.2', b:'BPM', q:'Wanneer betaal je BPM?', o:['Eenmalig bij aanschaf van een auto','Elk kwartaal als je een auto hebt','Bij elke tankbeurt','Als je met het ov reist'], a:0, u:'BPM betaal je één keer. Motorrijtuigenbelasting betaal je zolang je de auto hebt.'},
  {id:'h6.4.03', t:'mc', e:'K3.r', q:'De motorrijtuigenbelasting is € 150 per kwartaal. Hoeveel betaal je per jaar?', o:['€ 600','€ 150','€ 1.800','€ 50'], a:0, u:'Per jaar = 4 × het bedrag per kwartaal = 4 × 150 = € 600.'},
  {id:'h6.4.04', t:'koppel', e:'6.2', q:'Ontduiken of ontwijken?', p:[['Een schilder werkt zwart en geeft het niet op','Belastingontduiking'],['Je geeft geld aan een goed doel en trekt het af','Belastingontwijking'],['Een bedrijf verzwijgt een deel van de winst','Belastingontduiking']], u:'Ontduiken is strafbaar. Ontwijken is de regels slim gebruiken en mag.'},
  {id:'h6.4.05', t:'mc', e:'6.2', b:'Belastingontduiking', q:'Waarom is belastingontduiking een probleem voor iedereen?', o:['Er is minder geld voor voorzieningen zoals scholen en zorg','Het maakt producten goedkoper','Het verlaagt de staatsschuld','Het verhoogt de lonen'], a:0, u:'Minder belastinginkomsten betekent minder geld voor collectieve voorzieningen.'},
  {id:'h6.4.06', t:'wo', e:'6.2', b:'Belastingontwijking', q:'Belastingontwijking is strafbaar.', a:false, u:'Ontwijken mag: je gebruikt de regels. Ontduiken is strafbaar.'},
  {id:'h6.4.07', t:'mc', e:'6.2', b:'Profijtbeginsel', q:'Waar hangt de motorrijtuigenbelasting van af?', o:['Het gewicht van de auto en de brandstof','Je inkomen','Hoeveel kilometer je rijdt','De kleur van de auto'], a:0, u:'Rij = gewicht, kolom = brandstof in de tabel.'},
  {id:'h6.4.08', t:'mc', e:'6.2', b:'Draagkrachtbeginsel', q:'Welk belastingtarief past het best bij het draagkrachtbeginsel?', o:['Progressief','Degressief','Een vast bedrag per persoon','Geen belasting'], a:0, u:'Wie meer heeft, betaalt een hoger percentage.'},
  {id:'h6.4.09', t:'mc', e:'K3.r', q:'Motorrijtuigenbelasting € 120 per kwartaal en € 2.000 BPM. Hoeveel belasting betaal je in het eerste jaar?', o:['€ 2.480','€ 2.120','€ 8.480','€ 480'], a:0, u:'4 × 120 = 480 per jaar. Eerste jaar: 480 + 2.000 BPM = € 2.480.'}
 ], gens:['mrbJaar','eersteJaarAuto']},
 {id:'h6.r', naam:'Rekenlab H6', kort:'Alle rekenregels', vragen:[], gens:['belastbaarInkomen','terugBijbetalen','schijven','box3','verschuldigd','verhouding','procentStijging','mrbJaar','eersteJaarAuto']}
];
LEVELS.h6.begrippen = BEGRIPPEN_H6;

function leerBox1(ink){ const s1=Math.min(ink,40000), s2=Math.max(0,Math.min(ink,80000)-40000), s3=Math.max(0,ink-80000); return {s1,s2,s3,b:Math.round((s1*36+s2*38+s3*50))/100} }
Object.assign(GENS_EXTRA, {
  belastbaarInkomen(){ const w=pick([28000,34000,42000,52000,65000]), f=pick([0,0,1200,1500,2100]), a=pick([400,900,2500,3500,5200]); return {t:'reken', e:'V1.2', q:`Inkomsten uit werk ${eur(w)}, eigenwoningforfait ${eur(f)}, aftrekposten ${eur(a)}. Wat is het belastbaar inkomen in box 1?`, a:w+f-a, eh:'€', u:`Belastbaar inkomen = werk + eigenwoningforfait − aftrekposten = ${eur(w)} + ${eur(f)} − ${eur(a)} = ${eur(w+f-a)}.`} },
  terugBijbetalen(){ const i=pick([180,1200,3400,5600,9800]), v=i+pick([-460,-180,-120,250,480]); const d=i-Math.max(0,v); return {t:'reken', e:'V1.2', q:`Er is ${eur(i)} loonheffing ingehouden. Je moet ${eur(Math.max(0,v))} inkomstenbelasting betalen. Hoeveel krijg je terug? (bijbetalen is negatief)`, a:d, eh:'€', u:`Ingehouden − verschuldigd = ${eur(i)} − ${eur(Math.max(0,v))} = ${eur(d)}. ${d>=0?'Je krijgt geld terug.':'Je moet bijbetalen.'}`} },
  schijven(){ const ink=pick([30000,45000,50000,62000,75000,90000]); const r=leerBox1(ink); const uit=[`Schijf 1: ${eur(r.s1)} : 100 × 36 = ${eur(r.s1*0.36)}`]; if(r.s2) uit.push(`schijf 2: ${eur(r.s2)} : 100 × 38 = ${eur(r.s2*0.38)}`); if(r.s3) uit.push(`schijf 3: ${eur(r.s3)} : 100 × 50 = ${eur(r.s3*0.5)}`); return {t:'reken', e:'V1.2', q:`Leertarieven box 1: 36% tot € 40.000, 38% van € 40.000 tot € 80.000, 50% daarboven. Hoeveel belasting betaal je over een belastbaar inkomen van ${eur(ink)}?`, a:r.b, eh:'€', u:`${uit.join('; ')}. Samen ${eur(r.b)}.`} },
  box3(){ const v=pick([70000,85000,110000,150000,200000]); const g=v-60000, r=g*0.06, b=Math.round(r*36)/100; return {t:'reken', e:'V1.2', q:`Leertarief box 3: heffingsvrij € 60.000, fictief rendement 6%, tarief 36%. Je vermogen is ${eur(v)}. Hoeveel box 3-belasting betaal je?`, a:b, eh:'€', u:`(1) ${eur(v)} − € 60.000,00 = ${eur(g)}. (2) ${eur(g)} : 100 × 6 = ${eur(r)}. (3) ${eur(r)} : 100 × 36 = ${eur(b)}.`} },
  verschuldigd(){ const b1=pick([4000,8500,12000,18200]), b3=pick([0,0,360,1080]), k=pick([2500,3800,4900,6200]); const v=Math.max(0,b1+b3-k); return {t:'reken', e:'V1.2', q:`Belasting box 1: ${eur(b1)}. Belasting box 3: ${eur(b3)}. Heffingskortingen samen: ${eur(k)}. Hoeveel belasting ben je verschuldigd?`, a:v, eh:'€', u:`${eur(b1)} + ${eur(b3)} − ${eur(k)} = ${b1+b3-k<0?'minder dan nul, dus € 0,00':eur(v)}.`} },
  verhouding(){ const l=pick([18000,20000,24000,30000]), h=l*pick([2,2.5,3,4]); return {t:'reken', e:'V1.3', q:`Het hoge inkomen is ${eur(h)} en het lage inkomen ${eur(l)}. Wat is de inkomensverhouding? (hoog : laag, 2 decimalen)`, a:Math.round(h/l*100)/100, eh:'', u:`Verhouding = hoog : laag = ${eur(h)} : ${eur(l)} = ${String(Math.round(h/l*100)/100).replace('.',',')}. Een getal zonder euroteken.`} },
  procentStijging(){ const o=pick([20000,24000,30000,40000,60000]), x=pick([600,900,1200,1500]); const p=Math.round(x/o*1000)/10; return {t:'reken', e:'V1.3', q:`Een inkomen stijgt van ${eur(o)} naar ${eur(o+x)}. Met hoeveel procent stijgt het? (1 decimaal)`, a:p, eh:'%', u:`(nieuw − oud) : oud × 100% = ${eur(x)} : ${eur(o)} × 100% = ${nl1(p)}%.`} },
  mrbJaar(){ const k=pick([96,120,150,183,214]); return {t:'reken', e:'6.2', q:`De motorrijtuigenbelasting voor een auto is ${eur(k)} per kwartaal. Hoeveel is dat per jaar?`, a:4*k, eh:'€', u:`Per jaar = 4 × ${eur(k)} = ${eur(4*k)}.`} },
  eersteJaarAuto(){ const k=pick([96,120,150,183]), b=pick([800,1500,2400,3600]); return {t:'reken', e:'6.2', q:`Je koopt een nieuwe auto. De motorrijtuigenbelasting is ${eur(k)} per kwartaal en de BPM is ${eur(b)}. Hoeveel belasting betaal je in het eerste jaar?`, a:4*k+b, eh:'€', u:`4 × ${eur(k)} = ${eur(4*k)}. Plus de BPM (één keer): ${eur(4*k)} + ${eur(b)} = ${eur(4*k+b)}.`} }
});
