// Copyright (c) Niko Mäkitalo
// Licensed under the MIT License.

require('dotenv').config();

const router = require('express-promise-router')();

const outlookService = require('../services/outlookCalendarService');


const addDays = require('date-fns/addDays');
const formatISO = require('date-fns/formatISO');
const formatISO9075 = require('date-fns/formatISO9075');
const formatRFC3339 = require('date-fns/formatRFC3339');
const formatRFC7231 = require('date-fns/formatRFC7231');


const startOfWeek = require('date-fns/startOfWeek');
const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
//const iana = require('windows-iana');
const { body, validationResult } = require('express-validator');
const validator = require('validator');


/*
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      const params = {
        active: { calendar: true }
      };
      console.log('foo');
      // Get the user
      const user = req.app.locals.users[req.session.userId];
      // Convert user's Windows time zone ("Pacific Standard Time")
      // to IANA format ("America/Los_Angeles")
      const timeZoneId = iana.findIana(user.timeZone)[0];
      console.log(`Time zone: ${timeZoneId.valueOf()}`);

      // Calculate the start and end of the current week
      // Get midnight on the start of the current week in the user's timezone,
      // but in UTC. For example, for Pacific Standard Time, the time value would be
      // 07:00:00Z
      var weekStart = zonedTimeToUtc(startOfWeek(new Date()), timeZoneId.valueOf());
      var weekEnd = addDays(weekStart, 7);
      console.log(`ORIG Start: ${weekStart}`);
      console.log(`Start: ${formatISO(weekStart)}`);
      console.log(`Start: ${formatISO9075(weekStart)}`);
      console.log(`Start: ${formatRFC3339(weekStart)}`);
      console.log(`Start: ${formatRFC7231(weekStart)}`);
      console.log('foo 2');
      // Get the access token
      var accessToken;
      try {
        console.log('foo 3');
        accessToken = await getAccessToken(req.session.userId, req.app.locals.msalClient);
        console.log('foo 4');
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err, Object.getOwnPropertyNames(err))
        });
        return;
      }
      console.log('foo 5');
      if (accessToken && accessToken.length > 0) {
        try {
          console.log('foo 6');
          // Get the events
          const events = await graph.getCalendarView(
            accessToken,
            formatISO9075(weekStart),
            formatISO9075(weekEnd),
            user.timeZone);

            console.log('foo');
            console.log(events);
          params.events = events.value;
        } catch (err) {
          console.log('foo prkl', err);
          req.flash('error_msg', {
            message: 'Could not fetch events',
            debug: JSON.stringify(err, Object.getOwnPropertyNames(err))
          });
        }
      }
      else {
        req.flash('error_msg', 'Could not get an access token');
      }

      res.render('calendar', params);
    }
    */


// Get the calendar details. Used by the app to verify that the calendar exists and to get its name
router.get('/:calendarUserId/',
  async function (req, res) {
    try {

      if (!await isRequestAuthorized(req)) {
        res.status(401);
        const errorResponse = {
          message: "Unauthorized request: Check request_token authorization header."
        };
        res.end(JSON.stringify(errorResponse, null, 4));        
        return;
      }

      const calendarUserId = req.params.calendarUserId;
      let responseObject = await outlookService.getCalendar(calendarUserId);

      res.end(JSON.stringify(responseObject, null, 4));


    } catch (error) {
      res.status(400);
      const errorResponse = {
        message: "" + error
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }


  }
);

router.get('/:calendarUserId/testii/',
  async function (req, res) {
	  console.log("tuli");
	  res.end("hello!");
	  return;
  }
);



// <GetRouteSnippet>
// GET /calendar 
router.get('/:calendarUserId/reservations',
  async function (req, res) {
	console.log("tuli");

    try {


      if (!await isRequestAuthorized(req)) {
        res.status(401);
        const errorResponse = {
          message: "Unauthorized request: Check request_token authorization header."
        };
        res.end(JSON.stringify(errorResponse, null, 4));        
        return;
      }


      let todayOnly = false;
      if (req.query.today && req.query.today === "true") {
        console.log("Getting only today's events");
        todayOnly = true;
      }

      const calendarUserId = req.params.calendarUserId;
      let responseObject = await outlookService.getEvents(calendarUserId, todayOnly);


      res.end(JSON.stringify(responseObject, null, 4));


    } catch (error) {
      res.status(400);
      const errorResponse = {
        message: "" + error
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }


  }
);

router.get("/:calendarUserId/reservations/:start/:end", async function (req, res) {
  try {
    if (!(await isRequestAuthorized(req))) {
      res.status(401);
      const errorResponse = {
        message:
          "Unauthorized request: Check request_token authorization header.",
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }
    const { calendarUserId, start, end } = req.params
    console.log("PARAMS:", req.params)
    const data = await outlookService.checkAvailability(calendarUserId, start, end)
    if (data.value.length === 0) {
      res.json()
      return
    }
    res.json(data.value)
  } catch (error) {
    res.status(400);
    const errorResponse = {
      message: "" + error,
    };
    res.end(JSON.stringify(errorResponse, null, 4));
    return;
  }
})


// curl -d '{"subject":"Testivaraus 1", "start": "2022-02-23T15:00:00.0000000", "end": "2022-02-23T16:00:00.0000000"}' -H "Content-Type: application/json" -X POST http://localhost:4000/calendar/reservations/testirakennus.113@ad.helsinki.fi


router.post('/:calendarUserId/reservations',
  async function (req, res) {
    console.log('Creating new MS calendar event from reservation');

    try {

      if (!await isRequestAuthorized(req)) {
        res.status(401);
        const errorResponse = {
          message: "Unauthorized request: Check request_token authorization header."
        };
        res.end(JSON.stringify(errorResponse, null, 4));        
        return;
      }
	  

      console.log('BODY', req.body);
      if (req.body.subject && req.body.start && req.body.end) {
        // TODO check that exist and valid
        let reservation = {
          subject: req.body.subject,
          start: req.body.start,
          end: req.body.end,
          organizer: req.body.organizer ? req.body.organizer : req.params.calendarUserId,
          roomCalendarId: req.params.calendarUserId
        };

        const reservationResponse = await outlookService.createEvent(req.params.calendarUserId, reservation);
        res.status(201);
        res.end(JSON.stringify(reservationResponse, null, 4));
        return;


      } else {
        throw new Error("Invalid parameters");
      }

    } catch (error) {
      res.status(400);
      const errorResponse = {
        message: "" + error
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }

  }
);

// DELETE
// curl -X DELETE http://localhost:4000/calendar/testirakennus.113@ad.helsinki.fi/reservations/AAMkADljZWQ0YTcyLTk2MTMtNGQyNy1iODkyLWJlNzdhM2QyOTYxYwBGAAAAAAAVJbGLLYkZSZ6DNG0OxtqxBwDY1HQvVZgvSbcoVU76nQLnAAAAAAENAACw9SzMzXWdR4zhKhJVZN-vAAL7iNskAAA=

router.delete('/:calendarUserId/reservations/:reservationId',
  async function (req, res) {
    console.log('Deleteing MS calendar event based on reservation');
    try {

      if (!await isRequestAuthorized(req)) {
        res.status(401);
        const errorResponse = {
          message: "Unauthorized request: Check request_token authorization header."
        };
        res.end(JSON.stringify(errorResponse, null, 4));        
        return;
      }

      console.log('BODY', req.body);

      const response = await outlookService.deleteEvent(req.params.calendarUserId, req.params.reservationId);
      const responseObject = {
        message: "DELETED"
      };
      res.end(JSON.stringify(responseObject, null, 4));
      return;

    } catch (error) {
      res.status(400);
      const errorResponse = {
        message: "" + error
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }

  }
);

// curl -d '{"start": "2022-03-11T15:00:00.0000000", "end": "2022-03-11T16:00:00.0000000"}' -H "Content-Type: application/json" -X PATCH http://localhost:4000/calendar/testirakennus.113@ad.helsinki.fi/reservations/

router.patch('/:calendarUserId/reservations/:reservationId',
  async function (req, res) {

    try {
      console.log('updating MS calendar event from reservation');

      if (!await isRequestAuthorized(req)) {
        res.status(401);
        const errorResponse = {
          message: "Unauthorized request: Check request_token authorization header."
        };
        res.end(JSON.stringify(errorResponse, null, 4));        
        return;
      }

      if (!req.body) {
        throw new Error('No data to update');
      }

      let reservation = {
        _id: req.params.reservationId,
        calendarEventId: req.params.reservationId,
        subject: req.body.subject,
        start: req.body.start,
        end: req.body.end
      };

      const responseObject = await outlookService.updateEvent(req.params.calendarUserId, req.params.reservationId, reservation);

      res.end(JSON.stringify(responseObject, null, 4));
      return;

    } catch (error) {
      res.status(400);
      const errorResponse = {
        message: "" + error
      };
      res.end(JSON.stringify(errorResponse, null, 4));
      return;
    }


  }
);



router.get('/notifications/reservation/',
  async function (req, res) {
    console.log('Notification!!');
    await outlookService.notifyNewEvent();
    res.end();
    return;
  }
);

router.get('/test',
  async function (req, res) {
    console.log('Test method!!');
    await outlookService.createSubscription();
    res.end();
    return;
  }
);


async function isRequestAuthorized(request) {
	console.log('joo');
  if (request.headers && request.headers && request.headers.authorization && request.headers.authorization === process.env.REQUEST_TOKEN) {
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



module.exports = router;
