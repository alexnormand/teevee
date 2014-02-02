angular.module('teeveeControllers').controller('seasonsCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/shows/' + $routeParams.showId + '/seasons')
    .success(function(seasons) {
      $scope.showId  = seasons.showId;
      $scope.seasons = seasons.seasons;
    })
    .error(function() {
      console.log('something went wrong...');
    });
});