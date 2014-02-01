angular.module('teeveeControllers').controller('homeCtrl', function($scope, $location, $http) {
  $scope.searchShows = function() {
    $location.path('/search/' + $scope.query);
  };
});