
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

  post_id: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
  postText: {
    type: String,
    required: false,
  },
  postTitle: {
    type: String,
    required: false,
  },
  postImage: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

