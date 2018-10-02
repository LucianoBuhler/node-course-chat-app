const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'John';
    var text = 'Some message';
    var message = generateMessage(from, text);
    console.log(message);

    // expect(message.createAt).toBeA('number'); // DEPRECATED -TODO
    expect(typeof message.createdAt).toBe('number');
    // expect(message).toInclude({from, text}); // DEPRECATED
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Martin';
    var latitude = 15;
    var longitude = 100;
    var url = `https://www.google.com/maps?q=15,100`;
    var message = generateLocationMessage(from, latitude, longitude);

    // expect(message.createAt).toBeA('number'); // DEPRECATED -TODO
    expect(typeof message.createdAt).toBe('number');
    // expect(message).toInclude({from, text}); // DEPRECATED
    expect(message).toMatchObject({from, url});

  });
});
