'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.view1',
  'myApp.view2',
  'myApp.roomAdmin',
  'myApp.version',
  'myApp.book',
  'myApp.finalize'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])
  
  .service('ReservationService', function(){
    var srv = this;

    srv.reservationTable = {};
    srv.setValue = function(key, value) {
      srv.reservationTable[key] = value;
    };
    srv.getValue = function(key) {
      return srv.reservationTable[key];
    };

  });
