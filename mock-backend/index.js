const express = require("express");
const cors = require("cors");
const calendarService = require("./services/calendarService");

const app = express();

app.use(cors());
app.use(express.json());

let reservations = [
  { id: 1, subject: "this is an event", start: "13:00", end: "14:00" },
  { id: 2, subject: "work hard", start: "10:00", end: "20:00" },
];
let rooms = [
  {
    id: "A114",
    size: "12",
    available: true,
  },
  {
    id: "A144",
    size: "10",
    available: false,
  },
  {
    id: "E123",
    size: "5",
    available: true,
  },
  {
    id: "E200",
    size: "8",
    available: true,
  },
];

app.get("/testData", (req, res) => {
  res.json(reservations);
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.put("/rooms/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  rooms = rooms.map((room) => (room.id === id ? body : room));
  res.sendStatus(200);
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
  const reservationObj = req.body.reservation
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
    res.status(400).end(JSON.stringify({message: error.message}))
  }
})

app.patch("/reservations/:room/:reservation", async (req, res) => {
  const {room, reservation} = req.params
  const obj = req.body.updatedReservation
  console.log(obj)
  try {
    const data = await calendarService.updateReservation(room,reservation,obj)
    res.status(200).end(JSON.stringify(data))
  }catch(error) {
    res.status(400).end(JSON.stringify({message: error.message}))
  }
})

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
