const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');
const DB= new (require('../js/data'))();
const {ensureAuthenticated} = require('../config/auth');

// Login Page
app.get('/login', (req, res) => res.redirect('/login.html'));

// check e-mail
app.get('/checkemail', async (req, res)=>{
  const email = req.query.email;
  res.send(await DB.userExists(email));
});

// get comments
app.get('/getComments', ensureAuthenticated, async (req, res)=>{
  const post = req.query.post;
  const comments = await DB.getComments(post);
  res.send(comments);
});

// get likes
app.get('/getLikes', ensureAuthenticated, async (req, res)=>{
  const post = req.query.post;
  const likes = await DB.getLikes(post);
  res.send(likes);
});

// check user name
app.get('/checkname', async (req, res)=>{
  const name = req.query.name;
  res.send(await DB.userNameExists(name));
});

// Register Page
app.get('/register', (req, res) => res.redirect('/register.html'));

// Register
app.post('/register', (req, res) => {
  const {name, email, password, password2} = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please enter all fields'});
  }

  if (password != password2) {
    errors.push({msg: 'Passwords do not match'});
  }

  if (password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({email: email}).then((user) => {
      if (user) {
        errors.push({msg: 'Email already exists'});
        res.redirect('/register.html');
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then((user) => {
                  passport.authenticate('local', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/users/login',
                    failureFlash: true,
                  })(req, res);
                })
                .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
app.post('/login', (req, res, next) => {
  
  passport.authenticate('local', {
    successRedirect: '/dashboard.html',
    failureRedirect: '/login.html',
    failureFlash: true,
  })(req, res, next);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = app;
