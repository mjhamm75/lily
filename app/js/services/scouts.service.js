app.factory('scoutService', function($resource) {
  return $resource('http://99.44.242.76:3000/scouts/:scoutId', {scoutId: '@scoutId'}, {

  });
});