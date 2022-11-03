const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const roomsRouter = require('./controllers/roomsRouter');
const loginRouter = require('./controllers/loginRouter');
const reservationsRouter = require('./controllers/reservationsRouter');
const usersRouter = require('./controllers/usersRouter');
const { errorHandler } = require('./utils/middleware');
const { log } = require('./utils/logger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/rooms', roomsRouter);
app.use('/api/login', loginRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

app.listen(config.PORT);
log(`Server running on port ${config.PORT}`);
