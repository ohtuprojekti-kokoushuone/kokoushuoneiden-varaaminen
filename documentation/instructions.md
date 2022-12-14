# Installation and usage

## Development

To run the application locally, you can either run it with [Docker](https://www.docker.com/) or without Docker. Next instructions are needed for both.

1.  Clone the repository.
2.  Go to reservatorapp_projekti/ReservatorApp
3.  Set environment variables:

        Credentials:
        * `DOMAIN`
        * `TENANT_ID`
        * `CLIENT_ID`
        * `CLIENT_SECRET`

        Endpoints:
        * `AA_ENDPOINT=https://login.microsoftonline.com/`
        * `GRAPH_ENDPOINT=https://graph.microsoft.com/`
        * `GRAPH_ENDPOINT_API_VERSION=v1.0`

        Others:
        * `REQUEST_TOKEN`
        * `PORT` is the port your backend server listens to
        * `SOCKETIO_PORT`
        * `BROKER_ADDRESS`
        * `DEV_MONGODB_URI` is used by the backend to connect to a database server. For example if your local database is named `db` the address would be `mongodb://localhost/db`.
        * `MONGODB_URI` is used when the application is run with Docker. It is the same address as `DEV_MONGODB_URI` but you need to replace the `localhost`part with the respective docker container name, in this case with `reservator-mongo`.
4.  Go to channel
5.  Set environment variables:
        * `REQUEST_TOKEN` same as in backends .env
        * `DOMAIN` same as in backends .env
        * `PORT` is the port your channel server listens to
        * `DEV_BASE_URL` is used by the channel to connect to the backend. For example if your backend run in port 5234 the address would be `http://localhost:5234`.
        * `BASE_URL` is used when the application is run with Docker. Replace the `localhost` with the respective container name, in this case with `reservator-backend`.
        * `SECRET` any string

### With Docker

For Docker, there are two different 'Dockerfiles' which can be found from channel and ReservatorApp directories. These files are for building the backend, channel and frontend Docker images. Additionally there is a [docker-compose](https://docs.docker.com/compose) file for running all the images and a [Mongodb](https://www.mongodb.com/home) database inside Docker.

To set uo a local environment, run the following commands:

1.  Go to mock-frontend and run `npm run build` to make an production build of the projects frontend. 
2.  Move the `build` directory from mock-frontend to channel.  
3.  `docker-compose build` to build Docker images for channel, backend and database.
4.  `docker-compose up` to start the server and and Mongodb database.

By default, the server will listen to port 3003.

To shut down the local environment, run `docker-compose down`. This will stop and remove any containers created by Docker Compose.

### Without Docker

To run the application without Docker, install [Node.js](https://nodejs.org) and [Mongodb](https://www.mongodb.com/home) and make sure that the mongodb connection is active.

To run the backend server:

1.  Go to reservatorapp_projekti/ReservatorApp
2.  Run `npm intall` to install packages needed by the backend server.
3.  Run `npm run dev` to start the backend server. This will start the server with [Nodemon](https://www.npmjs.com/package/nodemon) which will listen for changes in code and restart the server if necessary.

Then, to run the channel:

1.  Go to channel
2.  Run `npm install` to install packages needed by the channel server.
3.  Run `npm run dev` to start the channel server.

Lastly, to run the frontend:

1.  Go to mock-frontend.
2.  Run `npm install` to install packages needed by the frontend server.
3.  Run `npm start` to start the frontend. Now your application should be running at port 3000.
