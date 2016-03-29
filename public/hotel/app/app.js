'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.roomAdmin',
  'myApp.version',
  'myApp.book',
  'myApp.finalize'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])

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
