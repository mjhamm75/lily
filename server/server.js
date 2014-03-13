var express = require('express');

var app = express();

app.get('*', function(request, response) {
    response.send("This would be some more HTML");
});

app.listen(9000);