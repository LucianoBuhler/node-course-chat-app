var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// event listener
socket.on('newMsg', function (message) {
  var formattedTime = moment(message.createdAt).format('hh:mm:ss a')
  // jQuery('<element id from html>')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMsg', function (message) {
  var formattedTime = moment(message.createdAt).format('hh:mm:ss a')
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
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
