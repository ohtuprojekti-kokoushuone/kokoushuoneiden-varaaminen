# Asennusohje

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