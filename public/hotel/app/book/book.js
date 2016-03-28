'use strict';

angular.module('myApp.book', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/book', {
      templateUrl: "book/book.html",
      controller: "BookController"
    });
  }])

  .controller('BookController', function(ReservationService, $scope, $http, $location){
        $scope.Reservation = ReservationService;
        $scope.select_occupancy = [1, 2, 3, 4, 5];
        $scope.available_room_types;
        $scope.search_param = {};

        $scope.search = function(){
          $http.post('api/searchavailabilty', $scope.search_param).then(function(response){
            $scope.available_room_types = response.data;
            console.log(response.data);
          });
        };

        $scope.book = function(id) {
          $scope.Reservation.setValue('start_dt', $scope.search_param.start_dt);
          $scope.Reservation.setValue('end_dt', $scope.search_param.end_dt);
          $scope.Reservation.setValue('occupancy', $scope.search_param.min_occupancy);
          $scope.Reservation.setValue('room_info', $scope.search_param.room_types[id]);

          console.log($scope.Reservation);

          $location.path('/finalize');
        };
  });
