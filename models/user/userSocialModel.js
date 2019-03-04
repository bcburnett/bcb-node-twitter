
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  website:{
  type: String,
  required: false,
  error: e => {}
},about: {
  type: String,
  required: false,
  error: e => {}
},
school: {
  type: String,
  required: false,
  error: e => {}
},
gender: {
  type: String,
  required: false,
  error: e => {}
},
birthday: {
  type: String,
  required: false,
  error: e => {}
},
country_id: {
  type: String,
  required: false,
  error: e => {}
},
website: {
  type: String,
  required: false,
  error: e => {}
},
facebook: {
  type: String,
  required: false,
  error: e => {}
},
google: {
  type: String,
  required: false,
  error: e => {}
},
twitter: {
  type: String,
  required: false,
  error: e => {}
},
linkedin: {
  type: String,
  required: false,
  error: e => {}
},
youtube: {
  type: String,
  required: false,
  error: e => {}
},
vk: {
  type: String,
  required: false,
  error: e => {}
},
instagram: {
  type: String,
  required: false,
  error: e => {}
}
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
