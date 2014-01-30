var teevee = angular.module('teevee', ['ngRoute', 'ngTouch']);

teevee.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', { templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .when('/search/:search', { templateUrl: '/partials/searchResults.html', controller: 'searchResultsCtrl' })
    .when('/shows/:showId', { templateUrl: '/partials/showSeasons.html', controller: 'showSeasonsCtrl' })
    .when('/shows/:showId/seasons/:seasonId', { templateUrl: '/partials/showSeasonEpisodes.html', controller: 'showSeasonEpisodesCtrl' })
    .when('/shows/:showId/seasons/:seasonId/episodes/:episodeId', { templateUrl: '/partials/showEpisode.html', controller: 'showEpisodeCtrl' })
    .otherwise({ redirectTo: '/' });

});

teevee.controller('homeCtrl',
  ['$scope', '$location', '$http', 'resultsService', function($scope, $location, $http, resultsService) {

  $scope.searchShows = function() {
    $http.get('/get/search/' + $scope.query)
      .success(function(data) {
        resultsService.json = data;
        $location.path('/search/' + $scope.query);
      })
      .error(function() {
        console.log('something went wrong...');
      });
  };
}]);

teevee.controller('searchResultsCtrl', ['$scope', 'resultsService', function($scope, resultsService) {
  $scope.results = resultsService.json;
}]);

teevee.controller('showSeasonsCtrl', function($scope, $routeParams, $http) {
  $http.get('/get/shows/' + $routeParams.showId + '/seasons')
    .success(function(seasons) {
      $scope.showId  = seasons.showId;
      $scope.seasons = seasons.seasons;
    })
    .error(function() {
      console.log('something went wrong...');
    });
});

teevee.controller('showSeasonEpisodesCtrl', function($scope, $routeParams, $http) {
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

teevee.controller('showEpisodeCtrl', function($scope, $routeParams, $http) {
  $http.get('/get/shows/' + $routeParams.showId + '/seasons/' + $routeParams.seasonId)
    .success(function(episodes) {
      $scope.episode = episodes.filter(function(e) { return e.id == $routeParams.episodeId; })[0];
    })
    .error(function() {
      console.log('somethig went wrong');
    });
});


teevee.service('resultsService', function() {
  this.json = [];
});






