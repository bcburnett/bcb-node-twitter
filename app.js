/* eslint-disable one-var */
// constant declarations
const express = require('express'),
  fs=require('fs'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash = require('connect-flash'),
  mysession = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(require('express-session')),
  DB= new (require('./js/data'))(), // Abstracted mongoose functions
  Image = new (require('./js/image'))(),
  // abstracted image manipulation functions
  socket = require('socket.io'),
  helmet = require('helmet'),
  https = require('https'),
  uuidv1 = require('uuid/v1'),
  app = express();
// eslint-disable-next-line max-len
app.use(require('connect-logger')({immediate: true, format: `%date %status %method %url (%route - %time)`}));

// set up plain http server for redirect to https
const http = express();

// set up a route to redirect http to https
http.get('*', function(req, res) {
  console.log(req.connection.remoteAddress, req.url, req.headers.host, new Date());
  res.redirect('https://' + req.headers.host + req.url );
});
http.listen(80);

mongoose.set('useFindAndModify', false);

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost/mysocialmedia', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


// Express body parser
app.use(express.urlencoded({extended: true}));
app.use(helmet());

// mongo store
const store = new MongoDBStore({
  uri: 'mongodb://localhost/mysocialmedia',
  session: 'mySessions',
});
// express session
const session = mysession({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store, // MongoStore
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
const port = process.env.PORT || 443,
  httpsOptions = {
    cert: fs.readFileSync('./ssh/cert.pem'),
    key: fs.readFileSync('./ssh/key.pem'),
    passphrase: 'password',
  },
  server = https.createServer(httpsOptions, app),
  io = socket(server);

// share the session with socket.io
io.use(require('express-socket.io-session')(session, {
  autoSave: true,
}));

// assign io to app.io so it is available everywhere
app.io = io;

// Start the server
server.listen(port);

// socket routes
io.on('connection', async (socket) => {
  // when socket disconnects, remove it from the list:
  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`);
  });


  id = socket.handshake.session.passport.user|| false;
  if (id) {
    const result = await DB.getUserData(id);
    if (!result) {
      socket.emit('login');
      return;
    }
    io.emit('hello', result.name + ' ' +result._id+' has joined '+ socket.id);
    socket.handshake.session.userinfo = result;
    socket.handshake.session.save();
  }
  // Socket Routes

  socket.on('stream', function(image) {
    socket.broadcast.emit('stream', image);
    socket.emit('stream', image);
  });

  socket.on('hello', async (data) => {
    const id = socket.handshake.session.passport.user;
    const result = await DB.getUserData(id);
    socket.emit('hello', result.name +' says ' + data);
    socket.broadcast.emit('hello', result.name +' says ' + data);
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
    post.postImage = data.image;

    // eslint-disable-next-line max-len
    post.postImage = post.postImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
    post.userid = socket.handshake.session.passport.user;
    post.poster = (await DB.getUserData(post.user_id)).name;
    if (!DB.verifyPost(post, socket)) {
      return;
    }
    const savedPost = await DB.savePost(post);
    const res = {};
    res.data=savedPost;
    res.currentUser = socket.handshake.session.passport.user;
    socket.emit('newPost', res);
    socket.broadcast.emit('newPost', res);
  });


  socket.on('getLastFiveMessages', async ( data)=>{
    const result = [];
    if (result !== []) {
      for ( messg of result) {
        socket.emit('hello', messg );
      }
    }
  });

  socket.on('editPost', async (data) => {
    const post = {};
    post.user_id = socket.handshake.session.passport.user;
    post.postText = data.postText;
    post.postTitle = data.postTitle;
    post.postLink = data.link;
    post.postImage = data.postImage;
    post.userid = socket.handshake.session.passport.user;
    post.post_id = data.post_id;
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
    socket.emit('editPost', data);
    socket.broadcast.emit('editPost', data);
  });

  socket.on('loadPosts', async (e) => {
    const result = await DB.getLastTenPosts();
    result.map((e) => {
      const data=e;
      data.currentUser=socket.handshake.session.passport.user;
      const res = {};
      res.data = data;
      res.currentUser=socket.handshake.session.passport.user;
      socket.emit('newPost', res);
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
    socket.emit('dele', data);
    socket.broadcast.emit('dele', data);
  });

  socket.on('welcome', async (e)=>{
    const id = socket.handshake.session.passport.user;
    const info = await DB.getUserData(id);
    socket.emit('welcome', info);
  });

  socket.on('postComment', async (e)=> {
    const res = await DB.postComment(e);
    io.emit('newComment', res);
  });

  socket.on('deleteComment', async (e)=> {
    io.emit('deleteComment', e);
    await DB.deleteComment(e.id);
  });

  socket.on('like', async (e)=>{
    result = await DB.saveLike(e);
    io.emit('like', result);
  });

  socket.on('deleteLikes', async (e)=>{
    await DB.deleteLikes(e);
  });

  socket.on('submitProfile', async (data)=>{
    const mydata = data;
    mydata.image = await Image.resizeProfileImage(data.image);
    DB.saveProfile(data);
    socket.emit('loadProfile', mydata);
  });

  socket.on('loadProfile', async (data)=>{
    const res = await DB.getProfile(data);
    socket.emit('loadProfile', res);
  });
});
