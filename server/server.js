var express = require('express');
var port = process.env.PORT || 9000;

var app = express();

app.get('*', function(request, response) {
    response.send("This would be some more HTML");
});

app.listen(port, function() {
  'use strict';
  console.log('Listening on:', port);
});