const axios = require('axios').default;
const { BASE_URL, TOKEN } = require('../utils/config');
const { log } = require('../utils/logger');

async function getFavourites(uid) {
  try {
    const res = await axios.get(`${BASE_URL}/users/favourites`, {
      params: { uid: uid },
      headers: {
        Authorization: TOKEN,
      },
    });
    return res.data;
  } catch (error) {
    log('ERROR IN GETTING FAVOURITES:', error?.response?.status, error?.code);
    throw error;
  }
}

async function addFavourites(obj) {
  try {
    const res = await axios.post(`${BASE_URL}/users/favourites`, obj, {
      headers: {
        Authorization: TOKEN,
      },
    });
    return res.data;
  } catch (error) {
    log('ERROR IN ADDING FAVOURITES:', error?.response?.status, error?.code);
    throw error;
  }
}

module.exports = {
  getFavourites: getFavourites,
  addFavourites: addFavourites,
};
