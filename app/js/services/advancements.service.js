/* global app */

app.factory('advancementService', function($resource, $q) {
  return {
    advancementRequirements: undefined,
    _getResource: $resource('../advancements/:advancementId', {advancementId: '@advancementId'}, {
      get: {
        isArray: true
      }
    }),
    getAdvancementRequirements: function(id, scoutId) {
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
    }
  };
});
