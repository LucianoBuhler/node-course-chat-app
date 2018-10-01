const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

 // resgister an event Listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT || 3000;

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
