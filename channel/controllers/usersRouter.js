const usersRouter = require('express').Router();
const calendarService = require('../services/calendarService');

usersRouter.get('/reservations', async (req, res, next) => {
  if (!req.headers.mail) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  try {
    const data = await calendarService.getReservationsByOrganizer(req.headers.mail);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
