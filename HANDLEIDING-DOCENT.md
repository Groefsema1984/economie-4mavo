# Handleiding docent · Economie 4 MAVO oefenapp

## Wat zit erin (versie 2.0)

Nergens in de app staan cijfers. Leerlingen zien alleen hoeveel ze goed hebben (of hoeveel punten) en wat ze nog moeten oefenen.

**Oefenen per hoofdstuk**
- Startscherm met 8 hoofdstukwerelden (H1 t/m H8). Per paragraaf een level van 8 vragen (meerkeuze, waar/niet waar,
  koppelen, rekenen met steeds nieuwe getallen). Medailles: brons 6/8, zilver 7/8, goud 8/8.
- Voor elk level staat eerst een korte uitleg met de belangrijkste begrippen (de eerste keer automatisch, daarna via de knop).
- Per hoofdstuk een extra level **Examenbegrippen** met begrippen die in het examen voorkomen maar nog niet in de levels zaten.
- Eindtoets per hoofdstuk (15 vragen): aantal goed en wat nog oefenen, foute vragen opnieuw tot alles goed is. Dan volgt het diploma.

**Leren (nieuw menu)**
- **Slim oefenen**: de app kiest zelf vragen uit de zwakste onderwerpen. Bij een fout volgt soms een steunvraag.
- **Top 5 examenonderwerpen**: de vijf onderwerpen die samen ruim de helft van de examenpunten opleveren (kosten en winst,
  sparen en lenen, belang van het buitenland, betaalde en onbetaalde arbeid, werkloosheid). Per onderwerp 10 vragen
  (half oefenvragen, half echte examenvragen) of een **Top 5 mix** van 15 vragen, waarin grote en zwakke onderwerpen vaker terugkomen.
- **Flitskaarten**: begrippen met herhaling op slimme momenten (na 1, 3, 7, 14, 30 en 60 dagen).
- **Foutenschrift**: alle fout gemaakte vragen per onderwerp, met uitleg.
- **Formulekaart**: de 19 formules die mavo-leerlingen moeten kennen, met rekenregels.
- **Grafiektraining**: klikken in grafieken (evenwicht, vraag- en aanbodlijn, verschuivingen, maximum- en minimumprijs, Lorenzcurve).
- **Proeftoets per hoofdstuk**: 15 vragen op tijd (ongeveer 1 minuut per vraag), pas aan het eind zien wat goed was.

**Eindexamentrainer**
- Alle vragen uit de centrale examens 2018-2026 (eerste en tweede tijdvak): meerkeuze én open vragen, met de bronnen
  als afbeelding. Per examen, per domein, als sprint (alleen automatisch nakijkbare vragen) en om te printen
  (leerlingversie en docentversie met correctievoorschrift).
- Open vragen kijkt de leerling zelf na met het correctievoorschrift. Bij rekenvragen en invulvragen kijkt de app
  zelf na waar dat kan; anders geeft de leerling zichzelf de punten per deelscore.
- **Examen op tijd**: een heel examen in 120 minuten. De uitslag toont punten per domein en wat nog oefenen. Geen cijfer.

**Kern, methode en verdieping**
- Elk begrip hoort bij een laag: 🎯 kern (examenstof), 📘 methode (nodig voor de schooltoets) of 🔭 verdieping (extra).
  De indeling komt uit de analyse van de examens 2018-2026 en staat in `src/lagen.txt`.
- **Toetsmodus** (standaard): kern en methode. **Examenmodus**: alleen kernbegrippen. Verdieping zet de leerling zelf aan.
- Je stelt de modus per klas in op het tabblad *Klassikaal* in het docentenscherm. Leerlingen kunnen het zelf nog aanpassen.
- Een begrip naar een andere laag zetten: pas de regel `begrip = k` (of `m`, `v`) aan in `src/lagen.txt` en laat Claude de app opnieuw bouwen.

**Overig**
- Vaardigheden: score 0–100 per eindterm en domein (Consumptie, Arbeid en productie, Overheid, Internationaal, Rekenen).
- Herhaalronde: foute vragen komen terug tot ze twee keer goed zijn gemaakt.
- Collectie: begrippenkaarten, badges, munten en kleurthema's. Ranglijst op geoefende tijd.

**Docentendashboard** (tegel "Docent", haalt alles live op uit je Google Sheet via de server)
- Overzicht: oefentijd per week en per dag, scores per domein, voortgang per wereld, en wie aandacht nodig heeft.
- Leerlingen: sorteerbare tabel. Klik op een naam voor alles van die leerling, ook het foutenschrift, de proeftoetsen
  en de examens op tijd.
- **Klassikaal** (nieuw): de zwakste onderwerpen van de klas (met de namen van wie nog onder de 50 zit), de vragen die
  veel leerlingen fout hadden, de proeftoetsen (gemiddeld aantal goed), examens op tijd (punten), de oefenmodus per klas
  hoeveel procent van de kernbegrippen de klas al beheerst en de klasscore op de top 5 examenonderwerpen.
- Vragen, Eindtermen en Examentrainer zoals voorheen.
- Filter op Econ1 of Econ2, vernieuwen, CSV voor Excel en afdrukken.

### Nieuwe server-code zetten (nodig voor versie 2.0)

Versie 2.0 bewaart meer per leerling en kent de instelling "oefenmodus per klas". Zet daarom één keer de nieuwe code online:

1. Open je spreadsheet "Economie 4M – server" en kies **Extensies > Apps Script**.
2. Vervang alle code door de inhoud van `server/Code.gs` en klik op Opslaan.
3. Kies de functie **setup** en klik op **Uitvoeren** (dit voegt de extra kolommen in het tabblad Data toe; er gaat niets verloren).
4. **Implementeren > Implementaties beheren > potlood > Versie: Nieuwe versie > Implementeren.** De URL blijft gelijk.

Tot je dit doet werkt de app gewoon, maar kun je de oefenmodus per klas nog niet instellen.

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
