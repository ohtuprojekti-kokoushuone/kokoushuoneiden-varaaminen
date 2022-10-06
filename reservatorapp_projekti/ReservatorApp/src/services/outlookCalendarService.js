// Copyright (c) Niko Mäkitalo
// Licensed under the MIT License.

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const formatISO9075 = require('date-fns/formatISO9075');
const startOfWeek = require('date-fns/startOfWeek');
const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const addDays = require('date-fns/addDays');

require('dotenv').config();
const auth = require('../config/outlookAuthConfig');

const ReservationHandler = require('../models/reservationModel_db');


const ENDPOINT_URI = process.env.GRAPH_ENDPOINT + process.env.GRAPH_ENDPOINT_API_VERSION;

let authResponse = null;



async function getCalendar(calendarUserId) {

  let responseObject = {};

  try {


    
      const uri = `${ENDPOINT_URI}/users/${calendarUserId}/calendar`;
      response = await axios.default.get(uri, await getOptions());

    
    console.debug('Event Get RESPONSE', response.data);
    
    if (response.status !== 200 || !response.data.owner) {
      throw new Error("Cannot get calendar with calendarUserId: " + calendarUserId);
    }
    
    responseObject['calendar'] = response.data.owner;
    return responseObject;
  } catch (error) {
    console.log('Error in getting calendar details', error);
    throw new Error('Error in getting calendar details', error);
  }

}



async function getEvents(calendarUserId, todayOnly) {

  let responseObject = {};
  let syncedReservations = [];

  try {


    let nowDate = getUTCNowDate(); //new Date();
    
    let startDate = addDays(nowDate, -1).toISOString();
    let endDate = addDays(nowDate, 1).toISOString();


    let response;

    let existingReservations = [];

    if (todayOnly) {

      console.log(`Start: ${startDate}`);
      console.log(`End: ${endDate}`);

      console.log('start', new Date().toISOString());


      const uri = `${ENDPOINT_URI}/users/${calendarUserId}/calendar/calendarView?startDateTime=${startDate}&endDateTime=${endDate}&$top=100&$orderby=start/dateTime desc`;
      console.log('URI', uri);

      response = await axios.default.get(uri,
        await getOptions(),
        startDate,
        endDate);

      // Check for existing reservations and mark deleted events delete into the local db
      existingReservations = await ReservationHandler.findOverlappingReservations(calendarUserId, startDate, endDate);


    } else {
      const uri = `${ENDPOINT_URI}/users/${calendarUserId}/calendar/events?$top=200&$orderby=start/dateTime desc`;
      response = await axios.default.get(uri, await getOptions());

    }
    
    console.debug('Event Get RESPONSE', response.data, 'count: ', response.data.value.length);
    
    if (response.status !== 200) {
      throw new Error("Cannot get reservations");
    }
    
    
    if (response.data && response.data.value) {
      
      const msCalendarEvents = response.data.value;
      
      for (let clendarEvent of msCalendarEvents) {
        try {
          let reservation = await ReservationHandler.upsertReservation(calendarUserId, clendarEvent);
        } catch (error) {
          console.log('Possible duplicate');
        }
      }

      existingReservations = await ReservationHandler.findAllReservationWithCalendarUserId(calendarUserId);
      //console.log('existingReservations', existingReservations, 'count', existingReservations.length);
      console.log('existingReservations count', existingReservations.length);

      const msCalendarEventsIDs = msCalendarEvents.map(o => { return o.id });
      for (let dbEvent of existingReservations) {
        if (msCalendarEventsIDs.includes(dbEvent.calendarEventId)) {
          syncedReservations.push(dbEvent);
        } else {
          // mark deleted
          dbEvent.isDeleted = true;
          dbEvent.save();
        }
      }
    }

    responseObject['count'] = syncedReservations.length;
    responseObject['reservations'] = syncedReservations;
    return responseObject;
  } catch (error) {
    console.log('Error in getting calendar events', error);
    throw new Error('Error in getting calendar events', error);
  }

}




// CREATE
// curl -d '{"subject":"Testivaraus 01", "start": "2022-04-05T15:00:00.0000000", "end": "2022-04-05T16:00:00.0000000"}' -H "Content-Type: application/json" -X POST http://localhost:4000/calendar/testirakennus.113@ad.helsinki.fi/reservations
async function createEvent(calendarUserId, reservation) {
	  

  // Gets the times in UTC
  const adjustedDatetimes = await getDateTimesInUTC(reservation);  
  reservation.start = adjustedDatetimes.start;
  reservation.end = adjustedDatetimes.end;

  // Before making the reservation, check that there are no overlapping meetings. Throws an error in case there are any.
  await checkForOverlappingEvents(calendarUserId, reservation);

  // Make reservation
  
  const timeZone = 'UTC';
  console.log('timeZone', timeZone);
  
  const event = {
    subject: reservation.subject,
    body: {
      contentType: 'HTML',
      content: 'Created from ReservatorApp'
    },
    start: {
      dateTime: reservation.start,
      timeZone: timeZone
    },
    end: {
      dateTime: reservation.end,
      timeZone: timeZone
    },
    location: {
      displayName: reservation.roomCalendarId
    },
    attendees: [
      {
        emailAddress: {
          address: reservation.organizer,
          name: reservation.organizer
        },
        type: 'required'
      }
    ],
    allowNewTimeProposals: true,
    transactionId: uuidv4()
  };


  const uri = `${ENDPOINT_URI}/users/${reservation.organizer}/events`;

  try {
    const response = await axios.default.post(uri, event, await getOptions());
    console.debug('Event Create RESPONSE', response.data);

    let localReservation = await ReservationHandler.upsertReservation(calendarUserId, response.data);
    return localReservation;
  } catch (error) {
    console.log('Error in creating calendar event', error.response.data.error);
    throw new Error('Error in creating calendar event', error.response.data.error);
  }
}


async function deleteEvent(calendarUserId, reservationId) {


  const uri = `${ENDPOINT_URI}/users/${calendarUserId}/events/${reservationId}`;

  try {
    const response = await axios.default.delete(uri, await getOptions());
    console.debug('Event Delete RESPONSE', response.data);
    return response.data;
  } catch (error) {
    console.log('Error in deleting calendar event', error.response.data.error);
    throw new Error('Error in deleting calendar event: ' + error.response.data.error.message);
  }
}


async function updateEvent(calendarUserId, reservationId, reservation) {
  
  console.log('Updating reservation', reservation);

  reservation.calendarEventId = reservationId;

  if (reservation.start || reservation.end) {
    try {
      
      // Gets the times in UTC
      const adjustedDatetimes = await getDateTimesInUTC(reservation);  
      reservation.start = adjustedDatetimes.start;
      reservation.end = adjustedDatetimes.end;
      
      // Before making the reservation, check that there are no overlapping meetings. Throws an error in case there are any.
      await checkForOverlappingEvents(calendarUserId, reservation);

    } catch (error) {
      throw error;
    }
  }

  // Update the reservation
  const event = {};
  if (reservation.start) {
    event['start'] = {
      dateTime: reservation.start,
      timeZone: 'UTC'
    };
  }

  if (reservation.end) {
    event['end'] = {
      dateTime: reservation.end,
      timeZone: 'UTC'
    };
  }

  if (reservation.subject) {
    event['subject'] = reservation.subject;
  }

  const uri = `${ENDPOINT_URI}/users/${calendarUserId}/events/${reservationId}`;

  try {
    const response = await axios.default.patch(uri, event, await getOptions());
    console.debug('Event Update RESPONSE 2', response.data);

    // Update to loca db
    let localReservation = await ReservationHandler.upsertReservation(calendarUserId, response.data);
    return localReservation;

  } catch (error) {
    console.log('Error in updating calendar event', error);
    throw new Error('Error in updating calendar event', error.response.data.error);
  }
}



////// Helpers


async function getOptions() {
  const options = {
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`
    }
  };
  return options;
}


async function getAuthToken() {
  const token = authResponse == null ? await (await auth.getToken(auth.tokenRequest)).accessToken : authResponse.accessToken;
  return token;
}

async function checkToken(token) {
  if(token !== process.env.REQUEST_TOKEN) {
    throw new Error('Unauthorized: request_token header');
  }
  return token;
}



async function createSubscription() {
  console.log('Creating subscription');

  const subscription = {
    applicationId: process.env.CLIENT_ID,
    creatorId: 'testirakennus.113@ad.helsinki.fi',
    changeType: 'created,updated,deleted',
    notificationUrl: 'https://iot.ubikampus.net:9003/notify/testirakennus.113@ad.helsinki.fi',
    resource: '/users/testirakennus.113@ad.helsinki.fi/events',
    expirationDateTime: '2022-03-03T14:23:45.9356913Z',
    clientState: 'SecretClientState'
  };


  const uri = `${ENDPOINT_URI}/subscriptions`;
  console.log('URI', uri);

  const options = {
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`
    }
  };

  try {
    const response = await axios.default.post(uri, subscription, options);
    console.log('SUBSCRIPTION RESPONSE', response.data);
    console.log('SUBSCRIPTION RESPONSE 2', response.data.error);


    return response.data;
  } catch (error) {
    console.log('Error in creating subscription event', error.response.data.error);
    return error.response;
  }
}



async function notifyNewEvent(event) {
  console.log('Notifying');
}





/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint 
 * @param {string} accessToken 
 */
async function callApi(endpoint, accessToken) {

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  console.log('request made to web API at: ' + new Date().toString());

  try {
    const response = await axios.default.get(endpoint, options);
    return response.data;
  } catch (error) {
    console.log(error)
    return error;
  }
};




module.exports = {
  callApi: callApi,
  getCalendar: getCalendar,
  getEvents: getEvents,
  createEvent: createEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  createSubscription: createSubscription,
  notifyNewEvent: notifyNewEvent
};


// Returns: { start: <time in UTC>, end: <time in UTC> }
async function getDateTimesInUTC(reservation) {
  // Ensure there is no overlapping events
  try {

    if (!reservation.start || !reservation.end) {
      throw new Error('Both, start and end datetimes must be given!');
    }

    let startOrig = new Date(reservation.start);
    let endOrig = new Date(reservation.end);

    console.log(`Orig event Start: ${startOrig}`);
    console.log(`Orig event End: ${endOrig}`);

    let adjustedStart = startOrig;
    let adjustedEnd = endOrig;

    console.log('TimezoneOffset', startOrig.getTimezoneOffset());
    if (startOrig.getTimezoneOffset() != 0) {
      console.log('Adjusting time');
      adjustedStart.setMinutes(adjustedStart.getMinutes() + adjustedStart.getTimezoneOffset());
      adjustedEnd.setMinutes(adjustedEnd.getMinutes() + adjustedEnd.getTimezoneOffset());
    }

    let startDate = formatISO9075(adjustedStart);
    let endDate = formatISO9075(adjustedEnd);
	  console.log("TULI");

    //let startDate = adjustedStart;
    //let endDate = adjustedEnd;

    console.log(`Adjusted event Start: ${startDate}`);
    console.log(`Adjusted event End: ${endDate}`);

    return {
      start: startDate,
      end: endDate
    }

  } catch (error) {
    console.log('error in getting overlapping events', error);
    throw error;
  }
};

async function checkForOverlappingEvents(calendarUserId, reservation) {
  // Ensure there is no overlapping events
  try {

    const uri = `${ENDPOINT_URI}/users/${calendarUserId}/calendar/calendarView?startDateTime=${reservation.start}&endDateTime=${reservation.end}&$top=100&$orderby=start/dateTime desc`;
    console.log('URI (for overlaps)', uri);

    let response = await axios.default.get(uri,
      await getOptions(),
      reservation.start,
      reservation.end);

    if (response.status !== 200) {
      throw new Error("Cannot get reservations");
    }

    if (response.data && response.data.value) {

      const msCalendarEvents = response.data.value;
      for (let clendarEvent of msCalendarEvents) {
        if(reservation.calendarEventId && reservation.calendarEventId === clendarEvent.id ) {
          console.log('Myself');
          continue;
        } else {
          console.log('Overlapping event', clendarEvent.subject, '– In total overlapping events:', msCalendarEvents.length);
          console.log('MySelf ID: ' + reservation.calendarEventId);
          console.log('Overlapping event ID: ' + clendarEvent.id);
          
          
          throw new Error('Overlapping event: (' + reservation.start + ' - ' + reservation.end + ') vs. (' + clendarEvent.start.dateTime + ' - ' + clendarEvent.end.dateTime + ').');
        }
      }
    } else {
      console.log('No overlaps');
    }

  } catch (error) {
    console.log('error in getting overlapping events', error);
    throw error;
  }
}


function getUTCNowDate() {
  const date = new Date();
  let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  return new Date(now_utc);
}





