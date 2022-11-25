const usersRouter = require('express').Router();
const calendarService = require('../services/calendarService');

usersRouter.post('/reservations', async (req, res, next) => {
  const { email } = req.body;

  try {
    const data = await calendarService.getReservationsByOrganizer(email);
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
