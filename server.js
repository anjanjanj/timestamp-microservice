'use strict';

var express = require('express');
var moment = require('moment');

var app = express();
require('dotenv').load();

app.get('/:time', function(req, res) {
  var inputTime = req.params.time;
  var times = {};
  
  if (/^[0-9]*$/.test(inputTime)) {
    // unix date
    times.unix = inputTime;
    times.natural = moment.unix(inputTime).format('MMMM D, YYYY');
  }
  else if (moment(inputTime, 'MMMM D, YYYY').isValid()) {
    // natural date
    times.unix = moment(inputTime, 'MMMM D, YYYY').unix(),
    times.natural = inputTime
  }
  else {
    res.status(500).send('Invalid input');
    return;
  }
  
  res.send(times);
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});