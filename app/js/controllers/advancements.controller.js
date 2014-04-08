/* global app */

app.controller('AdvancementsCtrl', function($scope, $location, $routeParams, advancementService) {

  if($routeParams.id && advancementService.advancement === undefined) {
    advancementService.getAdvancement($routeParams.id).then(function(data) {
      if(data.id) {
        $scope.advancement = data;
      }
    });
  }
});
