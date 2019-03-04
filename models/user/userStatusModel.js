
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

status: {
  type: String,
  required: false,
  error: e => {}
},
active: {
  type: String,
  required: false,
  error: e => {}
},
admin: {
  type: String,
  required: false,
  error: e => {}
},
type: {
  type: String,
  required: false,
  error: e => {}
},
registered: {
  type: String,
  required: false,
  error: e => {}
},
lastseen: {
  type: String,
  required: false,
  error: e => {}
},
verified: {
  type: String,
  required: false,
  error: e => {}
},
confirm_followers: {
  type: String,
  required: false,
  error: e => {}
},
ip_address: {
  type: String,
  required: false,
  error: e => {}
},
registrationpipelinestep:{
  type:string
}
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
