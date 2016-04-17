'use strict';

angular.module('myApp.payment', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/payment/:reserve_id', {
            templateUrl: 'payment/payment.html',
            controller: 'PaymentController'
        });
      }])

      .controller('PaymentController', function($scope, $http, $q, ReservationService, $location, $routeParams){

          $scope.res_id = $routeParams.reserve_id;
          $scope.paid = false;
          // stripe callback function
          $scope.handleStripe = function(status, response){
            if(response.error) {
              $scope.paid = false;
              $scope.message = "Yo shit don't work!";
            } else {
              var payInfo = {
                'token': response.id,
                'customer_id': $scope.reservation_info.customer_id,
                'total_price': $scope.reservation_info.total_price
              };
              console.log(payInfo);
              // post payment to laravel
              $http.post('/api/payment', payInfo).then(function(response){
                if(response.statusText == "OK") {
                  $scope.paid = true;
                  $scope.message = response.data.message;
                } else {
                  $scope.paid = true;
                  $scope.message = response.data.message;
                }
                console.log(response);
              });
            }

          };
          // get reservation info based on route params
          $scope.getReservationData = function(){
            $http.get('api/reservation/' + $scope.res_id).then(function(response){
              $scope.reservation_info = response.data;
            });
          };

          $scope.getReservationData();

      });
