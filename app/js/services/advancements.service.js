/* global app, _ */

app.factory('advancementService', function($resource, $q) {
  'use strict';
  return {
    advancementRequirements: undefined,
    _getResource: $resource('../advancements/:advancementId', {advancementId: '@advancementId'}, {}),
    getAdvancementDetails: function(id, scoutId) {
      var deferred = $q.defer();
      var that = this;
      if(that.advancementRequirements === undefined || that.advancementRequirements.id !== id) {
        that._getResource.get(
          {
            advancementId: id,
            scoutId: scoutId
          }, function(data) {
          that.advancementRequirements = data;
          deferred.resolve(that.advancementRequirements);
        });
      } else {
        deferred.resolve(that.advancementRequirements);
      }
      return deferred.promise;
    },
    updateAdvancementRequirements: function(reqs) {
      var that = this;
      _.each(reqs, function(req) {
        var index = parseInt(req.requirement_id);
        var r = _.findWhere(that.advancementRequirements.requirements, { requirement_id: index });
        r.completed_date = req.completed_date;
      });
    },
  };
});
