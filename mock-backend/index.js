const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let reservations = [
  { subject: "this is an event", start: "13:00", end: "14:00" },
  { subject: "work hard", start: "10:00", end: "20:00" },
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

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
