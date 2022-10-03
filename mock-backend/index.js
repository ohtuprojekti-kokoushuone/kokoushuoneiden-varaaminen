const express = require("express");
const cors = require("cors");
const calendarService = require("./services/calendarService");

const app = express();

app.use(cors());
app.use(express.json());

let rooms = [
  {
    name: "Testirakennus, 2001, Kokoushuone 1",
    address: "testirakennus.2001@helsinki.fi",
    id: "testirakennus.2001"
  },
  {
    name: "Testirakennus, 2002, Kokoushuone 2",
    address: "testirakennus.2002@helsinki.fi",
    id: "testirakennus.2002"
  }
];

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.get("/reservations/:room", async (req, res) => {
  const room = req.params.room;
  const today = req.query.today;
  try {
    const data = await calendarService.getReservations(room, today);
    console.log(`found ${data.count} reservations`);
    res.end(JSON.stringify(data));
  } catch (error) {
    res.status(400).end(JSON.stringify({ message: error.message }))
  }
});

app.post("/reservations/:room", async (req, res) => {
  const room = req.params.room
  console.log("BODY:", req.body)
  const body = req.body.reservation
  let reservationObj
  reservationObj = {
    subject: body.subject,
    start: body.start,
    end: body.end,
    attendees: body.attendees.map(person => {
      return {
        emailAddress: {
          address: person.email,
          name: person.name
        }
      }
    })
  }

  try {
    const data = await calendarService.reserveRoom(room, reservationObj)
    res.status(201).end(JSON.stringify(data));
  } catch (error) {
    res.status(400).end(JSON.stringify({ message: error.message }))
  }
})

app.delete("/reservations/:room/:reservation", async (req, res) => {
  const room = req.params.room
  const reservation = req.params.reservation
  try {
    const data = await calendarService.deleteReservation(room, reservation)
    res.status(200).end(JSON.stringify(data))
  } catch (error) {
    res.status(400).end(JSON.stringify({ message: error.message }))
  }
})

app.patch("/reservations/:room/:reservation", async (req, res) => {
  const { room, reservation } = req.params
  const obj = req.body
  console.log("BODY:", obj)
  try {
    const data = await calendarService.updateReservation(room, reservation, obj)
    res.status(200).end(JSON.stringify(data))
  } catch (error) {
    res.status(400).end(JSON.stringify({ message: error.message }))
  }
})

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
