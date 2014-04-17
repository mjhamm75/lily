/* global app */

app.factory('requirementsService', function($resource, $q) {
  return {
    _getResource: $resource('../requirements/:requirementId', {requirementId: '@requirementId'}, {
      save: {
        method: 'POST',
        isArray: true
      }
    }),
    updateRequirements: function(requirementId, scoutId, advancementId, callback) {
      this._getResource.save({
        advancementId: advancementId,
        requirementId: requirementId,
        scoutId: scoutId
      }, function(data) {
        callback(data);
      });
    }
  };
});
