angular.module('teeveeControllers').controller('seasonEpisodesCtrl', function($scope, $routeParams, $http) {
  $http.get('/get/shows/' + $routeParams.showId + '/seasons/' + $routeParams.seasonId)
    .success(function(episodes) {
      $scope.episodes = episodes;
      $scope.showId   = $routeParams.showId;
      $scope.seasonId = $routeParams.seasonId;
    })
    .error(function() {
      console.log('somethig went wrong');
    });
});