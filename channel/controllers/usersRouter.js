const usersRouter = require('express').Router();
const calendarService = require('../services/calendarService');
const favouritesService = require('../services/favouritesService');

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
    console.log(req.headers);
    const data = {
      uid: req.headers.uid,
      mail: req.headers.mail,
      givenName: req.headers.givenname,
      sn: req.headers.sn,
    };
    res.status(200).end(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/favourites', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  try {
    const data = await favouritesService.getFavourites(req.headers.uid);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/favourites', async (req, res, next) => {
  if (!req.headers.uid) {
    res.status(401).end(JSON.stringify('Unauthorised!!!!!'));
  }
  try {
    const favourites = req.body;
    console.log(req.body);
    const obj = {
      uid: req.headers.uid,
      favourites: favourites,
    };
    const data = await favouritesService.addFavourites(obj);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
