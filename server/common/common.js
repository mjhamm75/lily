/* global exports */
var _ = require('underscore');

exports.combineRequirementsWithScoutRequirements = function(advancementRequirements, scoutRequirementsComplete) {
  var result = _.map(advancementRequirements, function(a) {
    var r = _.findWhere(scoutRequirementsComplete, {requirement_id: a.id });
    if(r) {
      a.completed_date = r.completed_date;
      a.initials = r.initials;
    } else {
      a.completed_date = null;
      a.initials = null;
    }
    delete a.internal_id;
    delete a.advancement_id;
    return a;
  });
  return result;
};