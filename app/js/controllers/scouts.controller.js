app.controller('ScoutsCtrl', function($scope, $location, scoutService) {
  scoutService.get({}, function(data) {
    $scope.scouts = data.scouts;
  });

  $scope.showScout = function(scout) {
    $location.path('' + scout.id);
  };
});
