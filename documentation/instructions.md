# Installation and usage

To set up the development and production environments read the following instructions.

## Setting up the environment variables for development and production environments

1.  Clone the repository.
2.  Go to reservatorapp_projekti/ReservatorApp
3.  Set environment variables:

        Credentials:
        - `DOMAIN`
        - `TENANT_ID`
        - `CLIENT_ID`
        - `CLIENT_SECRET`

        Endpoints:
        - `AA_ENDPOINT=https://login.microsoftonline.com/`
        - `GRAPH_ENDPOINT=https://graph.microsoft.com/`
        - `GRAPH_ENDPOINT_API_VERSION=v1.0`

        Others:
        - `REQUEST_TOKEN`
        - `PORT` is the port your backend server listens to
        - `SOCKETIO_PORT`
        - `BROKER_ADDRESS`
        - `DEV_MONGODB_URI` is used by the backend to connect to a database server. For example if your local database is named `db` the address would be `mongodb://localhost/db`.
        - `MONGODB_URI` is used when the application is run with Docker. It is the same address as `DEV_MONGODB_URI` but you need to replace the `localhost`part with the respective docker container name, in this case with `reservator-mongo`.
4.  Go to channel
5.  Set environment variables:

        - `REQUEST_TOKEN` same as in backends .env
        - `DOMAIN` same as in backends .env
        - `PORT` is the port your channel server listens to
        - `DEV_BASE_URL` is used by the channel to connect to the backend. For example if your backend run in port 5234 the address would be `http://localhost:5234`.
        - `BASE_URL` is used when the application is run with Docker. Replace the `localhost` with the respective container name, in this case with `reservator-backend`.
        - `SECRET` any string

## Development

To run the application locally, install [Node.js](https://nodejs.org) and [Mongodb](https://www.mongodb.com/home) and make sure that the mongodb connection is active.

To run the backend server:

1.  Go to reservatorapp_projekti/ReservatorApp
2.  Run `npm install` to install packages needed by the backend server.
3.  Run `npm run dev` to start the backend server. This will start the server with [Nodemon](https://www.npmjs.com/package/nodemon) which will listen for changes in code and restart the server if necessary.

Then, to run the channel:

1.  Go to channel
2.  Run `npm install` to install packages needed by the channel server.
3.  Run `npm run dev` to start the channel server.

Lastly, to run the frontend:

1.  Go to mock-frontend.
2.  Run `npm install` to install packages needed by the frontend server.
3.  Run `npm start` to start the frontend. Now your application should be running at port 3000.

## Production

Production version of the app is [here](https://reservator.ubikampus.net).

### Setting up the production environment

The production version of the app is run with [Docker](https://www.docker.com/). For Docker, there are two different 'Dockerfiles' which can be found from channel and ReservatorApp directories. These files are for building the backend and channel Docker images. Additionally there is a [docker-compose](https://docs.docker.com/compose) file for running all the images and a [Mongodb](https://www.mongodb.com/home) database inside Docker.

To set up a production environment, run the following commands:

1.  Go to mock-frontend and run `npm run build` to make an production build of the projects frontend. 
2.  The `build` directory is moved automatically from mock-frontend to channel and now the app can be used from channels port.  
3.  When pushing to GitHubs main-branch the CI/CD Pipeline for Docker builds the channels and backends images automatically and pushes them to DockerHub.

Production environment uses currently four different Docker images. One is for Shibboleth, other for watchtower and the rest two for the app itself.
Shibboleth takes care of the users identification and watchtower polls the running images from [DockerHub](https://hub.docker.com/) and updates them if there are changes to the images.

 1. To start the production environment, make sure that the Shibboleth container is up and running with `sudo docker ps`. If it is not running, run `sudo docker-compose up -d` in shibboleth file.
 2. Go to reservator file and run `sudo docker-compose up -d`. Now the app should be up and running. This starts the images for mongoDB, channel and backend.
 
By default the server listen to port 3003. To shut down the production environment, run `sudo docker-compose down` in reservator file. This will stop and remove any containers created by Docker Compose.

## Useful links

### DockerHub

DockerHub is an container image library where the apps images can be found. Images can be changed easily by changing the names/tags of the images from [docker.yml](https://github.com/ohtuprojekti-kokoushuone/kokoushuoneiden-varaaminen/blob/main/.github/workflows/docker.yml), and the projects docker-compose file that can be found from reservator file in production server.

Current images:

 - [Backend image](https://hub.docker.com/r/ojanenma/reservator-backend)
 - [Channel image](https://hub.docker.com/r/ojanenma/reservator)

### Shibboleth

 - [Sp-register](https://sp-registry.it.helsinki.fi/)
 - [Universitys instructions for shibboleth](https://wiki.helsinki.fi/display/IAMasioita/Ohjeet+Shibbolointiin)
 - [Shibboleth-attributes](https://wiki.helsinki.fi/pages/viewpage.action?pageId=226580829)

### Watchtower

- [Instructions](https://containrrr.dev/watchtower/)
- [Docker image](https://hub.docker.com/r/containrrr/watchtower)

### Mocking headers

 - [Mock user](https://github.com/ohtuprojekti-kokoushuone/kokoushuoneiden-varaaminen/blob/main/mock-frontend/src/utils/mockUser.js)
 - [Mock user headers](https://github.com/ohtuprojekti-kokoushuone/kokoushuoneiden-varaaminen/blob/main/mock-frontend/src/utils/api.js)