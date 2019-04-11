const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

// Welcome Page
router.get('/', (req, res) =>{
  console.log(req.connection.remoteAddress);
  if (req.user) {
    res.redirect('/dashboard'); // logged in
  } else {
    res.redirect('/users/login'); // not logged in
  }
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  console.log(req.connection.remoteAddress);
  res.redirect('/dashboard.html');
  req.app.io.emit('hello', req.user.name + ' Has Joined' );
});


module.exports = router;
