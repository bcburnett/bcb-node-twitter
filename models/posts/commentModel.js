const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

  userid: {
    type: String,
    required: false,
  },
  post: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  currentUser: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

/*
comment: "df"
currentUser: "5c95b98d3b93163395349b10"
name: "Brian C. Burnett"
post: "9dc8c640-4fd5-11e9-9616-6f4023f5d618"
poster: "Brian C. Burnett"
userid: "5c95b98d3b93163395349b10"
*/
