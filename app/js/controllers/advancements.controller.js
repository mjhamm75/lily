/* global app */

app.controller('AdvancementsCtrl', function($scope, $location, $routeParams, advancementService, requirementsService) {
  'use strict';
  advancementService.getAdvancementDetails($routeParams.id, $routeParams.scoutId).then(function() {
    $scope.advancementDetail = advancementService.advancementRequirements;
  });

  $scope.completeRequirement = function(req) {
    requirementsService.updateRequirements(req.id, $routeParams.scoutId, $routeParams.id,  function(req) {
      advancementService.updateAdvancementRequirements(req);
    });
  };
});
