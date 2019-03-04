/* eslint-disable one-var */
// constant declarations
const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash = require('connect-flash'),
  mysession = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(require('express-session')),
  DB= new (require('./js/data'))(), // Abstracted mongoose functions
  Image = new (require('./js/image'))(),
  // abstracted image manipulation functions
  socket = require('socket.io'),
  http = require('http'),
  uuidv1 = require('uuid/v1'),
  app = express(),
  lastFiveMessages = [];
mongoose.set('useFindAndModify', false);
// Passport Config
require('./config/passport')(passport);
// Connect to MongoDB
mongoose
    .connect('mongodb://localhost/mysocialmedia', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));
// EJS
app.set('view engine', 'ejs');
// Express body parser
app.use(express.urlencoded({extended: true}));
// mongo store
const store = new MongoDBStore({
  uri: 'mongodb://localhost',
  databaseName: 'mysocialmedia',
  collection: 'mySessions',
});
// express session
const session = mysession({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store: store, // MongoStore
  resave: true,
  saveUninitialized: true,
});
// use Express session
app.use(session);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash middleware
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Routes
app.use(express.static('public'));
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// create the server
const port = process.env.PORT || 5000,
  server = http.createServer(app),
  io = socket(server);

// share the session with socket.io
io.use(require('express-socket.io-session')(session, {
  autoSave: true,
})
);
// assigb io to app.io so it is available everywhere
app.io = io;
// Start the server
server.listen(port);
// socket routes
io.on('connection', (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  // when socket disconnects, remove it from the list:
  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`);
  });

  id = socket.handshake.session.passport.user|| false;
  if (id) {
    const result = DB.getUserData(id);
    if (!result) {
      return;
    }
    socket.handshake.session.userinfo = result;
    socket.handshake.session.save();
  }
  // Socket Routes
  socket.on('hello', async (data) => {
    const id = socket.handshake.session.passport.user;
    console.log(id);
    const result = await DB.getUserData(id);
    console.log(result.name);
    socket.emit('hello', result.name +' says ' + data);
    socket.broadcast.emit('hello', result.name +' says ' + data);
    lastFiveMessages.push(result.name +' says ' + data);
    if (lastFiveMessages.length > 5) {
      lastFiveMessages.splice(0, 1);
    }
    // save the message array
    DB.saveMessages(lastFiveMessages);
  });

  socket.on('getPostForm', (data) => {
    app.render('postInputForm', {data: {}}, (err, html) => {
      if (err) {
        value = err;
        socket.emit('sendPostForm', err);
        return;
      }
      socket.emit('sendPostForm', html);
    });
  });

  socket.on('newPost', async (data) => {
    const post = {};
    post.user_id = socket.handshake.session.passport.user;
    post.post_id = uuidv1();
    post.postText = data.text;
    post.postTitle = data.title;
    if (data.image) {
      post.postImage = await Image.resizeDbImage(data.image);
      console.log(post.postImage);
    }
    post.postImage = post.postImage || '/img/cat.large.jpg';
    post.userid = socket.handshake.session.passport.user;
    post.poster = (await DB.getUserData(post.user_id)).name;
    if (!DB.verifyPost(post, socket)) {
      console.log('ERROR something went wrong saving post');
      return;
    }
    DB.savePost(post);

    const res = {};
    res.data=post;
    socket.emit('newPost', res);
    socket.broadcast.emit('newPost', res);
    const messg =
        post.poster + ' has Posted an article';
    socket.emit('hello', messg);
    socket.broadcast.emit('hello', messg);
  });


  socket.on('getLastFiveMessages', async ( data)=>{
    const result = await DB.getLastFiveMessages();
    for ( messg of result) {
      socket.emit('hello', messg );
    }
  });

  socket.on('editSend', async (data) => {
    const post = {};
    post.user_id = socket.handshake.session.passport.user;
    post.postText = data.text;
    post.postTitle = data.title;
    post.postLink = data.link;
    post.postImage = data.image;
    post.thumbnail = data.thumbnail;
    post.userid = socket.handshake.session.passport.user;
    post.post_id = data.postid;
    post.poster = data.poster;
    if (!DB.verifyPost(post)) {
      socket.emit('hello', 'Something went wrong,');
      const res = Object.assign(post);
      res.postImage ='';
      res.thumbnail = '';
      return;
    }
    const result = await DB.updatePost(post);
    if (!result) {
      socket.emit('hello', 'Something went wrong, app.js 211');
      return;
    }
    socket.emit('dele');
    socket.broadcast.emit('reload');
    socket.broadcast.emit('hello', 'POST EDITED');
  });

  socket.on('loadPosts', async (e) => {
    const result = await DB.getLastTenPosts();
    result.map((e) => {
      const data = e;
      app.render('post', {data}, (err, html) => {
        if (err) {
          value = err;
          socket.emit('hello', 'SOMETHING WENT WRONG APP.JS 228');
          return;
        }
        const res = {};
        res.html = html;
        res.data = data;
        socket.emit('newPost', res);
      });
    });
  });

  socket.on('detailview', async (data) => {
    // data is the postid
    const result = await DB.getPost(data);
    if (!result) {
      socket.emit('hello', 'Something went wrong, no post id');
      return;
    }
    result.userid = socket.handshake.session.passport.user;
    app.render('detailview', {data: result}, (err, html) => {
      const res = {};
      res.html = html;
      res.data = result;
      socket.emit('detailview', res);
    });
  });


  socket.on('dele', async (data) => {
    const result = await DB.deletePost(data);
    if (!result) return;
    socket.emit('dele');
    socket.broadcast.emit('reload');
    socket.broadcast.emit('hello', 'POST DELETED');
  });

  socket.on('edit', async (data) => {
    const result = await DB.getPost(data);
    if (!result) {
      socket.emit('hello', 'Something went wrong, no post id');
      return;
    }
    result.userid = socket.handshake.session.passport.user;
    console.log(result);
    app.render('postInputForm', {data: result}, (err, html) => {
      socket.emit('edit', html);
    });
  });
});
