angular.module('teevee', ['ngRoute', 'ngTouch', 'ngAnimate', 'teeveeControllers']);
angular.module('teeveeControllers', []);


angular.module('teevee').config(function($routeProvider, $controllerProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', { templateUrl: '/partials/home.html', controller: 'homeCtrl' })
    .when('/search/:query', { templateUrl: '/partials/searchResults.html', controller: 'searchResultsCtrl' })
    .when('/shows/:showId/seasons', { templateUrl: '/partials/seasons.html', controller: 'seasonsCtrl' })
    .when('/shows/:showId/seasons/:seasonId/episodes', { templateUrl: '/partials/seasonEpisodes.html', controller: 'seasonEpisodesCtrl' })
    .when('/shows/:showId/seasons/:seasonId/episodes/:episodeId', { templateUrl: '/partials/episode.html', controller: 'episodeCtrl' })
    .otherwise({ redirectTo: '/' });
});
