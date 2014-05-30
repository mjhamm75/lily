var request = require('request');

request('http://localhost:9000/scouts/1', function(error, response, body){
  'use strict';
  console.log(response.body);
});