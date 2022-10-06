const ioClient = require("socket.io-client");

const socket = ioClient("http://iot.ubikampus.net:9005");
//const socket = ioClient("http://localhost:9004");

socket.on("connect", () => {
  console.log('Connected to Notification Broker 1');
});

socket.on("connection", () => {
  console.log('Connected to Notification Broker 2');
});


socket.on("disconnect", () => {
  console.log('Disconnected from Notification Broker');
});

socket.on("calendar_changed", (calendarUserId) => {
  console.log('Calendar changed!');
  console.log('calendarUserId', calendarUserId);
});