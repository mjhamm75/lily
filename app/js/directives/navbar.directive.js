var app = angular.module('LilyApp');

app.directive('lilyNavbar', function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/navbar.html'
  };
});