/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var common = require('../common/common.js');
var _ = require('underscore');

var getScoutRequirements = function(scoutId, requirementsArray, callback) {
  'use strict';

  Bookshelf.knex('scout_requirements')
    .where('scout_id', '=', scoutId)
    .whereIn('requirement_id', requirementsArray)
    .then(function(data) {
      callback(data);
    });
  };

exports.getRequirements = function(req, res) {
  'use strict';

  Bookshelf.knex('requirements')
    .join('advancement_requirements', 'requirements.id', '=', 'advancement_requirements.requirement_id')
    .where({
      'advancement_requirements.advancement_id': req.params.id
    })
    .then(function(advancementReqs) {
      var reqIds = _.pluck(advancementReqs, 'id');
      getScoutRequirements(req.query.scoutId, reqIds, function(scoutRequirements) {
        var reqs = common.combineRequirementsWithScoutRequirements(advancementReqs, scoutRequirements);
        var result = {
          requirements: reqs
        };
        res.json(result);
      });
    });
};

exports.updateReqsRemaining = function() {
  'use strict';

};