/* global app */

app.controller('ScoutsCtrl', function($scope, $location, $routeParams, scoutService) {
  scoutService.getScouts().then(function(data) {
    $scope.scouts = data;
  });

  $scope.scout = scoutService.scout;

  if($routeParams.id && scoutService.scout === undefined) {
    scoutService.getResource.get({
      scoutId: $routeParams.id
    }, function(data) {
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
