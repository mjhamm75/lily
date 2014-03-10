var app = angular.module('LilyApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  })
  .otherwise({redirectTo: '/'});
}]);