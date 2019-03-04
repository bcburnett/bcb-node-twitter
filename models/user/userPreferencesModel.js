const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  avatar: {
    type: String,
    required: false,
    error: (e) => {},
  },

  imFollowing: {
    type: Array,
    required: false,
    error: (e) => {},
  },
  followingMe: {
    type: Array,
    required: false,
    error: (e) => {},
  },
  posts: {
    type: Array,
    required: false,
    error: (e) => {},
  },
  message_history: {
    type: String,
    required: false,
    error: (e) => {},
  },

  show_activities_privacy: {
    type: String,
    required: false,
    error: (e) => {},
  },
  birth_privacy: {
    type: String,
    required: false,
    error: (e) => {},
  },
  visit_privacy: {
    type: String,
    required: false,
    error: (e) => {},
  },
  showlastseen: {
    type: String,
    required: false,
    error: (e) => {},
  },
  emailNotification: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_liked: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_wondered: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_shared: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_followed: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_commented: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_visited: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_liked_page: {
    type: String,
    required: false,
    error: (e) => {},
  },
  e_mentioned: {
    type: String,
    required: false,
    error: (e) => {},
  },

});
const User = mongoose.model('User', UserSchema);

module.exports = User;

