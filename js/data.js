/* eslint-disable require-jsdoc */

module.exports = class db {
  /**
  */
  constructor() {
    this.User = require('../models/user');
    this.Chat = require('../models/chatstate');
    this.Post = require('../models/posts/postModel');
    this.Comment = require('../models/posts/commentModel');
    this.Like = require('../models/posts/likesModel');
  }


  // posts

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
        .then((res)=>res)// resolve the promise
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

  // users

  async getUserData(id) {
    const result = await this.User.findById(id)
        .then((res)=>res)
        .catch((e)=>false);
    return result;
  }

  async userExists(email) {
    let result = await this.User.findOne({'email': email})
        .then((res)=>res)
        .catch((e)=>{
          return {false: false};
        });
    if (result === null) {
      result = {false: false};
    }
    return result;
  }

  async userNameExists(name) {
    let result = await this.User.findOne({'name': name})
        .then((res)=>res)
        .catch((e)=>{
          return {false: false};
        });
    if (result === null) {
      result = {false: false};
    }
    return result;
  }

  async postComment(comment) {
    // eslint-disable-next-line new-cap
    const myComment = this.Comment(comment);
    const result = await myComment.save()
        .then((res)=>res)// resolve the promise
        .catch((e)=>{
          return {false: false};
        });
    return result;
  }

  async getComments(postid) {
    const result = await this.Comment.find({'post': postid})
        .then((res)=>res)// resolve the promise
        .catch((e)=>{
          return {false: false};
        });
    return result;
  }

  async deleteComment(id) {
    const result = await this.Comment.findOneAndDelete({'_id': id})
        .then((res)=>res)
        .catch((e)=>false);
    return result;
  }

  async saveLike(e) {
    const test = await this.Like.find({'post': e.post, 'userid': e.userid}).then((res)=>res || []);
    console.log(test);
    if (test.length !== 0) return;
    // eslint-disable-next-line new-cap
    const mylike = this.Like(e);
    const result = await mylike.save()
        .then((res)=>res)// resolve the promise
        .catch((e)=>{
          return {false: false};
        });
    return result;
  }

  async getLikes(e) {
    const result = await this.Like.find({'post': e})
        .then((res)=>res || {})// resolve the promise
        .catch((e)=>{
          return {false: false};
        });
    return result;
  }

  async deleteLikes(e) {
    const result = await this.Like.deleteMany({'post': e})
        .then((res)=>res || {})// resolve the promise
        .catch((e)=>{
          return {false: false};
        });
    return result;
  }
};
