/* global exports */

var Bookshelf = require('bookshelf').PG;

var Advancement = Bookshelf.Model.extend({
  tableName: 'advancements'
});

exports.getAdvancement = function(req, res) {
  var advancement = new Advancement({id: req.params.id});
  advancement.fetch().then(function(data) {
    res.json(data);
  });
};
