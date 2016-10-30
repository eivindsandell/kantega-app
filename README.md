Dette er en app som i hovedsak skal bruke vegvesenet sitt API for å regne og fremhvise ulykkesstatistikk for en valgt kommune. Den er for øyeblikket ikke ferdig og kan inneholde bugs og eksempler på dårlig kode.

Table of Content
- [Filstruktur](#filstruktur)
- [Kjøre Testbuild](#kjøre-testbuild)
- [Filbeskrivelse](#filbeskrivelse)
  - [Actions](#actions)
  - [Content](#content)
  - [Reducers](#reducers)
  - [Status](#status)
- [Kontakt](#kontakt)
  
  
## Filstruktur

Før en build ser det slik ut:


```
kantega-app/
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    Action/
      actions.js
    Content/
      search.js
      statDisplay.js
      statsComp.js
    Reducer/
      allReducers,js
      ulykkeReducer.js
    Satus/
      status.js
```


## Kjøre testbuild

Last ned repoet til en mappe på pcen. Sørg for at du har node og npm installert. Gå til Kantega-App folderet og kjør:
```
npm install
```
for å installere alle dependecies. Så kjører du:
```
npm start
```
for å kjøre en testbuild. Da vil det åpnes en testserver på localhost:3000


## Filbeskrivelse
Beskrivelse av alle filer inne i src

#### App.js
Denne filen kobler sammen alle komponentene til en samlet app.

#### index.css
Hoved stylesheetet for hele appen

## Actions

#### actions.js
Denne behandlder hendelser som skal endre på reducers. Inneholder også hovedfunkjsonen for å hente ulykker fra APIet
  
## Content
Dette er der hovedinnholdet er. Alt av viewet ligger her
  
#### search.js
Søkebaren som kommer på toppen av siden

#### statDisplay.js
Komponenten der all  logikken om infoen om en kommune blir gjort

#### statsComp.js
Komponent som sendes til statDisplay med all info som skal rendres

## Reducers

#### allReducers.js
Filen som samler alle reducersene

#### ulykkeReducer.js
Reducer for ulykke delene av appen. Har også logikken som sørger for at det kommer en loading animasjon når appen kalkulerer ulykker

## Status

#### status.js
Denne viser når API et til vegvesenet sist ble oppdatert og informerer om at all dataen som blir brukt er hentet fra dette APIet


## Kontakt
Om det er noe du lurer på, eller finner du en bug send meg en melding på github
