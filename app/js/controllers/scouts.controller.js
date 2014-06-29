/* global app */

app.controller('ScoutsCtrl', function($scope, $location, $routeParams, scoutService, advancementService) {
  'use strict';
  scoutService.getScouts().then(function(data) {
    $scope.scouts = data;
  });

  $scope.scout = scoutService.scout;

  if($routeParams.id && scoutService.scout === undefined) {
    scoutService.getScout($routeParams.id).then(function(data) {
      $scope.scoutValid = true;
      $scope.scout = data;
    });
  }

  $scope.showAdvancementDetail = function(advancement) {
    advancementService.advancement = advancement;
    $location.path('/' + scoutService.scout.scout_id + '/advancements/' + advancement.advancement_id);
  };

  $scope.showFullDetail = function(scout) {
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
