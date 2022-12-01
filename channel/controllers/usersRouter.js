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

usersRouter.get('/current', async (req, res, next) => {
  if (!req.headers.mail) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  try {
    const data = {
      uid: req.headers.uid,
      mail: req.headers.mail,
      givenName: req.headers.givenName,
      sn: req.headers.sn,
    };
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
