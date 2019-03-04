const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  room:{
    type:String
  },
  lastFiveMessages: [{
    type: String,
    required: true
  }]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
