# Node.js & Passport Login

This is a user login and registration app using
 Node.js,
 Express,
 Passport,
 Mongoose,
 socketio,
 sharpjs,
 custom elements based on @polymer/litelement

Everything on the browser side is a custom element
node listens over sockets and express routes

change the submit addresses for the form elements in login.html and register.html in the public directory
currently it will try to log you in or register on the demo server.

demo site address: https://brian.newlondonweb.com:5000

site is self-signed so your browser is going to put up a warning click advanced and continue

You should now be able to register and login.


### Features

registration form with validation

login form

real-time chat

video stream (limited to one at a time may be removed or improved at a later date)

create posts with pictures

edit posts

  (edits are propagated in real-time)

delete posts

create comments

delete comments

  (owners of posts can delete any comment attached to the post)

  (owners of comments can delete their own comments)

like posts

express sessions

passport local auth

session persistence via mongodb

modular front end design, the components just snap together to form the page



### Version: 0.0.0

This is a Work In Progress

node starter repo in node_passport_login-master.zip

Thanks to https://github.com/bradtraversy/node_passport_login (have to rename users model to users.js)

tutorial for the package https://www.youtube.com/watch?v=6FOq4cUdH8k&t=2s By Traversy Media

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

