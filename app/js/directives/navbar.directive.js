var app = angular.module('LilyApp');

app.directive('lilyNavbar', function() {
  return {
    replace: true,
    restrict: 'A',
    templateUrl: 'templates/navbar.html'
  };
});