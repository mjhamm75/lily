app.factory('scoutService', function($resource) {
  return $resource('../scouts/:scoutId', {scoutId: '@scoutId'}, {
  });
});