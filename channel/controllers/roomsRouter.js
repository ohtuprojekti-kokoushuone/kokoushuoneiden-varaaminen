const roomsRouter = require('express').Router();
const campuses = require('../resources/campuses.json').campuses;
const { checkAvailability } = require('../services/calendarService');
const { getAvailableTimeAfter, filterRoom } = require('../services/functions');

const buildings = [];
const rooms = [];

campuses.forEach((campus) => {
  campus.buildings.forEach((building) => {
    buildings.push(building);
  });
});

buildings.forEach((building) => {
  building.rooms.forEach((room) => {
    rooms.push(room);
  });
});

roomsRouter.get('/', (req, res) => {
  res.json(rooms);
});

roomsRouter.get('/buildings', (req, res) => {
  res.json(buildings);
});

roomsRouter.get('/campuses', (req, res) => {
  res.json(campuses);
});

roomsRouter.get('/info', async (req, res) => {
  const start = new Date();
  const end = new Date(start.getTime());
  end.setHours(start.getHours() + 2);

  const filteredRooms = rooms.filter((room) => filterRoom(room, req.headers.employeenumber));

  const result = await Promise.all(
    filteredRooms.map(async (room) => {
      const copied = Object.assign({}, room);
      const data = await checkAvailability(copied.id, start.toISOString(), end.toISOString());
      copied.available = true;

      if (data && data.length !== 0) {
        const available = getAvailableTimeAfter(start, end, data);
        if (available.earliestTime !== null) {
          copied.availableTime = available.earliestTime;
        }
        copied.available = available.isAvailable;
      }

      return copied;
    })
  );

  res.json(result);
});

roomsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const room = rooms.find((room) => room.id === id);
  res.json(room);
});

module.exports = roomsRouter;
