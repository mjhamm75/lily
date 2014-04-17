var app = angular.module('LilyApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'ScoutsCtrl',
    templateUrl: 'templates/scouts.html'
  })
  .when('/:id', {
    controller: 'ScoutsCtrl',
    templateUrl: 'templates/scout.html'
  })
  .when('/:id/detail', {
    controller: 'ScoutsCtrl',
    templateUrl: 'templates/scout-detail.html'
  })
  .when('/:scoutId/advancements/:id', {
    controller: 'AdvancementsCtrl',
    templateUrl: 'templates/advancement-detail.html'
  })
  .otherwise({redirectTo: '/'});
}]);
