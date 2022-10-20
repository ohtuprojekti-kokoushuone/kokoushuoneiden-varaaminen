const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const calendarService = require('./services/calendarService');
const { checkAvailability } = require('./services/calendarService');
const { getAvailableTimeAfter } = require('./services/functions');
const config = require('./utils/config');

const app = express();

app.use(cors());
app.use(express.json());

let rooms = [
  {
    name: 'Testirakennus, 2001, Kokoushuone 1',
    address: 'testirakennus.2001@ad.helsinki.fi',
    id: 'testirakennus.2001',
    building: 'Testirakennus',
    roomId: '2001',
  },
  {
    name: 'Testirakennus, 2002, Kokoushuone 2',
    address: 'testirakennus.2002@ad.helsinki.fi',
    id: 'testirakennus.2002',
    building: 'Testirakennus',
    roomId: '2002',
  },
];

let mockRooms = [
  {
    name: 'Exactum, A101, Kokoushuone 3',
    address: 'Exactum.A101@ad.helsinki.fi',
    id: 'Exactum.A101',
    building: 'Exactum',
    roomId: 'A101',
    available: true,
  },
  {
    name: 'Exactum, A304, Kokoushuone 4',
    address: 'Exactum.A304@ad.helsinki.fi',
    id: 'Exactum.A304',
    building: 'Exactum',
    roomId: 'A304',
    available: true,
  },
  {
    name: 'Physicum, B202, Kokoushuone 5',
    address: 'Physicum.B202@ad.helsinki.fi',
    id: 'Physicum.B202',
    building: 'Physicum',
    roomId: 'B202',
    available: false,
  },
  {
    name: 'Chemicum, A102, Kokoushuone 6',
    address: 'Chemicum.A102@ad.helsinki.fi',
    id: 'Chemicum.A102',
    building: 'Chemicum',
    roomId: 'A102',
    available: true,
  },
  {
    name: 'Chemicum, C101, Kokoushuone 7',
    address: 'Chemicum.C101@ad.helsinki.fi',
    id: 'Chemicum.C101',
    building: 'Chemicum',
    roomId: 'C101',
    available: false,
  },
];

let users = [
  {
    id: '1',
    username: 'user1',
    password: '000',
  },
  {
    id: '2',
    username: 'user2',
    password: '111',
  },
];

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.get('/roomsInfo', async (req, res) => {
  const start = new Date();
  const end = new Date(start.getTime());
  end.setDate(start.getDate() + 1);

  const result = await Promise.all(
    rooms.map(async (room) => {
      const copied = Object.assign({}, room);
      const data = await checkAvailability(copied.id, start.toISOString(), end.toISOString());
      copied.available = true;

      if (data) {
        const available = getAvailableTimeAfter(start, data);
        copied.availableTime = available.earliestTime;
        copied.available = available.isAvailable;
      }

      return copied;
    })
  );

  //console.log('RESULT: ', result);

  const mockResult = result.concat(mockRooms); //TODO: remove for production
  res.json(mockResult);
});

app.get('/rooms/:id', async (req, res) => {
  const id = req.params.id;
  const room = rooms.find((room) => room.id === id);
  res.json(room);
});

app.get('/reservations/:room', async (req, res) => {
  const room = req.params.room;
  const today = req.query.today;
  try {
    const data = await calendarService.getReservations(room, today);
    console.log(`found ${data.count} reservations`);
    res.end(JSON.stringify(data));
  } catch (error) {
    res.status(error.response?.status || 400).end(JSON.stringify(error.response?.data));
  }
});

app.get('/reservations/:room/:reservationId', async (req, res) => {
  const { room, reservationId } = req.params;
  try {
    const data = await calendarService.getReservationById(room, reservationId);
    res.end(JSON.stringify(data));
  } catch (error) {
    const message = error.response.data.message || 'Error: Error in getting event';
    const status = error.response.status || 400;
    res.status(status).end(JSON.stringify(message));
  }
});

app.post('/reservations/:room', async (req, res) => {
  const room = req.params.room;
  console.log('BODY:', req.body);
  const body = req.body;
  let reservationObj;
  reservationObj = {
    subject: body.subject,
    start: body.start,
    end: body.end,
    attendees: body.attendees.map((person) => {
      return {
        emailAddress: {
          address: person.email,
          name: person.name,
        },
      };
    }),
  };

  try {
    const data = await calendarService.reserveRoom(room, reservationObj);
    res.status(201).end(JSON.stringify(data));
  } catch (error) {
    res.status(error.response.status).end(JSON.stringify(error.response.data));
  }
});

app.delete('/reservations/:room/:reservation', async (req, res) => {
  const room = req.params.room;
  const reservation = req.params.reservation;
  try {
    const data = await calendarService.deleteReservation(room, reservation);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    res.status(error.response.status).end(JSON.stringify(error.response.data));
  }
});

app.patch('/reservations/:room/:reservation', async (req, res) => {
  const { room, reservation } = req.params;
  const obj = req.body;
  console.log('BODY:', obj);
  try {
    const data = await calendarService.updateReservation(room, reservation, obj);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    res.status(error.response.status).end(JSON.stringify(error.response.data));
  }
});

app.post('/reservations/:room/availability', async (req, res) => {
  const { room } = req.params;
  console.log('BODY:', req.body);
  const { start, end } = req.body;
  try {
    const data = await calendarService.checkAvailability(room, start, end);
    if (data.length > 0) {
      res
        .status(200)
        .json({
          roomId: room,
          start: start,
          end: end,
          available: false,
        })
        .end();
      return;
    }
    res
      .status(200)
      .json({
        roomId: room,
        start: start,
        end: end,
        available: true,
      })
      .end();
  } catch (error) {
    let status = error.response?.status ? error.response.status : 400;
    res.status(status).end(JSON.stringify(error.response?.data));
  }
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'invalid password',
    });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      error: 'username is already in use',
    });
  }

  const user = {
    username: username,
    password: password,
  };

  users = users.concat(user);

  res.status(201).json(user);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!(user && user.password === password)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  res.status(200).send({ token, username: user.username });
});

app.listen(config.PORT);
console.log(`Server running on port ${config.PORT}`);
