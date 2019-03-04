const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({


  start_up: {
    type: String,
    required: false,
    error: e => {}
  },
  start_up_info: {
    type: String,
    required: false,
    error: e => {}
  },
  startup_follow: {
    type: String,
    required: false,
    error: e => {}
  },
  startup_image: {
    type: String,
    required: false,
    error: e => {}
  },
  last_email_sent: {
    type: String,
    required: false,
    error: e => {}
  },
  phone_number: {
    type: String,
    required: false,
    error: e => {}
  },
  sms_code: {
    type: String,
    required: false,
    error: e => {}
  },
  is_pro: {
    type: String,
    required: false,
    error: e => {}
  },
  pro_time: {
    type: String,
    required: false,
    error: e => {}
  },
  pro_type: {
    type: String,
    required: false,
    error: e => {}
  },
  joined: {
    type: String,
    required: false,
    error: e => {}
  },
  css_file: {
    type: String,
    required: false,
    error: e => {}
  },
  timezone: {
    type: String,
    required: false,
    error: e => {}
  },
  referrer: {
    type: String,
    required: false,
    error: e => {}
  },
  balance: {
    type: String,
    required: false,
    error: e => {}
  },
  paypal_email: {
    type: String,
    required: false,
    error: e => {}
  },
  notifications_sound: {
    type: String,
    required: false,
    error: e => {}
  },
  order_posts_by: {
    type: String,
    required: false,
    error: e => {}
  },
  social_login: {
    type: String,
    required: false,
    error: e => {}
  },
  device_id: {
    type: String,
    required: false,
    error: e => {}
  },
  web_device_id: {
    type: String,
    required: false,
    error: e => {}
  },
  wallet: {
    type: String,
    required: false,
    error: e => {}
  },
  lat: {
    type: String,
    required: false,
    error: e => {}
  },
  lng: {
    type: String,
    required: false,
    error: e => {}
  },
  last_location_update: {
    type: String,
    required: false,
    error: e => {}
  },
  share_my_location: {
    type: String,
    required: false,
    error: e => {}
  },
  last_data_update: {
    type: String,
    required: false,
    error: e => {}
  },
  details: {
    type: String,
    required: false,
    error: e => {}
  },
  sidebar_data: {
    type: String,
    required: false,
    error: e => {}
  },
  last_avatar_mod: {
    type: String,
    required: false,
    error: e => {}
  },
  last_cover_mod: {
    type: String,
    required: false,
    error: e => {}
  },
  points: {
    type: String,
    required: false,
    error: e => {}
  },
  last_follow_id: {
    type: String,
    required: false,
    error: e => {}
  },
  share_my_data: {
    type: String,
    required: false,
    error: e => {}
  },
  last_login_data: {
    type: String,
    required: false,
    error: e => {}
  },
  two_factor: {
    type: String,
    required: false,
    error: e => {}
  },
  vericons: {
    type: String,
    required: false,
    error: e => {}
  },
  adi_num_invites: {
    type: String,
    required: false,
    error: e => {}
  },
  sense: {
    type: String,
    required: false,
    error: e => {}
  },
  camgirl: {
    type: String,
    required: false,
    error: e => {}
  },
  subscribed: {
    type: String,
    required: false,
    error: e => {}
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
