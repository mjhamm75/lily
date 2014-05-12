/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var async = require('async');
var common = require('../common/common.js');
var _ = require('underscore');

var ScoutRequirement = Bookshelf.Model.extend({
  tableName: 'scout_requirements',
  idAttribute: null
});

var ScoutRequirements = Bookshelf.Collection.extend({
  model: ScoutRequirement
});

var AdvancementRequirement = Bookshelf.Model.extend({
  tableName: 'advancement_requirements',
  idAttribute: null
});

var AdvancementRequirements = Bookshelf.Collection.extend({
  model: AdvancementRequirement
});

var toggleScoutRequirement = function(requirementId, scoutId, scoutRequirement, callback) {
  'use strict';
  if(scoutRequirement === undefined) {
    var scoutRequirement = new ScoutRequirement({
      requirement_id: requirementId,
      scout_id: scoutId,
      initials: 'mjh',
      completed_date: '2014-04-10'
    });
    scoutRequirement.save().then(function(data) {
      callback(data);
    });
  } else {
    var id = requirementId;
    Bookshelf.knex('scout_requirements')
      .where('scout_id', scoutId)
      .where('requirement_id', requirementId)
      .del().then(function(data) {
        callback({
          requirement_id: id,
          completed_date: null
        });
      });
  }
};

var getScoutRequirements = function(scoutId, callback) {
  'use strict';
  var scoutRequirements = new ScoutRequirements();
  scoutRequirements.query({
    where: {
      scout_id: scoutId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
};

var getAdvancementRequirements = function(advancementId, callback) {
  'use strict';
  var advancementRequirements = new AdvancementRequirements();
  advancementRequirements.query({
    where: {
      advancement_id: advancementId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
};

var getReqsToToggle = function(advancementRequirements, scoutRequirements, requirementId) {
  'use strict';
  var currentRequirement = common.getModelById(advancementRequirements, requirementId, 'requirement_id');
  if(_.isNull(currentRequirement.parent)) {
    var result = [];
    result.push(currentRequirement);
    return result;
  } else {
    var parent = common.getModelById(advancementRequirements, currentRequirement.parent, 'requirement_id');
    var children = parent.children;
    var childrenNeeded = parent.children_needed;
  }
};

exports.toggleRequirement = function(req, res) {
  'use strict';
  async.parallel({
    scoutRequirements: function(callback) {
      getScoutRequirements(req.body.scoutId, function(data) {
        callback(null, data);
      });
    },
    advancementRequirements: function(callback){
      getAdvancementRequirements(req.body.advancementId, function(data) {
        callback(null, data);
      });
    }
  }, function(err, result) {
    // var scoutRequirement = common.getModelById(result.scoutRequirements.toJSON(), req.params.requirementId, 'requirement_id');
    var reqs = getReqsToToggle(result.advancementRequirements.toJSON(), result.scoutRequirements.toJSON(), req.params.requirementId);
    // toggleScoutRequirement(req.params.requirementId, req.body.scoutId, scoutRequirement, function(result) {
    //   var r = [];
    //   r.push(result);
    //   res.json(r);
    // });
  });
};