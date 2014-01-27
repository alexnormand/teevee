var  teevee  = angular.module('teevee', ['ngRoute']);

teevee.controller('homePage', function($scope, $http) {
  $scope.searchShows = function() {
    $http.get('/get/search/' + $scope.search)
      .success(function(data) {
        console.log(data);
      })
      .error(function() {
        console.log('something went wrong...');
      });
  };
});


