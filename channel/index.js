const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./utils/config');
const roomsRouter = require('./controllers/roomsRouter');
const reservationsRouter = require('./controllers/reservationsRouter');
const usersRouter = require('./controllers/usersRouter');
const { errorHandler } = require('./utils/middleware');
const { log } = require('./utils/logger');
const { url } = require('inspector');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/rooms', roomsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/users', usersRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  const userInfo = {
    uid: req.headers.uid,
    mail: req.headers.mail,
    givenname: req.headers.givenname,
    sn: req.headers.sn,
    studentID: req.headers.hypersonstudentid,
    employeenumber: req.headers.employeenumber,
    hyGroupCn: req.headers.hygroupcn,
  };
  console.log('USER INFO: ', userInfo);
  console.log('SHIBBOLETH HEADERS: ', req.headers);
});

app.use(errorHandler);

app.listen(config.PORT);
log(`Server running on port ${config.PORT}`);
