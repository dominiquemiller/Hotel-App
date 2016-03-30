'use strict';

angular.module('myApp.finalize', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider){
      $routeProvider.when('/finalize', {
          templateUrl: 'finalize/finalize.html',
          controller: 'FinalizeController'
      });
    }])

    .controller('FinalizeController', function($scope, $http, $location, ReservationService){

        $scope.customer = {};


        //retrieve booking info
        $scope.getBookInfo = function(){
          $scope.start_dt =   ReservationService.getValue('start_dt');
          $scope.end_dt = ReservationService.getValue('end_dt');
          $scope.occupancy = ReservationService.getValue('occupancy');
          $scope.room_info = ReservationService.getValue('room_info');

          if(!$scope.room_info) {
            $location.path('/path');
          }

        };

        $scope.getBookInfo();
        //booking info and customer object
        $scope.book = function(){
            var bookingInfo = {
              'customer': $scope.customer,
              'room_info': $scope.room_info,
              'start_dt': $scope.start_dt,
              'end_dt': $scope.end_dt,
              'occupancy': $scope.occupancy
            };
            
            $http.post('/api/createreservation', bookingInfo).then(function(response){
              $scope.reser_done = true;
              $scope.reservationInfo = response.data;
              console.log($scope.reservationInfo);
            });
        };

    });
