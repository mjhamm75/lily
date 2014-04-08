var app = angular.module('LilyApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

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
  .when('/advancement/:id', {
    controller: 'ScoutsCtrl',
    templateUrl: 'templates/advancement-detail.html'
  })
  .otherwise({redirectTo: '/'});
}]);
