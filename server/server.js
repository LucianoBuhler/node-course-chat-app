const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

 // resgister an event Listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMsg', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMsg', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMsg', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMsg', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMsg', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMsg', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

app.use(express.static(publicPath)); // config the middleware

// use is a method to configure the middleware used by the routes of the Express HTTP server object
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('First Page');

  res.send('First Page');
});

app.get('/index', (req, res) => {
  console.log('Index Page');

  res.send('Index Page');
});

// inserted to solve problems with the automatized test
if(!module.parent) {
  server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
};

module.exports = {app};
