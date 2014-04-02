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
      if(this.scouts.length === 0) {
        this._getResource.get({}, function(data) {
          that.scouts = data.scouts;
          deferred.resolve(that.scouts);
        });
        return deferred.promise;
      } else {
        return that.scouts;
      }
    }
  };
});
