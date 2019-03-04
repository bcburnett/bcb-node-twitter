const mongoose = require('mongoose');

const UserInformationSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    error: (e) => {},
  },
  last_name: {
    type: String,
    required: true,
    error: (e) => {},
  },

  address: {
    address1: {
      type: String,
      required: true,
      error: (e) => {},
    },
    address2: {
      type: String,
      required: false,
      error: (e) => {},
    },
    city: {
      type: String,
      required: true,
      error: (e) => {},
    },
    state: {
      type: String,
      required: true,
      error: (e) => {},
    },
    zip: {
      type: String,
      required: true,
      error: (e) => {},
    },
    country: {
      type: String,
      required: true,
      error: (e) => {},
    },
  },
});
const User = mongoose.model('UserInformation', UserInformationSchema);

module.exports = User;

