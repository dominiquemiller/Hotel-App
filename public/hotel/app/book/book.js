'use strict';

angular.module('myApp.book', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/book', {
      templateUrl: "book/book.html",
      controller: "BookController"
    });
  }])

  .controller('BookController', function(ReservationService, $scope, $http, $location){
        $scope.select_occupancy = [1, 2, 3, 4, 5];
        $scope.search_param = {};

        $scope.search = function(){
          $http.post('/api/searchavailability', $scope.search_param).then(function(response){
            $scope.available_room_types = response.data;
            console.log(response.data);
          });
        };
        // Store book info in service for finalize.js to retrieve
        $scope.book = function(id) {
          ReservationService.setValue('start_dt', $scope.search_param.start_dt);
          ReservationService.setValue('end_dt', $scope.search_param.end_dt);
          ReservationService.setValue('occupancy', $scope.search_param.min_occupancy);
          ReservationService.setValue('room_info', $scope.available_room_types[id]);

          console.log(ReservationService.getValue('start_dt'));

          $location.path('/finalize');
        };
  });
