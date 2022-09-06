const express = require("express");
const app = express();

console.log("starting");

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
