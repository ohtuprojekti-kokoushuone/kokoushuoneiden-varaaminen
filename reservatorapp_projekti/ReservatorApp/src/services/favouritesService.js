const FavouriteHandler = require('../models/favouriteModel_db');

async function getFavouritesByUid(uid) {
  console.log('uid is', uid);
  try {
    let data = await FavouriteHandler.getFavouritesByUid(uid);
    try {
      return data.favourites;
    } catch {
      return [];
    }
  } catch (error) {
    console.log('Error in getting favourites', error.response.data.error);
    throw new Error('Error in getting favourites: ' + error.response.data.error.message);
  }
}

async function addFavourites(obj) {
  try {
    let data = await FavouriteHandler.addFavourites(obj);
    try {
      return data.favourites;
    } catch {
      return [];
    }
  } catch (error) {
    console.log('Error in getting favourites', error.response.data.error);
    throw new Error('Error in getting favourites: ' + error.response.data.error.message);
  }
}

module.exports = { addFavourites: addFavourites, getFavouritesByUid: getFavouritesByUid };
