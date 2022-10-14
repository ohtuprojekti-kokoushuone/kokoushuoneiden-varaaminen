const express = require('express');
const cors = require('cors');
const calendarService = require('./services/calendarService');
const { checkAvailability } = require('./services/calendarService');
const { getAvailableTimeAfter } = require('./services/functions');

const app = express();

app.use(cors());
app.use(express.json());

let rooms = [
  {
    name: 'Testirakennus, 2001, Kokoushuone 1',
    address: 'testirakennus.2001@helsinki.fi',
    id: 'testirakennus.2001',
  },
  {
    name: 'Testirakennus, 2002, Kokoushuone 2',
    address: 'testirakennus.2002@helsinki.fi',
    id: 'testirakennus.2002',
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
      const data = await checkAvailability(room.id, start.toISOString(), end.toISOString());
      room.available = true;

      if (data) {
        const available = getAvailableTimeAfter(start, data);
        room.availableTime = available.earliestTime;
        room.available = available.isAvailable;
      }
      return room;
    })
  );

  //console.log('DATA: ', result);

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
    res.status(error.response.status).end(JSON.stringify(error.response.data));
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

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
