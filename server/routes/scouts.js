var Bookshelf = require('bookshelf').PG;

var Scout = Bookshelf.Model.extend({
  tableName: 'scouts'
});

var Scouts = Bookshelf.Collection.extend({
  model: Scout
});

exports.getScouts = function(req, res) {
  var scout = new Scouts();
  scout.fetch().then(function(collection) {
    var response = {
      meta: {},
      scouts: collection
    };
    res.json(response);
  });
};

exports.createScout = function(req, res) {
  var scout = new Scout();
  scout.set('first_name', req.body.first_name);
  scout.set('last_name', req.body.last_name);
  scout.set('rank', req.body.rank);
  scout.set('email', req.body.email);
  scout.set('password', req.body.password);
  scout.set('address', req.body.address);
  scout.set('city', req.body.city);
  scout.set('state', req.body.state);
  scout.set('zip', req.body.zip);
  scout.save().then(function(data) {
    res.json(data);
  });
};