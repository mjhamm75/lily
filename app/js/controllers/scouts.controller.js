app.controller('ScoutsCtrl', function($scope, $location, scoutService) {
  scoutService.get({}, function(data) {
    $scope.scouts = data.scouts;
  });

  $scope.showScout = function(scout) {
    // I dont understand why I need this ugly hack with the empty ''
    $location.path('' + scout.id);
  };
});
