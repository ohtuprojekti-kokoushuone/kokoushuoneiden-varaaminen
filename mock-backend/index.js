const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const reservations = [
  { subject: "this is an event", start: "13:00", end: "14:00" },
  { subject: "work hard", start: "10:00", end: "20:00" },
];
const rooms = [
  {
    id: "A114",
    koko: "12",
    vapaa: true,
  },
  {
    id: "A144",
    koko: "10",
    vapaa: false,
  },
  {
    id: "E123",
    koko: "5",
    vapaa: true,
  },
  {
    id: "E200",
    koko: "8",
    vapaa: true,
  },
];

app.get("/testData", (req, res) => {
  res.json(reservations);
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
