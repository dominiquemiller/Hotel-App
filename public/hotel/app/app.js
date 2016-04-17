'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'angularPayments',
  'myApp.roomAdmin',
  'myApp.version',
  'myApp.book',
  'myApp.finalize',
  'myApp.payment'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])
  // saves reservation info for finalize controller
  .service('ReservationService', function(){


    var reservationTable = {};

    return {
      setValue: function(key, value) {
        reservationTable[key] = value;
      },
      getValue: function(key) {
        return reservationTable[key];
      }
    };
  });
