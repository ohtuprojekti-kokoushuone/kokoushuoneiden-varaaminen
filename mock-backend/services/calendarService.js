const axios = require('axios');
const config = require('../utils/config');

const { BASE_URL, DOMAIN, TOKEN } = config;

async function getReservations(room, today = false) {
  console.log('GETTING RESERVATIONS FOR ROOM', room);
  try {
    const response = await axios.default.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations?today=${today}`, {
      headers: {
        Authorization: TOKEN,
      },
    });

    console.log('GOT RESPONSE', response.data);
    return response.data;
  } catch (error) {
    console.log('ERROR IN GETTING RESERVATIONS:', error.response.status, error.code);
    throw error;
  }
}

async function getReservationById(room, reservationId) {
  console.log('GETTING RESERVATION BY ID', reservationId);
  try {
    const response = await axios.default.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${reservationId}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log('GOT RESPONSE', response.data);
    return response.data;
  } catch (error) {
    console.log('ERROR IN GETTING EVENT: ', error.response.status, error.response.data.message);
    throw error;
  }
}

async function reserveRoom(room, reservationObj) {
  console.log('CREATING RESERVATION:', room, reservationObj);
  try {
    const response = await axios.default.post(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations`, reservationObj, {
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log('RESERVATION SUCCESSFUL', response.data);
    return response.data;
  } catch (error) {
    console.log('ERROR IN MAKING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function deleteReservation(room, id) {
  console.log('DELETING RESERVATION:', id);
  try {
    const response = await axios.default.delete(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${id}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log('DELETED!', response.data);
    return response.data;
  } catch (error) {
    console.log('ERROR IN DELETING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function updateReservation(room, reservationId, updatedObj) {
  console.log('UPDATING RESERVATION:', reservationId);
  try {
    const response = await axios.default.patch(
      `${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${reservationId}`,
      updatedObj,
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    console.log('UPDATED!', response.data);
    return response.data;
  } catch (error) {
    console.log('ERROR IN UPDATING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function checkAvailability(room, start, end) {
  console.log(`CHECKING AVAILABILITY FOR: ${room} ${start} - ${end}`);
  try {
    const response = await axios.default.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${start}/${end}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.log('ERROR IN CHECKING AVAILABILITY:', error.response?.data);
    throw error;
  }
}

module.exports = {
  getReservations: getReservations,
  reserveRoom: reserveRoom,
  deleteReservation: deleteReservation,
  updateReservation: updateReservation,
  checkAvailability: checkAvailability,
  getReservationById: getReservationById,
};
