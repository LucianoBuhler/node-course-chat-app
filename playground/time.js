var moment = require('moment');

// Timestamp
// Jan 1st 1970 00:00:00 am

// var date = moment();
// console.log(date.format('MMM YYYY DD'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createAt = 1234;
var date = moment(createAt);
console.log(date.format('h:mm:ss a'));
