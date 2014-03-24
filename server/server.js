var express = require('express');
require('./config/bookshelf.js');
var port = process.env.PORT || 9000;
var scouts = require('./routes/scouts.js');

var app = express();
app.use(express.bodyParser());

app.get('/scouts/:id', scouts.getScout);
app.get('/scouts', scouts.getScouts);
app.post('/scouts', scouts.createScout);

app.get('*', function(req, res) {
    res.send("This would be some more HTML");
});

app.listen(port, function() {
  'use strict';
  console.log('Listening on:', port);
});