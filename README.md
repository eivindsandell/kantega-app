Dette er en app som i hovedsak skal bruke vegvesenet sitt API for å regne og fremhvise ulykkesstatistikk for en valgt kommune

Table of Content
- [Filstruktur](#filstruktur)
- [Kjøre Testbuild](#kjøre-testbuild)


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
    Reducer/
      allReducers,js
      ulykkeReducer.js
    Satus/
      status.js
```


## Kjøre testbuild

Last ned repoet til en mappe på pcen. Sørg for at du har node og npm installert. Gå til Kantega-App folderet og kjør:
```
### npm install
```
for å installere alle dependecies. Så kjører du:
```
### npm start
```
for å kjøre en testbuild. Da vil det åpnes en testserver på localhost:3000
