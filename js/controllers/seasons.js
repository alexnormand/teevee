angular.module('teeveeControllers').controller('seasonsCtrl', function($scope, $routeParams, $http) {
  $http.get('/get/shows/' + $routeParams.showId + '/seasons')
    .success(function(seasons) {
      $scope.showId  = seasons.showId;
      $scope.seasons = seasons.seasons;
    })
    .error(function() {
      console.log('something went wrong...');
    });
});