app.controller('ListingCtrl', function($scope, scoutService) {
  scoutService.get({}, function(data) {
    $scope.scouts = data.scouts;
  });
});
