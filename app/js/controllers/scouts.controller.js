/* global app */

app.controller('ScoutsCtrl', function($scope, $location, $routeParams, scoutService) {
  scoutService.getScouts().then(function(data) {
    $scope.scouts = data;
  });

  $scope.scout = scoutService.scout;

  if($routeParams.id && scoutService.scout === undefined) {
    scoutService.getScout($routeParams.id).then(function(data) {
      if(data.id) {
        $scope.scoutValid = true;
        $scope.scout = data;
      }
    });
  }

  $scope.showFullDetail = function(scout, $event) {
    scoutService.getScout(scout.id).then(function(data) {
      $scope.scout = scoutService.scout = data;
    });
    $location.path('' + scout.id + '/detail');
  };

  $scope.showScout = function(scout, $event) {
    if($event !== undefined) {
      if(scout.id) {
        scoutService.scout = scout;
        // I dont understand why I need this ugly hack with the empty ''
        $location.path('' + scout.id);
      }
    }
  };

  $scope.oneAtATime = true;
});
