/* global app */

app.factory('advancementService', function($resource, $q) {
  return {
    advancement: undefined,
    _getResource: $resource('../advancements/:advancementId', {advancementId: '@advancementId'}, {
    }),
    getAdvancement: function(id) {
      var deferred = $q.defer();
      var that = this;
      if(that.advancement === undefined || that.advancement.id !== id) {
        that._getResource.get({advancementId: id}, function(data) {
          that.advancement = data;
          deferred.resolve(that.advancement);
        });
      } else {
        deferred.resolve(that.advancement);
      }
      return deferred.promise;
    }
  };
});
