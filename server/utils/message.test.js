const expect = require('expect');

var {generateMessage} = require('./message');

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
