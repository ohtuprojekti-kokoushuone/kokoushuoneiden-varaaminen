// Copyright (c) Niko Mäkitalo.
// Licensed under the MIT License.
require('dotenv').config();

var http = require('http');
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const flash = require('connect-flash');

const cors = require('cors');

//const { Server } = require("socket.io");

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var authRouter = require('./src/routes/auth');
var calendarRouter = require('./src/routes/calendar');

var app = express();

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || 4000;
app.set('port', port);
const socketIOport = process.env.SOCKETIO_PORT || 4001;
const broker_address = process.env.BROKER_ADDRESS || '';

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

//const io = new Server(server);

const ioClient = require('socket.io-client');

const socket = ioClient(broker_address);

socket.on('connect', () => {
  console.log('Connected (on connect) to Notification Broker');
});

socket.on('connection', () => {
  console.log('Connected (on connection) to Notification Broker');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Notification Broker');
});

socket.on('connected_to_notification_broker', (calendarUserId) => {
  console.log('Connection verified!', calendarUserId);
});

socket.on('calendar_changed', (calendarUserId) => {
  console.log('Calendar changed!');
  console.log('calendarUserId', calendarUserId);
});

app.use(cors());
// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function (req, res, next) {
  /*
// Read any flashed errors and save
// in the response locals
res.locals.error = req.flash('error_msg');

// Check for simple error string and
// convert to layout's expected format
var errs = req.flash('error');
for (var i in errs){
  res.locals.error.push({message: 'An error occurred', debug: errs[i]});
}

// Check for an authenticated user and load
// into response locals
if (req.session.userId) {
  res.locals.user = app.locals.users[req.session.userId];
}*/

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/calendar', calendarRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('errori');
  next(createError(404));
});

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/

/**
 * Listen on provided port, on all network interfaces.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * not in use at this moment
 */
/*
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
}*/

server.listen(port);
server.on('error', onError);

const connectedCalendarSocketIOClients = {};

const socketServer = require('socket.io')(socketIOport);
socketServer.on('connection', (socket) => {
  socket.on('client_connected', (calendarUserId) => {
    console.log(calendarUserId, 'connected');
    connectedCalendarSocketIOClients[socket.id] = {
      calendarUserId: calendarUserId,
      socket: socket,
      connected: true,
    };
  });

  socket.on('disconnect', function () {
    const client = connectedCalendarSocketIOClients[socket.id];
    if (client && socket === client.socket) {
      connectedCalendarSocketIOClients[socket.id].connected = false;
      console.log(connectedCalendarSocketIOClients[socket.id].calendarUserId + ' disconnected!');
    }
  });
});
