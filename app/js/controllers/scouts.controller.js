app.controller('ScoutsCtrl', function($scope, scoutService) {
  scoutService.get({}, function(data) {
    $scope.scouts = data.scouts;
  });
});
