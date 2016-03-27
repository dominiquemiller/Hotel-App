'use strict';

angular.module('myApp.book', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/book', {
      templateUrl: "book/book.html",
      controller: "BookController"
    });
  }])

  .controller('BookController', function($scope, $http, $location){

        $scope.select_occupancy = [1, 2, 3, 4, 5];
        $scope.available_room_types;
        $scope.search_param = {};

        $scope.search = function(){
          $http.post('api/searchavailabilty', $scope.search_param).then(function(response){
            $scope.available_room_types = response.data;
            console.log(response.data);
          });
        };
  });
