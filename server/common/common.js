/* global exports */
var _ = require('underscore');
var Bookshelf = require('bookshelf').PG;

var AdvancementRequirement = Bookshelf.Model.extend({
  tableName: 'advancement_requirements',
  idAttribute: null
});

var AdvancementRequirements = Bookshelf.Collection.extend({
  model: AdvancementRequirement
});

var ScoutRequirement = Bookshelf.Model.extend({
  tableName: 'scout_requirements',
  idAttribute: null
});

var ScoutRequirements = Bookshelf.Collection.extend({
  model: ScoutRequirement
});

exports.getScoutRequirements = function(scoutId, callback) {
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

exports.updateScoutRequirement = function(reqId, scoutId, callback) {
  'use strict';
  var scoutReq = new ScoutRequirement({
      requirement_id: reqId,
      scout_id: scoutId,
      initials: 'mjh',
      completed_date: '2014-04-10'
    });
    scoutReq.save().then(function(data) {
      callback(data.toJSON());
    });
};

exports.deleteScoutRequirement = function(reqId, scoutId, callback) {
  'use strict';
  Bookshelf.knex('scout_requirements')
      .where('scout_id', scoutId)
      .where('requirement_id', reqId)
      .del().then(function() {
        callback({
          requirement_id: reqId,
          completed_date: null,
          initials: null
        });
      });
};

exports.getAdvancementRequirements = function(advancementId, callback) {
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

exports.combineRequirementsWithScoutRequirements = function(advancementRequirements, scoutRequirementsComplete) {
  'use strict';
  var result = _.map(advancementRequirements, function(a) {
    var r = _.findWhere(scoutRequirementsComplete, {requirement_id: a.id });
    if(r) {
      a.parent,
      a.children,
      a.children_needed,
      a.completed_date = r.completed_date;
      a.initials = r.initials;
    } else {
      a.completed_date = null;
      a.initials = null;
    }
    delete a.advancement_id;
    return a;
  });
  return result;
};

exports.getModelById = function(collection, id, idName) {
  'use strict';
  var params = {};
  params[idName] = parseInt(id);
  var result = _.findWhere(collection, params);
  return result;
};