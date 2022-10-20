const axios = require('axios');
require('dotenv').config();

const baseUrl = process.env.NODE_ENV === 'development'
  ? process.env.DEV_BASE_URL
  : process.env.BASE_URL
const domain = process.env.DOMAIN;
const token = process.env.REQUEST_TOKEN;

async function getReservations(room, today = false) {
  console.log('GETTING RESERVATIONS FOR ROOM', room);
  try {
    const response = await axios.default.get(`${baseUrl}/calendar/${room}@${domain}/reservations?today=${today}`, {
      headers: {
        Authorization: token,
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
    const response = await axios.default.get(`${baseUrl}/calendar/${room}@${domain}/reservations/${reservationId}`, {
      headers: {
        Authorization: token,
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
    const response = await axios.default.post(`${baseUrl}/calendar/${room}@${domain}/reservations`, reservationObj, {
      headers: {
        Authorization: token,
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
    const response = await axios.default.delete(`${baseUrl}/calendar/${room}@${domain}/reservations/${id}`, {
      headers: {
        Authorization: token,
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
      `${baseUrl}/calendar/${room}@${domain}/reservations/${reservationId}`,
      updatedObj,
      {
        headers: {
          Authorization: token,
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
    const response = await axios.default.get(`${baseUrl}/calendar/${room}@${domain}/reservations/${start}/${end}`, {
      headers: {
        Authorization: token,
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
