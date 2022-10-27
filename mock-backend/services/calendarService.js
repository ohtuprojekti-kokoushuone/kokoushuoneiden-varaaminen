const axios = require('axios').default;
const { AxiosError } = require('axios');
const { BASE_URL, DOMAIN, TOKEN } = require('../utils/config');
const { differenceInMinutes } = require('date-fns');
const { log } = require('../utils/logger');

async function getReservations(room, today = false) {
  log('GETTING RESERVATIONS FOR ROOM', room);
  try {
    const response = await axios.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations?today=${today}`, {
      headers: {
        Authorization: TOKEN,
      },
    });

    log('GOT RESPONSE', response.data);
    return response.data;
  } catch (error) {
    log(error);
    log('ERROR IN GETTING RESERVATIONS:', error.response.status, error.code);
    throw error;
  }
}

async function getReservationById(room, reservationId) {
  log('GETTING RESERVATION BY ID', reservationId);
  try {
    const response = await axios.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${reservationId}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    log('GOT RESPONSE', response.data);
    return response.data;
  } catch (error) {
    log('ERROR IN GETTING EVENT: ', error.response.status, error.response.data.message);
    throw error;
  }
}

async function reserveRoom(room, reservationObj) {
  if (differenceInMinutes(new Date(reservationObj.end), new Date(reservationObj.start)) > 120) {
    throw new AxiosError(
      'Request failed with status code 400',
      'ERR_BAD_REQUEST',
      {},
      {},
      {
        status: 400,
        data: { message: 'Error: Maximum time for a reservation is 2 hours' },
      }
    );
  }
  log('CREATING RESERVATION:', room, reservationObj);
  try {
    const response = await axios.post(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations`, reservationObj, {
      headers: {
        Authorization: TOKEN,
      },
    });
    log('RESERVATION SUCCESSFUL', response.data);
    return response.data;
  } catch (error) {
    log('ERROR IN MAKING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function deleteReservation(room, id) {
  log('DELETING RESERVATION:', id);
  try {
    const response = await axios.delete(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${id}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    log('DELETED!', response.data);
    return response.data;
  } catch (error) {
    log('ERROR IN DELETING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function updateReservation(room, reservationId, updatedObj) {
  log('UPDATING RESERVATION:', reservationId);
  try {
    const response = await axios.patch(
      `${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${reservationId}`,
      updatedObj,
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    log('UPDATED!', response.data);
    return response.data;
  } catch (error) {
    log('ERROR IN UPDATING RESERVATION:', error.response.status, error.code);
    throw error;
  }
}

async function checkAvailability(room, start, end) {
  log(`CHECKING AVAILABILITY FOR: ${room} ${start} - ${end}`);
  try {
    const response = await axios.get(`${BASE_URL}/calendar/${room}@${DOMAIN}/reservations/${start}/${end}`, {
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    log('ERROR IN CHECKING AVAILABILITY:', error.response?.data);
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
