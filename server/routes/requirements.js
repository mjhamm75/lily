/* global exports, require */

var Bookshelf = require('bookshelf').PG;
var async = require('async');
var common = require('../common/common.js');

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
  var scoutRequirements = new ScoutRequirements();
  scoutRequirements.query({
    where: {
      scout_id: scoutId
    }
  }).fetch().then(function(data) {
    callback(data);
  });
}

var getAdvancementRequirements = function(advancementId, callback) {
  var advancementRequirements = new AdvancementRequirements();
  advancementRequirements.query({
    where: {
      advancement_id: advancementId
    }
  }).fetch().then(function(data) {
    callback(data);
  })
}

exports.toggleRequirement = function(req, res) {
  async.parallel({
    scoutRequirements: function(callback) {
      getScoutRequirements(req.body.scoutId, function(data) {
        callback(null, data)
      });
    },
    advancementRequirements: function(callback){
      getAdvancementRequirements(req.body.advancementId, function(data) {
        callback(null, data);
      })
    }
  }, function(err, result) {
    var scoutRequirement = common.getModelById(result.scoutRequirements, req.params.requirementId, 'requirement_id');
    var advancementRequirement = common.getModelById(result.advancementRequirements, req.params.requirementId, 'requirement_id');
    toggleScoutRequirement(req.params.requirementId, req.body.scoutId, scoutRequirement, function(result) {
      var r = [];
      r.push(result);
      res.json(r);
    });
  });
};