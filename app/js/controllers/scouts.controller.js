/* global app */

app.controller('ScoutsCtrl', function($scope, $location, $routeParams, scoutService) {
  var prom = scoutService.getScouts();
  prom.then(function(data) {
    $scope.scouts = data;
  });

  $scope.scout = scoutService.scout;

  if($routeParams.id && scoutService.scout === undefined) {
    scoutService.getScout($routeParams.id).then(function(data) {
      $scope.scout = data;
    });
  }

  $scope.showScout = function(scout) {
    if(scout.id) {
      scoutService.scout = scout;
      // I dont understand why I need this ugly hack with the empty ''
      $location.path('' + scout.id);
    }
  };
});
