/* global app */

app.controller('AdvancementsCtrl', function($scope, $location, $routeParams, advancementService, requirementsService, scoutService) {

  advancementService.getAdvancementRequirements($routeParams.id, $routeParams.scoutId).then(function(data) {
    $scope.advancementRequirements = data;
  });

  $scope.completeRequirement = function(req) {
    requirementsService.updateRequirement(req.id, $routeParams.scoutId, function(data) {
      if(data.completed_date) {
        req.completed_date = data.completed_date;
      } else {
        req.completed_date = null;
      }
    });
  };
});
