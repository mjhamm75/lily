// var getScouts = module.exports = function(req, res) {
//   'use strict';

//   res.json({ hello: 'world' });
// };

var Bookshelf = require('bookshelf').PG;

var Scout = Bookshelf.Model.extend({
  tablename: 'scouts'
});

var Scouts = Bookshelf.Collection.extend({
  model: Scout
});

exports.getScouts = function(req, res) {
  Scouts.fetch().then(function(collection) {
    console.log(collection);
  });
};