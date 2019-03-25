const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

  comment_id: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
  post_id: {
    type: String,
    required: false,
  },
  parent_comment: {
    type: String,
    required: false,
  }
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
