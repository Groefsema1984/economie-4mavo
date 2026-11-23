// ===== Hoofdstuk 7: Nederland en het buitenland (bron: 01_KADER_MAVO_4_PINCODE_H7 en 03_REKENREGELS deel 2D/3D) =====
// Leerkoersen: 1 euro = $ 1,10 = £ 0,85 = 11 Noorse kronen.
const BEGRIPPEN_H7 = {
  'Export':'Goederen en diensten die naar het buitenland worden verkocht.',
  'Import':'Goederen en diensten die uit het buitenland worden gekocht.',
  'Wederuitvoer':'Goederen die worden ingevoerd en direct weer worden doorverkocht naar het buitenland.',
  'Nationaal inkomen':'Alle inkomens die in een land in een jaar worden verdiend.',
  'Exportquote':'Exportwaarde : nationaal inkomen × 100%.',
  'Importquote':'Importwaarde : nationaal inkomen × 100%.',
  'Open economie':'Een economie met veel handel in verhouding tot het nationaal inkomen.',
  'Dekkingsgraad':'Exportwaarde : importwaarde × 100%.',
  'Ruilvoet':'De prijzen van de export vergeleken met de prijzen van de import.',
  'Betalingsbalans':'Overzicht van alle ontvangsten uit en betalingen aan het buitenland.',
  'Handelsoverschot':'De export is groter dan de import.',
  'Vreemde valuta':'Geld van een ander land, zoals de dollar of het pond.',
  'Wisselkoers':'De prijs van een munt uitgedrukt in een andere munt.',
  'EU':'Europese Unie: 27 landen die economisch samenwerken.',
  'Interne markt':'Vrij verkeer van goederen, diensten, personen en kapitaal binnen de EU.',
  'Harmonisatie':'Regels en tarieven in de EU zoveel mogelijk gelijk maken.',
  'EMU':'Europese Monetaire Unie: de landen met de euro.',
  'Eurozone':'De landen die de euro als munt hebben.',
  'Prijsstabiliteit':'Een inflatie van ongeveer 2%. Hoofdtaak van de ECB.',
  'Protectie':'Maatregelen om de eigen economie te beschermen tegen buitenlandse concurrentie.',
  'Invoerrechten':'Belasting op buitenlandse producten, waardoor ze duurder worden.',
  'Contingentering':'Er mag maar een beperkte hoeveelheid worden ingevoerd (importquota).',
  'Invoerverbod':'Bepaalde goederen mogen helemaal niet worden ingevoerd.',
  'Exportsubsidie':'Subsidie aan eigen exporteurs zodat ze goedkoper kunnen verkopen.',
  'Vrijhandel':'Handel zonder belemmeringen.',
  'Handelsverdrag':'Afspraken tussen landen over handel, zoals lagere invoerrechten.',
  'WTO':'Wereldhandelsorganisatie: maakt handel vrijer en eerlijker.',
  'Handelsconsulaat':'Kantoor in het buitenland dat Nederlandse bedrijven helpt met exporteren.',
  'Globalisering':'De wereld wordt kleiner: landen zijn steeds meer met elkaar verbonden.',
  'Internationale arbeidsverdeling':'Landen specialiseren zich en ruilen met elkaar.',
  'Specialisatie':'Je richt je op het product waar je relatief het beste in bent.',
  'Concurrentiepositie':'Hoe goed een land kan concurreren met andere landen.'
};

LEVELS.h7 = [
 {id:'h7.0', naam:'Weet je het nog?', kort:'Voorkennis handel', vragen:[
  {id:'h7.0.01', t:'koppel', e:'7.1', q:'Koppel het begrip aan de omschrijving.', p:[['Export','Verkopen aan het buitenland'],['Import','Kopen uit het buitenland'],['Vreemde valuta','Geld van een ander land']], u:'Export = uitvoer, import = invoer.'},
  {id:'h7.0.02', t:'mc', e:'7.1', b:'Nationaal inkomen', q:'Wat is het nationaal inkomen?', o:['Alle inkomens die in een land in een jaar worden verdiend','Het geld van de overheid','De export van een land','Het gemiddelde loon'], a:0, u:'Het nationaal inkomen gebruik je bij de export- en importquote.'},
  {id:'h7.0.03', t:'mc', e:'K3.r', q:'Nederland voert 2.000 ton bananen in voor € 900 per ton. Wat is de invoerwaarde?', o:['€ 1.800.000','€ 2.900','€ 180.000','€ 2,22'], a:0, u:'Invoerwaarde = hoeveelheid × prijs = 2.000 × 900 = € 1.800.000.'},
  {id:'h7.0.04', t:'mc', e:'7.1', b:'Vrijhandel', q:'Wat is vrijhandel?', o:['Handel zonder belemmeringen','Handel zonder geld','Gratis producten uit het buitenland','Handel alleen binnen Nederland'], a:0, u:'Geen invoerrechten, quota of verboden.'},
  {id:'h7.0.05', t:'wo', e:'7.2', q:'De ECB is de centrale bank van de landen met de euro.', a:true, u:'Europese Centrale Bank.'},
  {id:'h7.0.06', t:'mc', e:'7.1', q:'Wat zijn importheffingen?', o:['Belastingen op producten uit het buitenland','Subsidies voor exporteurs','Kosten van een bankrekening','Lonen van buitenlandse werknemers'], a:0, u:'Importheffingen maken buitenlandse producten duurder.'},
  {id:'h7.0.07', t:'mc', e:'7.1', b:'Betalingsbalans', q:'Op de betalingsbalans staan ...', o:['alle ontvangsten uit en betalingen aan het buitenland','alleen de inkomsten van de overheid','alle schulden van gezinnen','alle lonen in Nederland'], a:0, u:'Goederen, diensten, toerisme, lonen en meer.'},
  {id:'h7.0.08', t:'mc', e:'K3.r', q:'Nederland voert 500 machines uit voor € 4.000 per stuk. Wat is de uitvoerwaarde?', o:['€ 2.000.000','€ 4.500','€ 200.000','€ 8'], a:0, u:'Uitvoerwaarde = hoeveelheid × prijs = 500 × 4.000 = € 2.000.000.'}
 ], gens:['handelswaarde']},
 {id:'h7.1', naam:'7.1 Nederland handelsland', kort:'Quotes, betalingsbalans en valuta', vragen:[
  {id:'h7.1.01', t:'mc', e:'7.1', b:'Wederuitvoer', q:'Rotterdam voert televisies uit China in en verkoopt ze direct door aan Duitsland. Dit heet ...', o:['wederuitvoer','import','protectie','harmonisatie'], a:0, u:'Wederuitvoer: invoeren en direct weer uitvoeren.'},
  {id:'h7.1.02', t:'mc', e:'7.1', q:'Welke reden om te importeren hoort bij koffie?', o:['Het kan in ons klimaat niet groeien','Het is in Nederland goedkoper','Nederlanders willen geen koffie','Er is een invoerverbod'], a:0, u:'Andere redenen: grondstoffen ontbreken, buitenlands is goedkoper of beter, meer keuze.'},
  {id:'h7.1.03', t:'mc', e:'K3.r', b:'Exportquote', q:'Exportwaarde € 650 miljard, nationaal inkomen € 1.000 miljard. Wat is de exportquote?', o:['65,0%','153,8%','6,5%','35,0%'], a:0, u:'Exportquote = 650 : 1.000 × 100% = 65,0%.'},
  {id:'h7.1.04', t:'mc', e:'7.1', b:'Open economie', q:'Nederland heeft een hoge exportquote en importquote. We noemen Nederland daarom ...', o:['een open economie','een gesloten economie','een planeconomie','een ontwikkelingsland'], a:0, u:'Veel handel in verhouding tot het nationaal inkomen = open economie.'},
  {id:'h7.1.05', t:'mc', e:'K3.r', b:'Dekkingsgraad', q:'Export € 655 miljard, import € 582 miljard. Hoe bereken je de dekkingsgraad?', o:['655 : 582 × 100%','582 : 655 × 100%','655 − 582','655 : 1.000 × 100%'], a:0, u:'Dekkingsgraad = export : import × 100% = 112,5%. Hij mag boven de 100% uitkomen.'},
  {id:'h7.1.06', t:'mc', e:'7.1', b:'Handelsoverschot', q:'Nederland exporteert meer goederen dan het importeert. Dit heet ...', o:['een handelsoverschot','een handelstekort','een begrotingstekort','wederuitvoer'], a:0, u:'Meer export dan import = handelsoverschot.'},
  {id:'h7.1.07', t:'koppel', e:'7.1', q:'Ontvangst of uitgave op de Nederlandse betalingsbalans?', p:[['Duitse toeristen overnachten in Zeeland','Ontvangst'],['Nederlanders gaan op vakantie in Spanje','Uitgave'],['Een Nederlander werkt in België en krijgt daar loon','Ontvangst'],['Een Pools bedrijf krijgt betaald voor werk in Nederland','Uitgave']], u:'Geld dat Nederland binnenkomt = ontvangst.'},
  {id:'h7.1.08', t:'mc', e:'7.1', b:'Wisselkoers', q:'De koers van de euro stijgt ten opzichte van de dollar. Wat gebeurt er met onze export naar de VS?', o:['Die wordt duurder voor Amerikanen','Die wordt goedkoper voor Amerikanen','Er verandert niets','Die wordt verboden'], a:0, u:'Euro omhoog = onze export duurder, import goedkoper. Denk aan een wip.'},
  {id:'h7.1.09', t:'mc', e:'K3.r', q:'Leerkoers: 1 euro = $ 1,10. Een spijkerbroek in New York kost $ 55. Hoeveel euro is dat?', o:['€ 50,00','€ 60,50','€ 55,00','€ 49,50'], a:0, u:'Naar euro: delen door de koers. 55 : 1,10 = € 50,00.'},
  {id:'h7.1.10', t:'mc', e:'K3.r', q:'Leerkoers: 1 euro = £ 0,85. Je wisselt € 200 om naar ponden. Hoeveel pond krijg je?', o:['£ 170,00','£ 235,29','£ 200,00','£ 185,00'], a:0, u:'Vanuit euro: keer de koers. 200 × 0,85 = £ 170,00.'},
  {id:'h7.1.11', t:'mc', e:'7.1', b:'Ruilvoet', q:'Wat zegt de ruilvoet?', o:['Hoe de prijzen van de export zich verhouden tot de prijzen van de import','Hoeveel een land exporteert','Hoe hoog de wisselkoers is','Hoeveel invoerrecht een land heft'], a:0, u:'De ruilvoet hoef je niet te berekenen, alleen te begrijpen.'},
  {id:'h7.1.12', t:'mc', e:'K3.r', b:'Importquote', q:'Importwaarde € 580 miljard, nationaal inkomen € 1.000 miljard. Wat is de importquote?', o:['58,0%','172,4%','5,8%','42,0%'], a:0, u:'Importquote = importwaarde : nationaal inkomen × 100% = 580 : 1.000 × 100% = 58,0%.'}
 ], gens:['quote','dekkingsgraad','naarEuro','vanEuro','betalingsbalans']},
 {id:'h7.2', naam:'7.2 Nederland en de EU', kort:'Interne markt, euro en ECB', vragen:[
  {id:'h7.2.01', t:'mc', e:'7.2', b:'Interne markt', q:'Wat hoort niet bij de interne markt van de EU?', o:['Vrij verkeer van belastingen','Vrij verkeer van goederen en diensten','Vrij verkeer van personen','Vrij verkeer van kapitaal'], a:0, u:'De vier vrijheden: goederen, diensten, personen en kapitaal.'},
  {id:'h7.2.02', t:'mc', e:'7.2', b:'Harmonisatie', q:'Alle EU-landen hebben dezelfde veiligheidseisen voor speelgoed. Dit heet ...', o:['harmonisatie','protectie','contingentering','wederuitvoer'], a:0, u:'Harmonisatie = regels zoveel mogelijk gelijk maken.'},
  {id:'h7.2.03', t:'wo', e:'7.2', q:'Alle EU-landen hebben precies hetzelfde btw-tarief.', a:false, u:'Nederland heeft 21% btw, Duitsland 19%. De EU maakt alleen afspraken om ze dichter bij elkaar te brengen.'},
  {id:'h7.2.04', t:'wo', e:'7.2', b:'EU', q:'Alle landen van de EU hebben de euro.', a:false, u:'De EU heeft 27 landen, de eurozone 21.'},
  {id:'h7.2.05', t:'mc', e:'7.2', b:'EMU', q:'Wat is een voordeel van de euro voor bedrijven in de eurozone?', o:['Geen wisselkoersrisico en geen wisselkosten','Geen invoerrechten binnen de EU','Hogere prijzen','Meer belasting'], a:0, u:'Let op: geen invoerrechten komt door de interne markt, niet door de euro.'},
  {id:'h7.2.06', t:'mc', e:'7.2', b:'Eurozone', q:'Waar moet een land onder meer aan voldoen om de euro te krijgen?', o:['Het begrotingstekort en de inflatie mogen niet te hoog zijn','Het moet een grote export hebben','Het moet buiten Europa liggen','Het moet een monopolie hebben'], a:0, u:'Ook de staatsschuld ten opzichte van het nationaal inkomen telt mee.'},
  {id:'h7.2.07', t:'mc', e:'7.2', b:'Prijsstabiliteit', q:'Wat is de belangrijkste taak van de ECB?', o:['Zorgen voor prijsstabiliteit (inflatie rond 2%)','Belasting innen in de EU','Wegen aanleggen','Lonen vaststellen'], a:0, u:'Daarvoor bepaalt de ECB de rente.'},
  {id:'h7.2.08', t:'mc', e:'7.2', q:'De inflatie in de eurozone is veel te hoog. Wat doet de ECB?', o:['De rente verhogen','De rente verlagen','De belasting verhogen','Meer geld drukken'], a:0, u:'Rente omhoog → lenen duurder → minder bestedingen → inflatie daalt.'},
  {id:'h7.2.09', t:'koppel', e:'7.2', q:'Koppel het begrip aan de omschrijving.', p:[['EU','Samenwerking van 27 Europese landen'],['EMU','De landen met de euro'],['Interne markt','Vrij verkeer van goederen, diensten, personen en kapitaal']], u:'De EMU is een deel van de EU.'},
  {id:'h7.2.10', t:'mc', e:'7.2', q:'Een EU-land geeft zijn eigen bedrijven veel subsidie, zodat ze goedkoper zijn dan concurrenten uit andere EU-landen. De EU wil dit tegengaan, want het is ...', o:['concurrentievervalsing','harmonisatie','vrijhandel','prijsstabiliteit'], a:0, u:'Subsidies kunnen de concurrentie oneerlijk maken.'}
 ], gens:['btwVerschil']},
 {id:'h7.3', naam:'7.3 Kunnen wij vrijhandelen?', kort:'Protectie, vrijhandel en WTO', vragen:[
  {id:'h7.3.01', t:'koppel', e:'7.1', b:'Protectie', q:'Koppel de protectiemaatregel aan de omschrijving.', p:[['Invoerrechten','Een belasting op buitenlandse producten'],['Contingentering','Maar een beperkte hoeveelheid mag erin'],['Invoerverbod','Het product mag helemaal niet erin'],['Exportsubsidie','Geld voor eigen exporteurs']], u:'Allemaal maatregelen om de eigen economie te beschermen.'},
  {id:'h7.3.02', t:'mc', e:'7.1', b:'Contingentering', q:'De EU laat per jaar maar 10.000 ton Chinees staal toe. Welke maatregel is dit?', o:['Contingentering','Invoerrechten','Exportsubsidie','Harmonisatie'], a:0, u:'Een maximum hoeveelheid = contingentering (importquota).'},
  {id:'h7.3.03', t:'mc', e:'K3.r', b:'Invoerrechten', q:'Een fiets uit China kost € 300. Er komt 15% invoerrecht bij. Wat is de prijs met invoerrecht?', o:['€ 345','€ 315','€ 300','€ 450'], a:0, u:'Invoerrecht = 300 : 100 × 15 = € 45. Prijs = 300 + 45 = € 345. Niet € 15 erbij!'},
  {id:'h7.3.04', t:'mc', e:'7.1', q:'Wat is een voordeel van vrijhandel voor consumenten?', o:['Meer keuze en lagere prijzen door concurrentie','Minder keuze','Hogere prijzen','Minder concurrentie'], a:0, u:'Bedrijven hebben meer afzet, consumenten meer keuze.'},
  {id:'h7.3.05', t:'mc', e:'7.1', b:'Handelsverdrag', q:'Wat staat er meestal in een handelsverdrag?', o:['Afspraken over lagere invoerrechten en eisen aan producten','De hoogte van alle lonen','Het btw-tarief van Nederland','De rente van de ECB'], a:0, u:'Ook eisen voor arbeidsomstandigheden en milieu.'},
  {id:'h7.3.06', t:'mc', e:'7.1', b:'WTO', q:'Wat is het doel van de WTO?', o:['Handel tussen landen vrijer en eerlijker maken','Ontwikkelingshulp geven','De euro beheren','Belasting heffen'], a:0, u:'Ruim 160 landen zijn lid van de WTO.'},
  {id:'h7.3.07', t:'wo', e:'7.1', b:'Exportsubsidie', q:'Een exportsubsidie maakt buitenlandse producten duurder.', a:false, u:'Een exportsubsidie maakt eigen producten goedkoper in het buitenland.'},
  {id:'h7.3.08', t:'mc', e:'7.1', b:'Handelsconsulaat', q:'Een Nederlands bedrijf wil gaan exporteren naar Brazilië. Wie kan helpen?', o:['Een handelsconsulaat','De WTO','De ECB','Het CBS'], a:0, u:'Een handelsconsulaat helpt bedrijven in het buitenland.'},
  {id:'h7.3.09', t:'mc', e:'K3.r', q:'Je bestelt een pakketje van buiten de EU met 4 soorten producten. Sinds juli 2026 betaal je € 3,00 invoerrecht per productsoort. Hoeveel invoerrecht?', o:['€ 12,00','€ 3,00','€ 7,00','€ 4,00'], a:0, u:'Aantal productsoorten × € 3,00 = 4 × 3 = € 12,00.'},
  {id:'h7.3.10', t:'mc', e:'7.1', b:'Invoerverbod', q:'Waarom nemen landen protectiemaatregelen?', o:['Om de eigen bedrijven te beschermen tegen buitenlandse concurrentie','Om producten goedkoper te maken','Om meer te importeren','Om de inflatie te verhogen'], a:0, u:'Protectie beschermt de eigen economie.'}
 ], gens:['invoerrecht']},
 {id:'h7.4', naam:'7.4 De wereld wordt kleiner', kort:'Globalisering en concurrentie', vragen:[
  {id:'h7.4.01', t:'mc', e:'7.1', b:'Globalisering', q:'Waardoor neemt de globalisering toe?', o:['Betere communicatie en goedkoper transport','Meer invoerverboden','Minder internet','Hogere invoerrechten'], a:0, u:'Technologische ontwikkeling maakt de wereld kleiner.'},
  {id:'h7.4.02', t:'mc', e:'7.1', b:'Internationale arbeidsverdeling', q:'De accu van een e-bike komt uit China, het frame uit Taiwan en de motor uit Duitsland. Dit is ...', o:['internationale arbeidsverdeling','protectie','harmonisatie','contingentering'], a:0, u:'Landen specialiseren zich in een deel van de productie.'},
  {id:'h7.4.03', t:'mc', e:'7.1', b:'Specialisatie', q:'Waarom levert specialisatie meer welvaart op?', o:['Elk land maakt waar het relatief het beste in is, samen wordt er meer gemaakt','Elk land maakt alles zelf','Er wordt minder gehandeld','De prijzen stijgen'], a:0, u:'Door te ruilen ontstaat ruilvoordeel.'},
  {id:'h7.4.04', t:'wo', e:'7.1', q:'Een land dat in beide producten beter is, heeft geen voordeel van specialisatie.', a:false, u:'Ook dan loont het om het product te maken waar je in verhouding het meest beter in bent.'},
  {id:'h7.4.05', t:'mc', e:'7.1', b:'Concurrentiepositie', q:'Wat helpt Nederland om een goede concurrentiepositie te houden?', o:['Goed onderwijs en innovatie','Hogere invoerrechten','Minder infrastructuur','Lagere kwaliteit'], a:0, u:'Ook goede gezondheidszorg en infrastructuur.'},
  {id:'h7.4.06', t:'mc', e:'7.1', q:'Wat is een nadeel van globalisering voor Nederland?', o:['Productiewerk verhuist naar lagelonenlanden','Er komen meer producten','De prijzen dalen','Er is meer keuze'], a:0, u:'Laagopgeleid productiewerk verdwijnt.'},
  {id:'h7.4.07', t:'mc', e:'7.1', q:'Welk nadeel van globalisering gaat over het milieu?', o:['Meer transport geeft meer uitstoot','Er komen meer banen','Producten worden goedkoper','Er is meer concurrentie'], a:0, u:'Toenemende handel en transport belasten het milieu.'},
  {id:'h7.4.08', t:'wo', e:'7.1', q:'Door globalisering wordt de welvaart in de wereld eerlijker verdeeld.', a:false, u:'De welvaart is erg ongelijk verdeeld. Landen met een slechte concurrentiepositie raken verder achterop.'},
  {id:'h7.4.09', t:'koppel', e:'7.1', q:'Voordeel of nadeel van globalisering?', p:[['Meer keuze in de winkel','Voordeel'],['Fabrieken verhuizen naar lagelonenlanden','Nadeel'],['Lagere prijzen door concurrentie','Voordeel'],['Meer uitstoot door transport','Nadeel']], u:'Globalisering heeft twee kanten.'}
 ]},
 {id:'h7.r', naam:'Rekenlab H7', kort:'Alle rekenregels', vragen:[], gens:['handelswaarde','quote','dekkingsgraad','naarEuro','vanEuro','betalingsbalans','btwVerschil','invoerrecht']}
];
LEVELS.h7.begrippen = BEGRIPPEN_H7;

const KOERS = [{m:'Amerikaanse dollar',t:'$',k:1.10},{m:'Britse pond',t:'£',k:0.85},{m:'Noorse kronen',t:'',k:11}];
const valuta = (v,x) => v.t? `${v.t} ${x.toFixed(2).replace('.',',')}` : `${x.toFixed(2).replace('.',',')} kronen`;
Object.assign(GENS_EXTRA, {
  handelswaarde(){ const h=pick([200,500,1200,2500,4000]), p=pick([15,45,120,350,900]); const wat=pick(['ton kabeljauw','containers bloemen','machines','ton kaas']); const ex=Math.random()<0.5; return {t:'reken', e:'7.1', q:`Nederland voert ${gt(h)} ${wat} ${ex?'uit':'in'} voor ${eur(p)} per eenheid. Wat is de ${ex?'uitvoerwaarde':'invoerwaarde'}?`, a:h*p, eh:'€', u:`${ex?'Uitvoerwaarde':'Invoerwaarde'} = hoeveelheid × prijs = ${gt(h)} × ${eur(p)} = ${eur(h*p)}.`} },
  quote(){ const ni=pick([800,900,1000,1100]), w=Math.round(ni*pick([0.45,0.55,0.62,0.7,0.78])); const ex=Math.random()<0.5; const p=Math.round(w/ni*1000)/10; return {t:'reken', e:'7.1', q:`De ${ex?'exportwaarde':'importwaarde'} van een land is € ${w} miljard en het nationaal inkomen € ${gt(ni)} miljard. Wat is de ${ex?'exportquote':'importquote'}? (1 decimaal)`, a:p, eh:'%', u:`${ex?'Exportquote':'Importquote'} = ${w} : ${gt(ni)} × 100% = ${nl1(p)}%. Deel altijd door het nationaal inkomen.`} },
  dekkingsgraad(){ const i=pick([400,500,580,620]), e=Math.round(i*pick([0.9,0.95,1.08,1.12,1.2])); const p=Math.round(e/i*1000)/10; return {t:'reken', e:'7.1', q:`De export is € ${e} miljard en de import € ${i} miljard. Wat is de dekkingsgraad? (1 decimaal)`, a:p, eh:'%', u:`Dekkingsgraad = export : import × 100% = ${e} : ${i} × 100% = ${nl1(p)}%.`} },
  naarEuro(){ const v=pick(KOERS); const e=pick([20,45,80,150,240]); const b=Math.round(e*v.k*100)/100; return {t:'reken', e:'7.2', q:`Leerkoers: 1 euro = ${valuta(v,v.k)}. Iets kost ${valuta(v,b)}. Hoeveel euro is dat?`, a:e, eh:'€', u:`Naar euro: delen door de koers. ${b.toFixed(2).replace('.',',')} : ${v.k.toFixed(2).replace('.',',')} = ${eur(e)}.`} },
  vanEuro(){ const v=pick(KOERS); const e=pick([25,50,120,200,350]); const b=Math.round(e*v.k*100)/100; return {t:'reken', e:'7.2', q:`Leerkoers: 1 euro = ${valuta(v,v.k)}. Je wisselt ${eur(e)} om naar ${v.m}. Hoeveel krijg je? (alleen het getal, 2 decimalen)`, a:b, eh:'', u:`Vanuit euro: keer de koers. ${gt(e)} × ${v.k.toFixed(2).replace('.',',')} = ${valuta(v,b)}.`} },
  betalingsbalans(){ const o=pick([520,600,655,700]), u=o+pick([-60,-30,20,45]); const s=o-u; return {t:'reken', e:'7.1', q:`De ontvangsten uit het buitenland zijn € ${o} miljard en de uitgaven aan het buitenland € ${u} miljard. Wat is het saldo van de betalingsbalans in miljard? (een tekort is negatief)`, a:s, eh:'', u:`Saldo = ontvangsten − uitgaven = ${o} − ${u} = ${s} miljard. ${s>=0?'Een overschot.':'Een tekort.'}`} },
  btwVerschil(){ const p=pick([200,400,600,800,1000]); const nl=p*0.21, de=p*0.19; return {t:'reken', e:'7.2', q:`Een televisie kost zonder btw ${eur(p)}. In Nederland is de btw 21%, in Duitsland 19%. Hoeveel euro is de televisie in Nederland duurder?`, a:Math.round((nl-de)*100)/100, eh:'€', u:`Btw NL = ${eur(p)} : 100 × 21 = ${eur(nl)}. Btw DE = ${eur(p)} : 100 × 19 = ${eur(de)}. Verschil = ${eur(nl-de)}.`} },
  invoerrecht(){ const p=pick([40,80,150,300,600]), r=pick([5,10,12,15,25]); const ir=p*r/100; return {t:'reken', e:'7.1', q:`Een product van buiten de EU kost ${eur(p)}. Er komt ${r}% invoerrecht bij. Wat is de prijs met invoerrecht?`, a:p+ir, eh:'€', u:`Invoerrecht = ${eur(p)} : 100 × ${r} = ${eur(ir)}. Prijs = ${eur(p)} + ${eur(ir)} = ${eur(p+ir)}.`} }
});
