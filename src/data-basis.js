// ===== Basisgegevens: domeinen, eindtermen (syllabus economie vmbo GT) en werelden =====
const DOMEINEN = [
  {id:'con', naam:'Consumptie', kleur:'#e07a2f', icoon:'🛒'},
  {id:'arb', naam:'Arbeid en productie', kleur:'#2f7de0', icoon:'🏭'},
  {id:'ovh', naam:'Overheid en belasting', kleur:'#7a4fd6', icoon:'🏛️'},
  {id:'int', naam:'Internationaal', kleur:'#1f9e6e', icoon:'🌍'},
  {id:'rek', naam:'Rekenen', kleur:'#d64f7a', icoon:'🧮'}
];

// Eindterm -> domein. Codes volgen de syllabus (EC/K/.. en EC/V/..), kort genoteerd.
const EINDTERMEN = {
  '4A.1':{d:'con', t:'Keuzes door schaarste'},
  '4A.2':{d:'con', t:'Inkomen en positie als consument'},
  '4A.3':{d:'con', t:'Wat consumptie verandert (o.a. marketing)'},
  '4A.4':{d:'con', t:'Geld en betalingsverkeer'},
  '4A.5':{d:'con', t:'Sparen en lenen'},
  '4A.6':{d:'con', t:'Koopbeslissing en budget'},
  '4A.7':{d:'con', t:'Gevolgen van koopbeslissingen'},
  '4A.8':{d:'con', t:'Huishoudbudget en begroting'},
  'V1.5':{d:'con', t:'Waardeverandering van geld (inflatie)'},
  '5A.1':{d:'arb', t:'Kosten, opbrengsten, winst, btw, ondernemingsvormen'},
  '5A.2':{d:'arb', t:'Arbeidsverdeling en arbeidsproductiviteit'},
  '5A.3':{d:'arb', t:'Betaalde en onbetaalde arbeid'},
  '5A.4':{d:'arb', t:'Werkloosheid'},
  '6.1':{d:'ovh', t:'Taken van de overheid'},
  '6.2':{d:'ovh', t:'Ontvangsten en uitgaven van de overheid'},
  '6.3':{d:'ovh', t:'Sociale zekerheid'},
  'V1.1':{d:'ovh', t:'Begrotingstekort en staatsschuld'},
  'V1.2':{d:'ovh', t:'Loon- en inkomstenbelasting'},
  'V1.3':{d:'ovh', t:'Inkomensverschillen'},
  '7.1':{d:'int', t:'Belang van het buitenland'},
  '7.2':{d:'int', t:'EU en euro'},
  '7.3':{d:'int', t:'Onderontwikkeling en welvaartsverschillen'},
  '7.4':{d:'int', t:'Maatregelen tegen welvaartsverschillen'},
  '7.5':{d:'int', t:'Hulp aan ontwikkelingslanden'},
  'K3.r':{d:'rek', t:'Rekenen: procenten en bedragen'},
  'K3.v':{d:'rek', t:'Rekenen: procentuele verandering en indexcijfers'},
  'K3.t':{d:'rek', t:'Rekenen: omrekenen week, maand en jaar'}
};

// De acht hoofdstukwerelden + de examenwereld. Alleen werelden met vragen zijn speelbaar.
const WERELDEN = [
  {id:'h1', nr:1, naam:'Hoe welvarend ben jij?', icoon:'🛍️', kleur:'#e07a2f'},
  {id:'h2', nr:2, naam:'Geld genoeg', icoon:'💶', kleur:'#d9a521'},
  {id:'h3', nr:3, naam:'Ben jij ondernemend?', icoon:'🚀', kleur:'#2f7de0'},
  {id:'h4', nr:4, naam:'Werk aan de winkel', icoon:'🏪', kleur:'#2fa7c9'},
  {id:'h5', nr:5, naam:'Hoe werkt de overheid?', icoon:'🏛️', kleur:'#7a4fd6'},
  {id:'h6', nr:6, naam:'Iedereen betaalt belasting', icoon:'🧾', kleur:'#a24fd6'},
  {id:'h7', nr:7, naam:'Nederland en het buitenland', icoon:'🚢', kleur:'#1f9e6e'},
  {id:'h8', nr:8, naam:'Ontwikkelingslanden', icoon:'🌍', kleur:'#5a9e1f'}
];

// Wordt per hoofdstuk gevuld door de data-hX.js bestanden
const LEVELS = {}; const GENS_EXTRA = {};   // wereldId -> [{id, naam, kort, vragen:[...], gens:[...]}]
