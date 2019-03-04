const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
// Load User model
const User = require('../models/user');
const Post = require('../models/posts/postModel');

router.get('/getpostdata', ensureAuthenticated, async (req, res)=>{
  result = await Post.find().limit(20).catch((e)=>console.log(e));
  console.log(result);
  res.send(result);
});


module.exports = router;
