# Helsingin Yliopiston Ohjelmistotuotantoprojekti 

Sovellus Helsingin Yliopiston tietojenkäsittelytieteen osaston kokoushuoneiden varaamiseen (Web/Mobiili)

Sovelluksen avulla käyttäjä voi selata vapaita kokoushuoneita sekä varata niitä 

## Käyttöohje

1. kloonaa repositorio ja siirry mock-backend
2. aja `npm start`, mock backend pyörii nyt portissa 3003
3. siirry sample -hakemistoon
4. aja `docker build -t sample:dev .`
5. `docker run -it --name kokoushuone-app -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true sample:dev`
6. localhost:3000 pitäisi olla käynnissä, ja näkyä otsikko + nappi
7. pysäytä painamalla CTRL + C
8. tämän jälkeen container on käynnistettävissä ajamalla `docker start -i kokoushuone-app`

## Backlog

[Product Backlog](https://docs.google.com/spreadsheets/d/1FGeKQlvT8PPFWxfDfxmccjPt_a6O4TcFm0E6Ge-Brv8/edit#gid=0)

