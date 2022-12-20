const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Cannot connect to mongodb:'));

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'development' ? process.env.DEV_MONGODB_URI : process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const FavouriteSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  uid: {
    type: String,
    required: [true, 'Favourite object requires a user id'],
    unique: true,
  },
  favourites: [String],
});

FavouriteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.id;
  },
});

const favouriteModel = mongoose.model('Favourite', FavouriteSchema);

const FavouriteHandler = {
  getFavouritesByUid: async function (uid) {
    return favouriteModel.findOne({ uid: uid });
  },
  addFavourites: async function (obj) {
    return favouriteModel.findOneAndUpdate(
      { uid: obj.uid },
      { favourites: obj.favourites },
      { new: true, upsert: true }
    );
  },
  deleteFavourite: async function (uid) {
    return favouriteModel.deleteOne({ uid: uid });
  },
  // these are for testing purposes
  getAll: async function () {
    return favouriteModel.find();
  },
};

module.exports = FavouriteHandler;
