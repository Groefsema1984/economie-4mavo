# Handleiding docent · Economie 4 MAVO oefenapp

## Wat zit erin (versie 1.0)

- Startscherm met 8 hoofdstukwerelden (H1 t/m H8), allemaal speelbaar, plus de Eindexamentrainer met 183 meerkeuzevragen (2018-2026) per examen, per domein, als sprint en om te printen.
- Per paragraaf een level van 8 vragen (meerkeuze, waar/niet waar, koppelen, rekenen met steeds nieuwe getallen).
  Medailles: brons 6/8, zilver 7/8, goud 8/8. Het volgende level gaat open bij brons.
- Eindtoets per hoofdstuk (15 vragen) zonder cijfer: de leerling ziet hoeveel goed en wat nog geoefend moet worden,
  en maakt de foute vragen opnieuw tot alles goed is. Dan volgt het diploma.
- Vaardigheden: score 0–100 per eindterm en domein (Consumptie, Arbeid en productie, Overheid, Internationaal, Rekenen).
- Herhaalronde: foute vragen komen terug tot ze twee keer goed zijn gemaakt.
- Collectie: begrippenkaarten, badges, munten en kleurthema's.
- Docentendashboard (tegel "Docent", haalt alles live op uit je Google Sheet via de server):
  - Overzicht: kerncijfers, oefentijd per week en per dag, scores per domein, voortgang per wereld, en wie aandacht nodig heeft.
  - Leerlingen: sorteerbare tabel. Klik op een naam voor alles van die leerling: oefentijd, medailles per level,
    eindtoetsen, scores per eindterm, de vragen die het vaakst fout gingen en de examentrainer per examen.
  - Vragen: de moeilijkste vragen van de groep (percentage fout), per wereld te filteren, plus de rekensommen.
  - Eindtermen: kleurentabel van alle leerlingen per eindterm, en de eindtermen van zwak naar sterk.
  - Examentrainer: per leerling en per examen hoeveel vragen beheerst zijn, en het sprintrecord.
  - Filter op Econ1 of Econ2, vernieuwen, CSV voor Excel en afdrukken.

## Zo raakt er niets kwijt

1. Elke tik wordt direct op de iPad bewaard (met een reservekopie).
2. Na een paar seconden gaat de voortgang naar jouw Google Sheet. Zonder internet probeert de app het later opnieuw.
3. Elke leerling krijgt bij de start een **speler-ID** en een **herstelcode** (6 cijfers). Nieuwe iPad, Safari gewist,
   of app opnieuw op het beginscherm gezet: "Ik heb al een account" en alles komt terug.
4. De server neemt nooit een oudere stand over een nieuwere heen.

Na 10 foute herstelpogingen wordt een account geblokkeerd. Vrijgeven: zet in het tabblad *Spelers* de kolom
"Mislukte herstelpogingen" op 0.

## Server installeren (eenmalig, ongeveer 10 minuten, gratis)

1. Ga naar sheets.google.com en maak een nieuwe lege spreadsheet, bijvoorbeeld "Economie 4M – server". Deel hem met niemand.
2. Kies **Extensies > Apps Script**. Verwijder de voorbeeldcode en plak de inhoud van `server/Code.gs`. Klik op Opslaan.
3. Pas bovenaan `CFG` aan: `DOCENT_CODE` (jouw code voor het docentenscherm) en `KLASSEN` (staat al op de clustergroepen Econ1 en Econ2).
4. Kies de functie **setup** en klik op **Uitvoeren**. Geef toestemming (Geavanceerd > Ga naar … > Toestaan).
   Er verschijnen de tabbladen Spelers, Data en Logboek.
5. **Implementeren > Nieuwe implementatie > Web-app**. Uitvoeren als: *Ikzelf*. Toegang: *Iedereen*. Kopieer de URL (eindigt op `/exec`).
6. Stuur de URL naar Claude. Die zet hem in de app (`DATA_ENDPOINT_URL`) en zet de nieuwe versie online.

Later het script wijzigen: plak de nieuwe code, sla op en kies **Implementeren > Implementaties beheren > potlood >
Versie: Nieuwe versie**. De URL blijft dan gelijk.

Zonder server-URL draait de app in testmodus: alles staat dan alleen op het apparaat.

## Op de iPad (voor leerlingen)

1. Open de link in **Safari**.
2. Tik op het deel-icoon en kies **Zet op beginscherm**.
3. Open de app vanaf het beginscherm en maak daar pas je account aan. Maak een screenshot van je speler-ID en herstelcode.

## Collega

Je collega gebruikt dezelfde link en dezelfde docentcode. In het docentenscherm kies je bovenaan de klas.

## Privacy

In de Sheet staan voor- en achternaam, klas en oefenresultaten. Geen e-mail of leerlingnummer. Stem dit kort af met
de privacyfunctionaris van school.
