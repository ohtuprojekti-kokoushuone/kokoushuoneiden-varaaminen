const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const calendarService = require('./services/calendarService');
const { checkAvailability } = require('./services/calendarService');
const { getAvailableTimeAfter } = require('./services/functions');
const { differenceInMinutes } = require('date-fns');
const config = require('./utils/config');
const rooms = require('./resources/rooms.json').rooms;

const app = express();

app.use(cors());
app.use(express.json());

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
  let available;

  const result = await Promise.all(
    rooms.map(async (room) => {
      if (room.building !== 'Testirakennus') {
        available = Math.random() < 0.7;
        return { ...room, available: available };
      }
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

  res.json(result);
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
    attendees: body.attendees?.map((person) => {
      return {
        emailAddress: {
          address: person.email,
          name: person.name,
        },
      };
    }),
  };
  if (differenceInMinutes(new Date(reservationObj.end), new Date(reservationObj.start)) > 120) {
    res.status(400).end(
      JSON.stringify({
        message: 'Error: Maximum time for a reservation is 2 hours',
      })
    );
  }

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
