# Helsingin Yliopiston Ohjelmistotuotantoprojekti 

Sovellus Helsingin Yliopiston tietojenkäsittelytieteen osaston kokoushuoneiden varaamiseen (Web/Mobiili)

Sovelluksen avulla käyttäjä voi selata vapaita kokoushuoneita sekä varata niitä 

## Käyttöohje

1. kloonaa repositio ja siirry sen juureen
2. `git pull origin init`
3. aja `DOCKER_BUILDKIT=1 docker build --tag node-docker .`
4. `docker run -d --publish 3001:3001 node-docker`
5. localhost:3001 pitäisi olla hello world
6. pysäytä ajamalla `docker ps` , kopioi CONTAINER ID, aja `docker stop ***insert id***`

## Backlog

[Product Backlog](https://docs.google.com/spreadsheets/d/1FGeKQlvT8PPFWxfDfxmccjPt_a6O4TcFm0E6Ge-Brv8/edit#gid=0)

