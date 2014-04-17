/* global app */

app.controller('AdvancementsCtrl', function($scope, $location, $routeParams, advancementService, requirementsService, scoutService) {

  advancementService.getAdvancementRequirements($routeParams.id, $routeParams.scoutId).then(function() {
    $scope.advancementRequirements = advancementService.advancementRequirements;
  });

  $scope.completeRequirement = function(req) {
    requirementsService.updateRequirements(req.id, $routeParams.scoutId, $routeParams.id,  function(req) {
      advancementService.updateAdvancementRequirements(req);
    });
  };
});
