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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMsg', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery(`<a href="_blank">My current location</a>`);
  // injection
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMsg', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  });
});

var locationButton = jQuery('#send-location'); // the index.html button id
// jQuery().on(<event), <funtion>)
locationButton.on('click', function () {
  if (!navigator.geolocation){
    return alert(`Geolocation not suported by your browser.`)
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Sendo location');
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Sendo location');
    alert('Unable to fetch location.')
  });
});
