/* global app */

app.factory('requirementsService', function($resource, $q) {
  return {
    _getResource: $resource('../requirements/:requirementId', {requirementId: '@requirementId'}, {
    }),
    updateRequirement: function(requirementId, scoutId, callback) {
      this._getResource.save({
        requirementId: requirementId,
        scoutId: scoutId
      }, function(data) {
        callback(data);
      });
    }
  };
});
