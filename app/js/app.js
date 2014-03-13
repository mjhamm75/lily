var app = angular.module('LilyApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'ListingCtrl',
    templateUrl: 'templates/listing.html'
  })
  .otherwise({redirectTo: '/'});
}]);