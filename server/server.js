const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

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
  app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
};

module.exports = {app};
