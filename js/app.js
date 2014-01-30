var teevee = angular.module('teevee', ['ngRoute', 'ngTouch', 'ngAnimate']);

teevee.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', { templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .when('/search/:query', { templateUrl: '/partials/searchResults.html', controller: 'searchResultsCtrl' })
    .when('/shows/:showId/seasons', { templateUrl: '/partials/showSeasons.html', controller: 'showSeasonsCtrl' })
    .when('/shows/:showId/seasons/:seasonId/episodes', { templateUrl: '/partials/showSeasonEpisodes.html', controller: 'showSeasonEpisodesCtrl' })
    .when('/shows/:showId/seasons/:seasonId/episodes/:episodeId', { templateUrl: '/partials/showEpisode.html', controller: 'showEpisodeCtrl' })
    .otherwise({ redirectTo: '/' });
});

teevee.controller('homeCtrl', function($scope, $location, $http) {
  $scope.searchShows = function() {
    $location.path('/search/' + $scope.query);
  };
});

teevee.controller('searchResultsCtrl', function($scope, $http, $routeParams) {
  $http.get('/get/search/' + $routeParams.query)
    .success(function(data) {
      $scope.results = data;
    })
    .error(function(status, response){
      console.log('something went wrong');
    });
});

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
