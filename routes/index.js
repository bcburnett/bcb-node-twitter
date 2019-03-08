const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
// const Mydb = require('../views/js/data');
// const DB = new Mydb();

const DB = new (require('../js/data'))();
// Welcome Page
router.get('/', (req, res) =>{
  if (req.user) {
    res.redirect('/dashboard.html'); // logged in
  } else {
    res.redirect('/login.html'); // not logged in
  }
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  res.redirect('/dashboard.html');
  req.app.io.emit('hello', req.user.name + ' Has Joined' );
});


module.exports = router;
