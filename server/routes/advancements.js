/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var common = require('../common/common.js');
var _ = require('underscore');

var getScoutRequirements = function(scoutId, requirementsArray, callback) {
    Bookshelf.knex('scout_requirements')
      .where('scout_id', '=', scoutId)
      .whereIn('requirement_id', requirementsArray)
      .then(function(data) {
        callback(data);
      });
    };

exports.getRequirements = function(req, res) {
  Bookshelf.knex('requirements')
    .join('advancement_requirements', 'requirements.internal_id', '=', 'advancement_requirements.requirement_id')
    .where({
      'advancement_requirements.advancement_id': req.params.id
    })
    .then(function(advancementReqs) {
      var reqIds = _.pluck(advancementReqs, 'id');
      getScoutRequirements(1, reqIds, function(scoutRequirements) {
        var result = common.combineRequirementsWithScoutRequirements(advancementReqs, scoutRequirements);
        res.json(result);
      });
    });
};
