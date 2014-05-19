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

var toggleScoutRequirement = function(scoutId, scoutRequirement, advancementRequirement, callback) {
  'use strict';
  if(scoutRequirement === undefined) {
    var scoutRequirement = new ScoutRequirement({
      requirement_id: advancementRequirement.requirement_id,
      scout_id: scoutId,
      initials: 'mjh',
      completed_date: '2014-04-10'
    });
    scoutRequirement.save().then(function(data) {
      callback(data);
    });
  } else {
    var id = advancementRequirement.requirement_id;
    Bookshelf.knex('scout_requirements')
      .where('scout_id', scoutId)
      .where('requirement_id', id)
      .del().then(function() {
        callback({
          requirement_id: id,
          completed_date: null
        });
      });
  }
};

var toggleScoutRequirements = function(advancementReqs, scoutReqs, scoutId) {
  'use strict';
  async.each(advancementReqs, function(req, callback) {
    var scoutReq = _.findWhere(scoutReqs, { requirement_id: req.requirement_id });
    toggleScoutRequirement(scoutId, scoutReq, req, function(data) {
      callback();
    });
  });
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

var getChildrenComplete = function(children, scoutRequirements) {
  'use strict';
  var count = 0;
  _.each(children, function(child) {
    var req = _.findWhere(scoutRequirements, { requirement_id: child});
    if(req && req.completed_date) {
      count = count + 1;
    }
  });
  return count;
};

var getReqsToToggle = function(advancementRequirements, scoutRequirements, requirementId, scoutId) {
  'use strict';
  var currentRequirement = common.getModelById(advancementRequirements, requirementId, 'requirement_id');
  var result = [];
  if(_.isNull(currentRequirement.parent)) {
    if(currentRequirement.children) {
      // Do nothing
      console.log('A parent - DO NOTHING');
    } else {
      console.log('SINGLE');
      result.push(currentRequirement);
      return result;
    }
  } else {
    console.log('CHILD');
    toggleScoutRequirement(requirementId, scoutId, scoutRequirement, function() {

    });
    var parent = common.getModelById(advancementRequirements, currentRequirement.parent, 'requirement_id');
    var children = parent.children;
    var childrenNeeded = parent.children_needed;
    var childrenCompleteCount = getChildrenComplete(children, scoutRequirements);
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
    var advancementReqs = getReqsToToggle(result.advancementRequirements.toJSON(), result.scoutRequirements.toJSON(), req.params.requirementId, req.body.scoutId);
    toggleScoutRequirements(advancementReqs, result.scoutRequirements.toJSON(), req.body.scoutId);

    // toggleScoutRequirement(req.params.requirementId, req.body.scoutId, scoutRequirement, function(result) {
    //   var r = [];
    //   r.push(result);
    //   res.json(r);
    // });
  });
};