const reservationsRouter = require('express').Router();
const calendarService = require('../services/calendarService');
const { log } = require('../utils/logger');

reservationsRouter.get('/:room', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const room = req.params.room;
  const today = req.query.today;
  try {
    const data = await calendarService.getReservations(room, today);
    log(`found ${data.count} reservations`);
    res.end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

reservationsRouter.get('/:room/:reservationId', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const { room, reservationId } = req.params;
  try {
    const data = await calendarService.getReservationById(room, reservationId);
    if (data && data.organizer && data.organizer.email !== req.headers.mail) {
      res.status(401).end(JSON.stringify('Unauthorised'));
    }
    res.end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

reservationsRouter.post('/:room', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const room = req.params.room;
  log('BODY:', req.body);
  const body = req.body;
  let reservationObj;
  reservationObj = {
    subject: body.subject,
    start: body.start,
    end: body.end,
    organizer: {
      emailAddress: {
        address: req.headers.mail,
        name: `${req.headers.givenname} ${req.headers.sn}`,
      },
    },
    room: {
      id: room,
    },
  };

  try {
    const data = await calendarService.reserveRoom(room, reservationObj);
    res.status(201).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

reservationsRouter.delete('/:room/:reservation', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const room = req.params.room;
  const reservation = req.params.reservation;
  try {
    const data = await calendarService.deleteReservation(room, reservation);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

reservationsRouter.patch('/:room/:reservation', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const { room, reservation } = req.params;
  const obj = req.body;
  log('BODY:', obj);
  try {
    const data = await calendarService.updateReservation(room, reservation, obj);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

reservationsRouter.post('/:room/availability', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  const { room } = req.params;
  log('BODY:', req.body);
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
    next(error);
  }
});

module.exports = reservationsRouter;
