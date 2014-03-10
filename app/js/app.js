var app = angular.module('LilyApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    controller: 'ListingCtrl',
    templateUrl: 'views/listing.html'
  })
  .otherwise({redirectTo: '/'});
}]);