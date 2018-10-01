var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// event listener
socket.on('newMsg', function (message) {
  console.log('newMsg', message);
});
