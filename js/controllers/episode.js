angular.module('teeveeControllers').controller('episodeCtrl', function($scope, $routeParams, $http) {
  $http.get('/get/shows/' + $routeParams.showId + '/seasons/' + $routeParams.seasonId)
    .success(function(episodes) {
      $scope.episode = episodes.filter(function(e) { return e.id == $routeParams.episodeId; })[0];
    })
    .error(function() {
      console.log('somethig went wrong');
    });
});