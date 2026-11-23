// ===== Hoofdstuk 8: Ontwikkelingslanden (bron: 01_KADER_4_MAVO_PINCODE_H8) =====
const BEGRIPPEN_H8 = {
  'Ontwikkelingsland':'Arm land met een laag inkomen per hoofd en weinig ontwikkeling.',
  'Noodhulp':'Directe hulp bij een ramp: voedsel, medicijnen en tenten.',
  'Structurele hulp':'Hulp voor de lange termijn, zoals scholen en wegen.',
  'Inkomen per hoofd':'Nationaal inkomen : aantal inwoners.',
  'Gebrekkige maatstaf':'Inkomen per hoofd zegt niet alles: verdeling, prijzen, zelfvoorziening en voorzieningen tellen niet mee.',
  'Lorenzkromme':'Grafiek die laat zien hoe gelijk of ongelijk het inkomen verdeeld is.',
  'Vicieuze cirkel':'Armoede houdt zichzelf in stand: arm → geen scholing → laag inkomen → arm.',
  'Monocultuur':'Een land is afhankelijk van één of enkele producten, zoals cacao.',
  'Analfabetisme':'Mensen kunnen niet lezen en schrijven.',
  'Ruilvoetverslechtering':'De exportprijzen dalen of de importprijzen stijgen.',
  'Ontwikkelingssamenwerking':'Structurele hulp aan ontwikkelingslanden.',
  'Gebonden hulp':'Hulp waarbij het geld besteed moet worden in het donorland, zoals Nederland.',
  'Ongebonden hulp':'Hulp die het ontwikkelingsland vrij mag besteden.',
  'Bilaterale hulp':'Hulp van het ene land rechtstreeks aan het andere land.',
  'Zachte lening':'Lening met een lage rente en een lange looptijd.',
  'Kwijtschelding':'Een schuld wordt (gedeeltelijk) niet meer terugbetaald.',
  'Microkrediet':'Kleine lening voor kleine ondernemers.',
  'Grondstoffenovereenkomst':'Afspraken over minimumprijzen en buffervoorraden van grondstoffen.',
  'Buitenlandse investeringen':'Bedrijven uit rijke landen bouwen fabrieken of winkels in een ontwikkelingsland.',
  'Wereldbank':'Internationale bank die geld leent aan ontwikkelingslanden.',
  'IMF':'Internationaal Monetair Fonds: helpt landen met geldproblemen.',
  'VN':'Verenigde Naties: samenwerking van bijna alle landen van de wereld.',
  'WHO':'Wereldgezondheidsorganisatie. Let op: niet de WTO (handel).',
  'Fairtrade':'Eerlijke handel: boeren krijgen een eerlijke prijs voor hun producten.',
  'Migratie':'Mensen verhuizen naar een ander land, vaak op zoek naar werk.'
};

LEVELS.h8 = [
 {id:'h8.0', naam:'Weet je het nog?', kort:'Voorkennis ontwikkelingslanden', vragen:[
  {id:'h8.0.01', t:'koppel', e:'7.5', q:'Koppel het begrip aan de omschrijving.', p:[['Noodhulp','Hulp direct na een ramp'],['Structurele hulp','Hulp voor de lange termijn'],['Ontwikkelingsland','Arm land met weinig ontwikkeling']], u:'Noodhulp is kortdurend, structurele hulp is voor de lange termijn.'},
  {id:'h8.0.02', t:'mc', e:'K3.r', b:'Inkomen per hoofd', q:'Hoe bereken je het inkomen per hoofd van de bevolking?', o:['Nationaal inkomen : aantal inwoners','Aantal inwoners : nationaal inkomen','Nationaal inkomen × aantal inwoners','Export : import'], a:0, u:'Je deelt het totale inkomen door het aantal inwoners.'},
  {id:'h8.0.03', t:'mc', e:'7.3', q:'Wat is economische groei?', o:['Er wordt meer geproduceerd en verdiend dan het jaar ervoor','De bevolking groeit','De prijzen stijgen','Er komen meer ontwikkelingslanden'], a:0, u:'Bij economische groei stijgt het nationaal inkomen.'},
  {id:'h8.0.04', t:'mc', e:'7.3', b:'Lorenzkromme', q:'Waarvoor gebruik je een lorenzkromme?', o:['Om te zien hoe gelijk het inkomen verdeeld is','Om de inflatie te berekenen','Om de wisselkoers af te lezen','Om de export te meten'], a:0, u:'Hoe verder de kromme van de rechte lijn af ligt, hoe ongelijker de verdeling.'},
  {id:'h8.0.05', t:'wo', e:'7.5', b:'Noodhulp', q:'Na een aardbeving stuurt Nederland tenten en medicijnen. Dit is structurele hulp.', a:false, u:'Dit is noodhulp: directe hulp bij een ramp.'},
  {id:'h8.0.06', t:'mc', e:'7.3', b:'Ontwikkelingsland', q:'Welk land is een ontwikkelingsland?', o:['Burundi','Nederland','Duitsland','Japan'], a:0, u:'Burundi had in 2025 een inkomen per hoofd van ongeveer $ 240 (Wereldbank). Nederland ongeveer $ 68.530.'},
  {id:'h8.0.07', t:'mc', e:'7.3', q:'Welvaart is ...', o:['de mate waarin je in je behoeften kunt voorzien','hoe gelukkig je bent','hoeveel geld een land heeft gespaard','hoeveel mensen er wonen'], a:0, u:'Welvaart gaat over behoeften en middelen.'},
  {id:'h8.0.08', t:'mc', e:'K3.r', q:'Een land heeft een nationaal inkomen van € 40 miljard en 20 miljoen inwoners. Wat is het inkomen per hoofd?', o:['€ 2.000','€ 2','€ 200','€ 20.000'], a:0, u:'Reken eerst om: 40 miljard = 40.000 miljoen. 40.000 : 20 = € 2.000 per inwoner.'}
 ], gens:['inkomenPerHoofd']},
 {id:'h8.1', naam:'8.1 Verschillen in welvaart', kort:'Welvaart meten en verdeling', vragen:[
  {id:'h8.1.01', t:'mc', e:'7.3', b:'Gebrekkige maatstaf', q:'Waarom is het inkomen per hoofd een gebrekkige maatstaf voor welvaart?', o:['Het zegt niets over hoe het inkomen verdeeld is','Het is altijd te hoog','Het wordt niet in euro\'s gemeten','Het telt de export dubbel'], a:0, u:'Ook zelfvoorziening, onbetaalde productie, prijzen en voorzieningen tellen niet mee.'},
  {id:'h8.1.02', t:'mc', e:'7.3', q:'In land A kost brood € 0,20, in land B € 2,00. Beide hebben hetzelfde inkomen per hoofd. Wat kun je zeggen?', o:['In land A kun je meer kopen, de welvaart is hoger','De welvaart is gelijk','In land B is de welvaart hoger','Daar kun je niets over zeggen'], a:0, u:'Het prijspeil bepaalt wat je echt kunt kopen.'},
  {id:'h8.1.03', t:'wo', e:'7.3', q:'Een boer die zijn eigen voedsel verbouwt, telt mee in het nationaal inkomen.', a:false, u:'Zelfvoorziening wordt niet geregistreerd. Daardoor lijkt het inkomen lager dan de welvaart.'},
  {id:'h8.1.04', t:'mc', e:'7.3', q:'Brazilië: de armste 20% krijgt 3,9% van het inkomen, de rijkste 20% krijgt 55,4% (Wereldbank 2024). Nederland: 9,4% en 35,2%. Wat zie je?', o:['Het inkomen in Brazilië is veel ongelijker verdeeld','Het inkomen in Nederland is ongelijker verdeeld','De verdeling is gelijk','Brazilië is rijker dan Nederland'], a:0, u:'Hoe groter het aandeel van de rijkste groep, hoe ongelijker.'},
  {id:'h8.1.05', t:'mc', e:'7.3', q:'Bij een volkomen gelijke inkomensverdeling krijgt de armste 40% van de bevolking ...', o:['40% van het inkomen','20% van het inkomen','4% van het inkomen','niets'], a:0, u:'Bij volkomen gelijk krijgt elke groep precies zijn eigen deel. De lorenzkromme valt dan samen met de rechte lijn.'},
  {id:'h8.1.06', t:'mc', e:'7.3', b:'Vicieuze cirkel', q:'Maak de vicieuze cirkel af: laag inkomen → geen geld voor school → weinig kennis → ...', o:['laag inkomen','hoog inkomen','meer export','minder bevolking'], a:0, u:'De cirkel is rond: armoede houdt zichzelf in stand.'},
  {id:'h8.1.07', t:'mc', e:'7.4', q:'Hoe kun je de vicieuze cirkel van armoede doorbreken?', o:['Door scholing','Door hogere invoerrechten van rijke landen','Door minder handel','Door de bevolking te laten groeien'], a:0, u:'Scholing en structurele economische groei helpen.'},
  {id:'h8.1.08', t:'mc', e:'K3.r', q:'Lorenzkromme in groepen van 20%: 4% - 8% - 13% - 20% - 55%. Hoeveel procent van het inkomen gaat naar de armste 40%?', o:['12%','8%','40%','45%'], a:0, u:'Tel de aandelen op: 4 + 8 = 12%.'},
  {id:'h8.1.09', t:'koppel', e:'7.3', q:'Waarom zegt het inkomen per hoofd niet alles? Koppel.', p:[['Een kleine groep is heel rijk','Ongelijke verdeling'],['Boeren eten hun eigen oogst','Zelfvoorziening'],['Er zijn bijna geen scholen of ziekenhuizen','Weinig collectieve voorzieningen'],['Alles is er heel goedkoop','Laag prijspeil']], u:'Welvaart is meer dan inkomen.'}
 ], gens:['inkomenPerHoofd','lorenz']},
 {id:'h8.2', naam:'8.2 Wat is een ontwikkelingsland?', kort:'Kenmerken, oorzaken en gevolgen', vragen:[
  {id:'h8.2.01', t:'mc', e:'7.3', q:'Welke is een kenmerk van een ontwikkelingsland?', o:['Snelle bevolkingsgroei','Weinig werkloosheid','Veel hoogopgeleiden','Een hoge levensverwachting'], a:0, u:'Ook: veel werkloosheid, ondervoeding, analfabetisme, weinig techniek en een monocultuur.'},
  {id:'h8.2.02', t:'mc', e:'7.3', b:'Monocultuur', q:'Ivoorkust is voor zijn export sterk afhankelijk van cacao. Dit heet ...', o:['een monocultuur','fairtrade','een grondstoffenovereenkomst','vrijhandel'], a:0, u:'Afhankelijk zijn van één product is riskant: daalt de prijs, dan daalt het inkomen.'},
  {id:'h8.2.03', t:'mc', e:'7.3', b:'Analfabetisme', q:'Waarom is analfabetisme een probleem voor de economie?', o:['Mensen kunnen moeilijk geschoold werk doen','Mensen kopen dan meer','De export stijgt','De bevolking krimpt'], a:0, u:'Zonder lezen en schrijven is de arbeidsproductiviteit laag.'},
  {id:'h8.2.04', t:'koppel', e:'7.3', q:'Oorzaak of gevolg van onderontwikkeling?', p:[['Slechte infrastructuur','Oorzaak'],['Migratie naar rijke landen','Gevolg'],['Corrupte regering','Oorzaak'],['Lage levensverwachting','Gevolg']], u:'Oorzaken maken een land arm. Gevolgen komen voort uit de armoede.'},
  {id:'h8.2.05', t:'mc', e:'7.3', q:'Waarom is de toegevoegde waarde van de productie in veel ontwikkelingslanden laag?', o:['Ze verkopen vooral onbewerkte grondstoffen','Ze maken vooral dure machines','Ze hebben te veel fabrieken','Ze betalen te veel belasting'], a:0, u:'Cacaobonen leveren weinig op. De chocoladefabriek in Europa voegt de meeste waarde toe.'},
  {id:'h8.2.06', t:'mc', e:'7.3', b:'Ruilvoetverslechtering', q:'De prijs van cacao daalt, terwijl de prijs van machines stijgt. Wat gebeurt er met de ruilvoet van Ivoorkust?', o:['Die verslechtert','Die verbetert','Die blijft gelijk','Die wordt verboden'], a:0, u:'Exportprijzen dalen of importprijzen stijgen = ruilvoet verslechtert.'},
  {id:'h8.2.07', t:'mc', e:'7.3', q:'Hoe maken protectiemaatregelen van rijke landen ontwikkelingslanden armer?', o:['Ontwikkelingslanden kunnen minder exporteren','Ontwikkelingslanden krijgen meer subsidie','Hun producten worden goedkoper in Europa','Ze krijgen meer toeristen'], a:0, u:'Invoerrechten en quota maken het moeilijk om producten te verkopen in rijke landen.'},
  {id:'h8.2.08', t:'mc', e:'7.3', q:'Een land heeft hoge schulden. Welk gevolg heeft dat?', o:['Er gaat veel geld naar rente in plaats van naar scholen','Het land wordt vanzelf rijker','De export stijgt','De inflatie daalt altijd'], a:0, u:'Er ontstaat een geldstroom van arm naar rijk door rente en aflossing.'},
  {id:'h8.2.09', t:'wo', e:'7.3', b:'Migratie', q:'Migratie naar rijke landen is een gevolg van onderontwikkeling.', a:true, u:'Mensen vertrekken op zoek naar werk en een beter leven.'},
  {id:'h8.2.10', t:'mc', e:'7.3', q:'Welke is een oorzaak van onderontwikkeling?', o:['Natuurrampen en burgeroorlogen','Goed onderwijs','Een stabiele regering','Goede wegen'], a:0, u:'Ook: weinig onderwijs, slechte infrastructuur, schulden, corruptie en een tekort aan hulpbronnen.'}
 ]},
 {id:'h8.3', naam:'8.3 Is vooruitgang mogelijk?', kort:'Hulp, leningen en grondstoffen', vragen:[
  {id:'h8.3.01', t:'koppel', e:'7.5', q:'Koppel de soort hulp aan het voorbeeld.', p:[['Noodhulp','Voedselpakketten na een overstroming'],['Structurele hulp','Een school bouwen en leraren opleiden'],['Microkrediet','€ 100 lenen om een naaimachine te kopen'],['Kwijtschelding','Een land hoeft zijn schuld niet meer terug te betalen']], u:'Noodhulp is kort, structurele hulp is voor lange tijd.'},
  {id:'h8.3.02', t:'mc', e:'7.5', b:'Gebonden hulp', q:'Nederland geeft geld voor een haven, maar de baggeraar moet een Nederlands bedrijf zijn. Dit is ...', o:['gebonden hulp','ongebonden hulp','noodhulp','fairtrade'], a:0, u:'Bij gebonden hulp wordt het geld (deels) in het donorland besteed. Dat geeft ook werk in Nederland.'},
  {id:'h8.3.03', t:'mc', e:'7.5', b:'Ongebonden hulp', q:'Wat is een voordeel van ongebonden hulp voor het ontwikkelingsland?', o:['Het land kan zelf kiezen waar het het geld uitgeeft','Het geld gaat naar Nederlandse bedrijven','Het moet altijd worden terugbetaald','Het is alleen voor noodhulp'], a:0, u:'Het land kan bijvoorbeeld lokale bedrijven inschakelen.'},
  {id:'h8.3.04', t:'mc', e:'7.5', b:'Microkrediet', q:'Wat is een microkrediet?', o:['Een kleine lening voor een kleine ondernemer','Een gift van de overheid','Een lening voor een heel land','Een spaarrekening'], a:0, u:'Met een microkrediet kan iemand een klein bedrijfje starten.'},
  {id:'h8.3.05', t:'mc', e:'7.5', b:'Zachte lening', q:'Wat is een zachte lening?', o:['Een lening met een lage rente en een lange looptijd','Een lening die je nooit hoeft terug te betalen','Een lening met een heel hoge rente','Een lening voor een huis'], a:0, u:'Een zachte lening is goedkoper dan een gewone lening.'},
  {id:'h8.3.06', t:'mc', e:'7.5', b:'Grondstoffenovereenkomst', q:'Cacaolanden spreken een minimumprijs af en leggen voorraden aan. Dit is een ...', o:['grondstoffenovereenkomst','kartel van supermarkten','handelsverdrag over auto\'s','microkrediet'], a:0, u:'Zo krijgen ze meer zekerheid over hun exportinkomsten.'},
  {id:'h8.3.07', t:'mc', e:'7.5', b:'Bilaterale hulp', q:'Nederland geeft rechtstreeks geld aan Ghana. Dit heet ...', o:['bilaterale hulp','multilaterale hulp','fairtrade','protectie'], a:0, u:'Bi = twee: van het ene land rechtstreeks aan het andere.'},
  {id:'h8.3.08', t:'mc', e:'7.4', b:'Buitenlandse investeringen', q:'Een Nederlands bedrijf bouwt een fabriek in Kenia. Wat levert dat Kenia op?', o:['Werkgelegenheid en inkomen','Alleen meer schulden','Minder export','Hogere invoerrechten'], a:0, u:'Buitenlandse investeringen kunnen werk, inkomen en kennis opleveren.'},
  {id:'h8.3.09', t:'mc', e:'K3.r', q:'Awa leent € 150 microkrediet en betaalt 10% rente. Hoeveel betaalt ze in totaal terug?', o:['€ 165','€ 15','€ 160','€ 150'], a:0, u:'Rente = 150 : 100 × 10 = € 15. Totaal = 150 + 15 = € 165.'},
  {id:'h8.3.10', t:'wo', e:'7.5', b:'Ontwikkelingssamenwerking', q:'Ontwikkelingssamenwerking is hetzelfde als noodhulp.', a:false, u:'Ontwikkelingssamenwerking is structurele hulp voor de lange termijn.'}
 ], gens:['microkrediet','hulpBudget']},
 {id:'h8.4', naam:'8.4 Een steentje bijdragen', kort:'Organisaties, handel en fairtrade', vragen:[
  {id:'h8.4.01', t:'koppel', e:'7.5', q:'Koppel de organisatie aan de taak.', p:[['Wereldbank','Leent geld aan ontwikkelingslanden'],['IMF','Helpt landen met geldproblemen'],['WHO','Werkt aan gezondheid in de wereld'],['VN','Samenwerking van bijna alle landen']], u:'Let op: WHO = gezondheid, WTO = handel.'},
  {id:'h8.4.02', t:'mc', e:'7.5', q:'Welke organisatie is een goed doel dat zich richt op onderwijs?', o:['Edukans','Het IMF','De Wereldbank','De ECB'], a:0, u:'Edukans werkt aan onderwijsprojecten. Ook Oxfam Novib en Artsen zonder Grenzen zijn goede doelen.'},
  {id:'h8.4.03', t:'mc', e:'7.4', b:'Fairtrade', q:'Wat betekent fairtrade?', o:['Boeren krijgen een eerlijke prijs voor hun producten','Producten zijn altijd goedkoper','Er is geen handel meer','Alleen rijke landen mogen handelen'], a:0, u:'Boeren werken samen in coöperaties en krijgen een eerlijke prijs.'},
  {id:'h8.4.04', t:'mc', e:'7.4', q:'Welke maatregel van rijke landen verkleint de welvaartsverschillen het meest?', o:['Invoerrechten op producten uit ontwikkelingslanden verlagen','Meer contingentering','Een invoerverbod op cacao','Exportsubsidie voor eigen boeren'], a:0, u:'Dan kunnen ontwikkelingslanden meer verkopen en verdienen.'},
  {id:'h8.4.05', t:'mc', e:'7.4', q:'Wat kun jij als consument doen voor ontwikkelingslanden?', o:['Fairtradeproducten kopen','Alleen de goedkoopste producten kopen','Niets kopen uit het buitenland','Meer kleding weggooien'], a:0, u:'Je koopgedrag heeft invloed op de boeren en arbeiders daar.'},
  {id:'h8.4.06', t:'mc', e:'7.5', q:'Hoe kunnen Nederlandse bedrijven voordeel hebben van ontwikkelingshulp?', o:['Bij gebonden hulp krijgen ze opdrachten','Ze krijgen alle hulp zelf','Ze hoeven geen belasting te betalen','Ze krijgen een monopolie'], a:0, u:'Hulp en handel gaan samen. Gebonden hulp geeft werk in Nederland.'},
  {id:'h8.4.07', t:'mc', e:'7.4', q:'Een kledingmerk laat kleding maken in een fabriek waar kinderen werken. Over welk onderwerp gaat dit?', o:['Maatschappelijk verantwoord ondernemen','Harmonisatie','Inflatie','Box 3'], a:0, u:'Wie betaalt de prijs? Bedrijven horen rekening te houden met mens en milieu.'},
  {id:'h8.4.08', t:'wo', e:'7.5', b:'WHO', q:'De WHO is de Wereldhandelsorganisatie.', a:false, u:'WHO = Wereldgezondheidsorganisatie. De handelsorganisatie is de WTO.'},
  {id:'h8.4.09', t:'mc', e:'7.5', b:'IMF', q:'Een land kan zijn schulden niet meer betalen. Welke organisatie helpt dan vaak?', o:['Het IMF','De WHO','Edukans','De ACM'], a:0, u:'Het Internationaal Monetair Fonds helpt landen met geldproblemen.'}
 ]},
 {id:'h8.r', naam:'Rekenlab H8', kort:'Alle rekenregels', vragen:[], gens:['inkomenPerHoofd','lorenz','microkrediet','hulpBudget']}
];
LEVELS.h8.begrippen = BEGRIPPEN_H8;

Object.assign(GENS_EXTRA, {
  inkomenPerHoofd(){ const inw=pick([5,10,12,20,25,40,50]), ph=pick([240,800,1500,2200,2780,6000]); const ni=inw*ph; const land=pick(['Ghana','Kenia','Ivoorkust','Burundi','Malawi']); const nim=ni; return {t:'reken', e:'7.3', q:`Een land heeft een nationaal inkomen van $ ${nl1(nim/1000).replace(/,0$/,'')} miljard en ${inw} miljoen inwoners. Wat is het inkomen per hoofd in dollars?`, a:ph, eh:'', u:`Reken eerst om: $ ${nl1(nim/1000).replace(/,0$/,'')} miljard = ${gt(nim)} miljoen. Inkomen per hoofd = ${gt(nim)} : ${inw} = $ ${gt(ph)}.`} },
  lorenz(){ const sets=[[9.4,14.6,18.3,22.5,35.2],[3.9,8.1,12.8,19.8,55.4],[3.7,6.9,10.8,19.1,59.5],[6,10,15,22,47]]; const s=pick(sets); const n=pick([2,3,4]); const som=Math.round(s.slice(0,n).reduce((a,b)=>a+b,0)*10)/10; return {t:'reken', e:'7.3', q:`Inkomensaandeel per 20%-groep, van arm naar rijk: ${s.map(x=>nl1(x)+'%').join(' - ')}. Hoeveel procent van het inkomen gaat naar de armste ${n*20}%? (1 decimaal)`, a:som, eh:'%', u:`Tel de eerste ${n} groepen op: ${s.slice(0,n).map(nl1).join(' + ')} = ${nl1(som)}%.`} },
  microkrediet(){ const b=pick([50,100,150,200,300]), r=pick([5,8,10,12,15,20]); const rt=b*r/100; return {t:'reken', e:'7.5', q:`Een boerin leent ${eur(b)} microkrediet tegen ${r}% rente per jaar. Hoeveel moet ze na een jaar in totaal terugbetalen?`, a:b+rt, eh:'€', u:`Rente = ${eur(b)} : 100 × ${r} = ${eur(rt)}. Totaal = ${eur(b)} + ${eur(rt)} = ${eur(b+rt)}.`} },
  hulpBudget(){ const t=pick([3572,3925,4000,4800]), p=pick([10,15,20,25,30]); const d=Math.round(t*p)/100; return {t:'reken', e:'7.5', q:`Het budget voor ontwikkelingshulp is € ${gt(t)} miljoen. Daarvan gaat ${p}% naar noodhulp. Hoeveel miljoen is dat? (1 decimaal)`, a:d, eh:'', u:`${gt(t)} : 100 × ${p} = ${nl1(d)} miljoen.`} }
});
