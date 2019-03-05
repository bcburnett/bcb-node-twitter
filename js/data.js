/* eslint-disable require-jsdoc */

module.exports = class db {
  /**
  */
  constructor() {
    this. mongoose = require('mongoose');
    this. User = require('../models/user');
    this. Chat = require('../models/chatstate');
    this. Post = require('../models/posts/postModel');
  }

  /**
   * @param {array} arry
  */
  saveMessages(arry) {
    this.Chat.findOne({room: 'room1'}).then((res, err) => {
      res.lastFiveMessages = arry;
      res.save().then((res, err) => console.log(res, err));
    });
  }

  async getLastFiveMessages() {
    const result = await this.Chat.findOne({room: 'room1'})
        .then((res)=>res.lastFiveMessages)
        .catch((e)=>false);
    return result;
  }

  // check post data
  // post object
  // post.user_id = socket.handshake.session.passport.user;
  // post.post_id = uuidv1();
  // post.postText = data.text;
  // post.postTitle = data.title;
  // post.postImage = data.image;
  // post.thumbnail = data.thumbnail;
  // post.userid = socket.handshake.session.passport.user;
  // post.poster = socket.handshake.session.userinfo.name;

  verifyPost(post) {
    if (!post.user_id || !post.post_id || !post.userid || !post.poster) {
      return false;
    }
    return true;
  }

  async savePost(post) {
    // eslint-disable-next-line new-cap
    const mypost = this.Post(post);
    const result = await mypost.save()
        .then((res)=>true)// resolve the promise
        .catch((e)=>false);
    return result;
  }

  async getPost(postid) {
    const result = await this.Post.findOne({post_id: postid})
        .then((res)=>res)// resolve the promise
        .catch((e)=> false);
    return result;
  }

  async updatePost(post) {
    const thePost = await this.Post
        .findOneAndUpdate({'post_id': post.post_id}, post)
        .then((res)=>res)// resolve the promise
        .catch((e)=> false);
    return thePost;
  }

  async deletePost(id) {
    const result = await this.Post.findOneAndDelete({'post_id': id})
        .then((res)=>res)
        .catch((e)=>false);
    return result;
  }

  async getLastTenPosts() {
    const response = await this.Post.find()
        .sort({_id: 1})
        .then((res) => res) // resolve the promise
        .catch((e)=>false);
    return response;
  }

  async getUserData(id) {
    const result = await this.User.findById(id)
        .then((res)=>res)
        .catch((e)=>false);
    return result;
  }
};
