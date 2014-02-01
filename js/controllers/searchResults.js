angular.module('teeveeControllers').controller('searchResultsCtrl', function($scope, $http, $routeParams) {
  $http.get('/get/search/' + $routeParams.query)
    .success(function(data) {
      $scope.results = Array.isArray(data) ? data : [{ title: 'No results found'}];
    })
    .error(function(status, response){
      console.log('something went wrong');
    });
});