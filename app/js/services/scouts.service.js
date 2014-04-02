/* global app */

app.factory('scoutService', function($resource, $q) {
  return {
    scout: undefined,
    scouts: [],
    _getResource: $resource('../scouts/:scoutId', {scoutId: '@scoutId'}, {
    }),
    getScouts: function() {
      var deferred = $q.defer();
      var that = this;
      if(that.scouts.length === 0) {
        that._getResource.get({}, function(data) {
          that.scouts = data.scouts;
          deferred.resolve(that.scouts);
        });
      } else {
        deferred.resolve(that.scouts);
      }
      return deferred.promise;
    },
    getScout: function(id) {
      var deferred = $q.defer();
      var that = this;
      if(that.scout === undefined || that.scout.id !== id) {
        that._getResource.get({scoutId: id}, function(data) {
          that.scout = data;
          deferred.resolve(that.scout);
        });
      } else {
        deferred.resolve(that.scout);
      }
      return deferred.promise;
    }
  };
});
