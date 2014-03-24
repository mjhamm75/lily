app.factory('scoutService', function($resource) {
  return {
    scout: undefined,
    getResource: $resource('../scouts/:scoutId', {scoutId: '@scoutId'}, {
    })
  };
});