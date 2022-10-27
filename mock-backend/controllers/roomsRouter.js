const roomsRouter = require('express').Router();
const rooms = require('../resources/rooms.json').rooms;
const { checkAvailability } = require('../services/calendarService');
const { getAvailableTimeAfter } = require('../services/functions');
const { log } = require('../utils/logger');

roomsRouter.get('/', (req, res) => {
  res.json(rooms);
});

roomsRouter.get('/info', async (req, res) => {
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

  log('RESULT: ', result);

  res.json(result);
});

roomsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const room = rooms.find((room) => room.id === id);
  res.json(room);
});

module.exports = roomsRouter;
