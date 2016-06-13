var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.OPENSHIFT_NODEJS_PORT || 4000
const ip = process.env.OPENSHIFT_NODEJS_IP || "localhost"

app.listen(port, ip, 511, function(err) {
  console.log('listening on *:' + port);
});