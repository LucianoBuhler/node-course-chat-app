var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMsg', {
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
