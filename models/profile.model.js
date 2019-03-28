const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  hobbies: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  userid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

/*
      facebook: String,
      twitter: String,
      hobbies: String,
      image: String,
*/
