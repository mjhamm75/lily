/* global exports */
var _ = require('underscore');

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
  var result = collection.find(function(model) {
    return model.get(idName) == id;
  })
  return result;
};