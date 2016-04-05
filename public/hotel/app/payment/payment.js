'use strict';

angular.module('myApp.payment', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/payment/:reserve_id', {
            templateUrl: 'payment/payment.html',
            controller: 'PaymentController'
        });
      }])

      .controller('PaymentController', function($scope, $http, ReservationService, $location, $routeParams){

          $scope.res_id = $routeParams.reserve_id;
          $scope.paid = false;

          $scope.paywithStripe = function(status, response){
            if(response.error) {
              $scope.paid = false;
              $scope.message = "Yo shit don't work!";
            } else {
              var $payInfo = {
                'token': response.id,
                'customer_id': $scope.reservation_info.customer_id,
                'total': $scope.reservation_info.total_price
              };
            }
          };

          $scope.getReservationData = function(){
            $http.get('api/reservation/' + $scope.res_id).then(function(response){
              $scope.reservation_info = response.data;
              console.log($scope.reservation_info);
            });
          };

          $scope.getReservationData();

      });
