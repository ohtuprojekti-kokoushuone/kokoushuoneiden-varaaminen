// Copyright (c) Niko Mäkitalo
// Licensed under the MIT License.

var express = require('express');
//const FavouriteHandler = require('../models/favouriteModel_db');
const favouritesService = require('../services/favouritesService');
const outlookCalendarService = require('../services/outlookCalendarService');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.post('/reservations', async function (req, res) {
  try {
    if (!(await isRequestAuthorized(req))) {
      res.status(401);
      const errorResponse = {
        message: 'Unauthorized request: Check request_token authorization header.',
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }
    const { email } = req.body;
    const data = await outlookCalendarService.getEventsByOrganizerEmail(email);
    res.json(data);
  } catch (error) {
    res.status(400);
    const errorResponse = {
      message: '' + error,
    };
    res.end(JSON.stringify(errorResponse, null, 4));
    return;
  }
});

router.post('/favourites', async function (req, res) {
  try {
    if (!(await isRequestAuthorized(req))) {
      res.status(401);
      const errorResponse = {
        message: 'Unauthorized request: Check request_token authorization header.',
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }
    console.log('adding favourites', req.body);
    const data = await favouritesService.addFavourites(req.body);
    res.json(data);
  } catch (error) {
    res.status(400);
    const errorResponse = {
      message: '' + error,
    };
    res.end(JSON.stringify(errorResponse, null, 4));
    return;
  }
});

router.get('/favourites', async function (req, res) {
  try {
    if (!(await isRequestAuthorized(req))) {
      res.status(401);
      const errorResponse = {
        message: 'Unauthorized request: Check request_token authorization header.',
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }
    console.log('getting favourites for ', req.query.uid);
    const data = await favouritesService.getFavouritesByUid(req.query.uid);
    res.json(data);
  } catch (error) {
    res.status(400);
    const errorResponse = {
      message: '' + error,
    };
    res.end(JSON.stringify(errorResponse, null, 4));
    return;
  }
});

/*
router.get('/favourites/all', async function (req, res) {
  const data = await FavouriteHandler.getAll();
  console.log(data);
  res.json(data);
});
*/

module.exports = router;

async function isRequestAuthorized(request) {
  if (
    request.headers &&
    request.headers &&
    request.headers.authorization &&
    request.headers.authorization === process.env.REQUEST_TOKEN
  ) {
    console.log('Authorized request.');
    return true;
  } else if (request.query.token && request.query.token === process.env.REQUEST_TOKEN) {
    console.log('Authorized request.');
    return true;
  } else {
    console.log('Unauthorized request.');
    return false;
  }
}
