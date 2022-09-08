const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const obj = [
  { subject: "this is an event", start: "13:00", end: "14:00" },
  { subject: "work hard", start: "10:00", end: "20:00" },
];

app.get("/testData", (req, res) => {
  res.json(obj);
});

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
