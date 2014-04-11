/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var _ = require('underscore');

exports.getAdvancement = function(req, res) {
  Bookshelf.knex('requirements')
    .join('advancement_requirements', 'requirements.internal_id', '=', 'advancement_requirements.requirement_id')
    .where({
      'advancement_requirements.advancement_id': req.params.id
    })
    .then(function(data) {
      var requirements = _.each(data, function(d) {
        var r = {
          id: d.id,
          description: d.description
        };
        return r;
      });
      var result = {
        meta: {},
        requirements: requirements
      };
      res.json(result);
    });
};
