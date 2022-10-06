# Helsingin Yliopiston Ohjelmistotuotantoprojekti 

Sovellus Helsingin Yliopiston tietojenkäsittelytieteen osaston kokoushuoneiden varaamiseen (Web/Mobiili)

Sovelluksen avulla käyttäjä voi selata vapaita kokoushuoneita sekä varata niitä 

## Asennusohje

1. kloonaa repositorio ja siirry mock-backendiin
2. aja `npm i`
3. aja `npm start`, mock-backend pyörii nyt portissa 3003
4. siirry frontend -hakemistoon
5. aja `npm i`
6. aja `docker build -t sample:dev .`
7. `docker run -it --name kokoushuone-app -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true sample:dev`
8. localhost:3000 pitäisi olla käynnissä, ja näkyä otsikko + nappi
9. pysäytä painamalla CTRL + C
10. tämän jälkeen container on käynnistettävissä ajamalla `npm start`

## Käyttöohje

1. siirry mock-backendiin
2. aja `npm start`
3. siirry frontendiin 
4. aja `npm start`
5. sovellusta voi nyt käyttää osoitteessa localhost:3000

## Dokumentaatio

[Definition of Done](https://docs.google.com/document/d/15tPTE1_v-ni-WlXxEmTRogPBGrpMMk_8MhwXXvJ0bs8/edit)

[Arkkitehtuuri](linkki)


## Projectin eteneminen

[Product Backlog](https://docs.google.com/spreadsheets/d/1FGeKQlvT8PPFWxfDfxmccjPt_a6O4TcFm0E6Ge-Brv8/edit#gid=0)

