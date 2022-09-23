const axios = require("axios");
require("dotenv").config();

const baseUrl = process.env.BASE_URL;
const domain = process.env.DOMAIN;
const token = process.env.REQUEST_TOKEN;

async function getReservations(room, today = false) {
  console.log("GETTING RESERVATIONS FOR ROOM", room);
  try {
    const response = await axios.default.get(
      `${baseUrl}/calendar/${room}@${domain}/reservations?today=${today}&token=${token}`
    );

    console.log("GOT RESPONSE", response.data);
    return response.data;
  } catch (error) {
    console.log("ERROR IN GETTING RESERVATIONS:", error.response.status, error.code);
    throw new Error(`Error in getting reservations for ${room}: ${error}`);
  }
}

module.exports = {
  getReservations: getReservations,
};
