// var getScouts = module.exports = function(req, res) {
//   'use strict';

//   res.json({ hello: 'world' });
// };

var Bookshelf = require('bookshelf').PG;

var Scout = Bookshelf.Model.extend({
  tableName: 'scouts'
});

var Scouts = Bookshelf.Collection.extend({
  model: Scout
});

exports.getScouts = function(req, res) {
  var scout = new Scouts();
  console.log(scout);
  scout.fetch().then(function(collection) {
    var response = {
      meta: {},
      scouts: collection
    };
    res.json(response);
  });
};