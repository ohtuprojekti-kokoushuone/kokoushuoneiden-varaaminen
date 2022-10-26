const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Cannot connect to mongodb:'));
//mongoose.connect('mongodb://localhost/' + config.database);

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'development' ? process.env.DEV_MONGODB_URI : process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const ReservationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },

    calendarEventId: {
      type: String,
      required: [true, 'Please enter a Office calendar event id'],
      index: true,
      unique: true,
    },

    calendarUserId: {
      type: String,
      required: [true, 'Please enter a calendar principal user id (e.g., buildingX.roomX@ad.domainX.fi)'],
      index: true,
    },

    subject: {
      type: String,
    },

    body: {
      contentType: String,
      content: String,
    },

    start: {
      type: Date,
      required: [true, 'Please enter start date'],
      index: true,
    },

    end: {
      type: Date,
      required: [true, 'Please enter end date'],
      index: true,
    },

    organizer: {
      name: String,
      email: String,
    },

    attendees: [
      {
        email: String,
        name: String,
        requiredAttendee: Boolean,
      },
    ],

    // If the event was not received from the Outlook anymore, mark it deleted
    isDeleted: Boolean,

    isCancelled: Boolean,
  },
  { timestamps: true }
);

ReservationSchema.methods.toJSON = function () {
  const reservationObject = this.toObject();

  var response = {
    id: reservationObject.calendarEventId,
    subject: reservationObject.subject,
    body: reservationObject.body,
    start: {
      dateTime: new Date(reservationObject.start),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(reservationObject.end),
      timeZone: 'UTC',
    },
    organizer: reservationObject.organizer,
    attendees: reservationObject.attendees.map((o) => {
      return {
        email: o.email,
        name: o.name,
      };
    }),
    isCancelled: reservationObject.isCancelled,
    //isDeleted: reservationObject.isDeleted ? reservationObject.isDeleted : false
  };

  return response;
};

const reservationModel = mongoose.model('Reservation', ReservationSchema);

const ReservationHandler = {
  findReservationWithId: async function (calendarEventId) {
    return reservationModel.findOne({
      calendarEventId: calendarEventId,
    });
  },

  findAllReservationWithCalendarUserId: async function (calendarUserId) {
    return reservationModel.find({
      calendarUserId: calendarUserId,
    });
  },

  findOverlappingReservations: async function (calendarUserId, startDate, endDate) {
    // https://stackoverflow.com/questions/26876803/mongodb-find-date-range-if-overlap-with-other-dates
    /**
     * The time overlap can be illustrated with these 4 cases in the figure below, where S/E is startdate/enddate of the new document and S'/E' is startdate/enddate of any existing document:
     *   S'                  E' 
         |-------------------|

          S                E 
          |****************|

        S'          E' 
        |-----------|

            S'          E' 
            |-----------|

                    S'          E' 
                    |-----------|
     * 
     */
    //return reservationModel.find({ "start": { "$lt": endDate }, "end": { "$gt": startDate } });
    return reservationModel.find({
      calendarUserId: calendarUserId,
      start: { $lte: endDate },
      end: { $gte: startDate },
    });
  },

  findReservationsBetween: async function (calendarUserId, startDate, endDate) {
    console.log('START', startDate);

    return reservationModel.find({
      $and: [{ calendarUserId: calendarUserId }, { start: { $gt: startDate } }, { end: { $lt: endDate } }],
    });

    /*
            return reservationModel.find({ 
                
                "start": { 
                    "$gt": startDate 
                }, 
                "end": { 
                    "$lt": endDate
                } });
                */
  },

  upsertReservation: async function (calendarUserId, reservationObject) {
    var lastSeen = new Date();

    var query = {
      calendarEventId: reservationObject.id,
    };

    return reservationModel.findOneAndUpdate(
      query,
      {
        $set: {
          _id: reservationObject.id,
          calendarEventId: reservationObject.id,
          calendarUserId: calendarUserId,
          subject: reservationObject.subject,
          body: reservationObject.body,
          start:
            reservationObject.start.timeZone === 'UTC'
              ? reservationObject.start.dateTime + 'Z'
              : reservationObject.start.dateTime,
          end:
            reservationObject.end.timeZone === 'UTC'
              ? reservationObject.end.dateTime + 'Z'
              : reservationObject.end.dateTime,
          organizer: {
            email: reservationObject.organizer.emailAddress.address,
            name: reservationObject.organizer.emailAddress.name,
          },
          attendees: reservationObject.attendees.map((o) => {
            return {
              name: o.emailAddress.name,
              email: o.emailAddress.address,
              requiredAttendee: o.required,
            };
          }),
          isCancelled: reservationObject.isCancelled,
          lastSeen: lastSeen,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );
  },

  /*upsertReservation: async function (reservationObject) {
    var lastSeen = new Date();

    const query = {
      _id: reservationObject.calendarEventId,
    };

    let reservation = await reservationModel.findOne(query);

    if(reservation) {

console.log('IFFI');


      // found -> update
      return reservationModel.updateOne(query, {
        $set: {
          subject: reservationObject.subject,
          start: reservationObject.start.timeZone === 'UTC' ? reservationObject.start.dateTime + 'Z' : reservationObject.start.dateTime,
          end: reservationObject.end.timeZone === 'UTC' ? reservationObject.end.dateTime + 'Z' : reservationObject.end.dateTime,
          organizer: {
            email: reservationObject.organizer.emailAddress.address,
            name: reservationObject.organizer.emailAddress.name
  
          },
          attendees: reservationObject.attendees.map(o => {
            return {
              name: o.emailAddress.name,
              email: o.emailAddress.address,
              requiredAttendee: o.required
            }
          }),
          isCancelled: reservationObject.isCancelled,
          lastSeen: lastSeen
        }
      }, {
        new: true,
        runValidators: true
      });

    } else {

      console.log('ELSII');

      // create
      return reservationModel.findOneAndUpdate(query, {
        $set: {
          _id: reservationObject.id,
          calendarEventId: reservationObject.id,
          subject: reservationObject.subject,
          start: reservationObject.start.timeZone === 'UTC' ? reservationObject.start.dateTime + 'Z' : reservationObject.start.dateTime,
          end: reservationObject.end.timeZone === 'UTC' ? reservationObject.end.dateTime + 'Z' : reservationObject.end.dateTime,
          organizer: {
            email: reservationObject.organizer.emailAddress.address,
            name: reservationObject.organizer.emailAddress.name
  
          },
          attendees: reservationObject.attendees.map(o => {
            return {
              name: o.emailAddress.name,
              email: o.emailAddress.address,
              requiredAttendee: o.required
            }
          }),
          isCancelled: reservationObject.isCancelled,
          lastSeen: lastSeen
        }
      }, {
        upsert: true,
        new: true,
        runValidators: true
      });
    }
  },*/

  findAllReservations: async function () {
    return reservationModel.find();
  },

  deleteReservation: async function (calendarEventId) {
    return reservationModel.deleteOne({ calendarEventId: calendarEventId });
  },
};

/*
async function test() {
  const testObject = {
    calendarEventId: 'testiid1',
    subject: 'Juu 2',
    start: {
      dateTime: new Date('2022-03-28T18:07:06.0000000'),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date('2022-03-28T19:37:59.0000000'),
      timeZone: 'UTC',
    },
    organizer: {
      emailAddress: {
        address: 'niko.makitalo@helsinki.fi',
        name: 'Niko',
      },
    },
    attendees: [
      {
        emailAddress: {
          address: 'niko.makitalo@helsinki.fi',
          name: 'Niko',
        },
      },
    ],
    isCancelled: false,
  };

  try {
    let created = await ReservationHandler.upsertReservation('testirakennus.113@ad.helsinki.fi', testObject);
    console.log('created', created);
  } catch (error) {
    console.log('error', error);
  }

  let r = await ReservationHandler.findReservationWithId('testiid2');
  if (r) {
    console.log('r', r.subject);
  }


  r = await ReservationHandler.findAllReservations();
  console.log('r', r);

  r = await ReservationHandler.deleteReservation('testiid8');
  console.log('r', r);


  const testObject2 = {
    calendarEventId: 'testiid8',
    subject: 'Juu 2',
    start: new Date('2022-03-28T16:37:59.0000000'),
    end: new Date('2022-03-28T18:07:06.0000000'),
    organizer: {
      email: 'niko.makitalo@helsinki.fi',
      name: 'Niko',
    },
    attendees: [
      {
        email: 'niko.makitalo@helsinki.fi',
        name: 'Niko',
      },
    ],
    isCancelled: false,
  };
  let overlapping = await ReservationHandler.findOverlappingReservations(testObject2.start, testObject2.end);
  console.log('overlapping', overlapping);
}
*/
//test();
module.exports = ReservationHandler;
/*
const clendarEvent = {
  '@odata.etag': 'W/"sPUszM11nUeM4SoSVWTf7wAC7gmQxQ=="',
  id: 'AAMkADljZWQ0YTcyLTk2MTMtNGQyNy1iODkyLWJlNzdhM2QyOTYxYwBGAAAAAAAVJbGLLYkZSZ6DNG0OxtqxBwDY1HQvVZgvSbcoVU76nQLnAAAAAAENAACw9SzMzXWdR4zhKhJVZN-vAALuC40rAAA=',
  createdDateTime: '2022-03-18T13:16:09.0949639Z',
  lastModifiedDateTime: '2022-03-18T13:16:26.6874626Z',
  changeKey: 'sPUszM11nUeM4SoSVWTf7wAC7gmQxQ==',
  categories: [],
  transactionId: 'aa5fd38a-b959-4b0f-a382-cddbd887bc79',
  originalStartTimeZone: 'UTC',
  originalEndTimeZone: 'UTC',
  iCalUId:
    '040000008200E00074C5B7101A82E008000000004B12FD54CA3AD80100000000000000001000000088D51DE5DFCD884BA004EFC0354CA7F1',
  reminderMinutesBeforeStart: 15,
  isReminderOn: true,
  hasAttachments: false,
  subject: 'Res test 1',
  bodyPreview: 'Created from ReservatorApp',
  importance: 'normal',
  sensitivity: 'normal',
  isAllDay: false,
  isCancelled: false,
  isOrganizer: true,
  responseRequested: true,
  seriesMasterId: null,
  showAs: 'busy',
  type: 'singleInstance',
  webLink:
    'https://outlook.office365.com/owa/?itemid=AAMkADljZWQ0YTcyLTk2MTMtNGQyNy1iODkyLWJlNzdhM2QyOTYxYwBGAAAAAAAVJbGLLYkZSZ6DNG0OxtqxBwDY1HQvVZgvSbcoVU76nQLnAAAAAAENAACw9SzMzXWdR4zhKhJVZN%2FvAALuC40rAAA%3D&exvsurl=1&path=/calendar/item',
  onlineMeetingUrl: null,
  isOnlineMeeting: false,
  onlineMeetingProvider: 'unknown',
  allowNewTimeProposals: true,
  occurrenceId: null,
  isDraft: false,
  hideAttendees: false,
  responseStatus: { response: 'organizer', time: '0001-01-01T00:00:00Z' },
  body: {
    contentType: 'html',
    content:
      '<html>\r\n' +
      '<head>\r\n' +
      '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n' +
      '</head>\r\n' +
      '<body>\r\n' +
      'Created from ReservatorApp\r\n' +
      '</body>\r\n' +
      '</html>\r\n',
  },
  start: { dateTime: '2022-03-18T15:16:08.0000000', timeZone: 'UTC' },
  end: { dateTime: '2022-03-18T15:40:26.0000000', timeZone: 'UTC' },
  location: {
    displayName: 'testirakennus.113@ad.helsinki.fi',
    locationType: 'default',
    uniqueId: 'testirakennus.113@ad.helsinki.fi',
    uniqueIdType: 'private',
  },
  locations: [
    {
      displayName: 'testirakennus.113@ad.helsinki.fi',
      locationType: 'default',
      uniqueId: 'testirakennus.113@ad.helsinki.fi',
      uniqueIdType: 'private',
    },
  ],
  recurrence: null,
  attendees: [
    {
      type: 'required',
      status: { response: 'none', time: '0001-01-01T00:00:00Z' },
      emailAddress: {
        name: 'Testirakennus, 113, Testihuone 3',
        address: 'testirakennus.113@helsinki.fi',
      },
    },
  ],
  organizer: {
    emailAddress: {
      name: 'Testirakennus, 113, Testihuone 3',
      address: 'testirakennus.113@helsinki.fi',
    },
  },
  onlineMeeting: null,
  'calendar@odata.associationLink':
    "https://graph.microsoft.com/v1.0/users('testirakennus.113@ad.helsinki.fi')/calendars('AAMkADljZWQ0YTcyLTk2MTMtNGQyNy1iODkyLWJlNzdhM2QyOTYxYwBGAAAAAAAVJbGLLYkZSZ6DNG0OxtqxBwDY1HQvVZgvSbcoVU76nQLnAAAAAAEGAACw9SzMzXWdR4zhKhJVZN-vAAKuQ-AFAAA=')/$ref",
  'calendar@odata.navigationLink':
    "https://graph.microsoft.com/v1.0/users('testirakennus.113@ad.helsinki.fi')/calendars('AAMkADljZWQ0YTcyLTk2MTMtNGQyNy1iODkyLWJlNzdhM2QyOTYxYwBGAAAAAAAVJbGLLYkZSZ6DNG0OxtqxBwDY1HQvVZgvSbcoVU76nQLnAAAAAAEGAACw9SzMzXWdR4zhKhJVZN-vAAKuQ-AFAAA=')",
};
*/
