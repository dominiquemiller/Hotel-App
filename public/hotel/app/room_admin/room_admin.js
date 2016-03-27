'use strict';

angular.module('myApp.roomAdmin', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/room_admin', {
      templateUrl: 'room_admin/room_admin.html',
      controller: 'RoomAdminController'
    });
  }])

  .controller('RoomAdminController', function($scope, $http, $location){

    $scope.room_types = [];
    $scope.new_type = {};
    $scope.selected_idx;
    $scope.selected_type = {};
    $scope.message = null;
    $scope.update_data = {};

    // need to refactor all CRUD to service!
    $scope.getRoomTypes = function(){
      $http.get('/adminapi/room_type').then(function(response){
        $scope.room_types = response.data;
        console.log($scope.room_types);
      });
    };

    $scope.getRoomTypes();
    // need to add error handler in future
    $scope.create = function(){
      $http.post('/adminapi/room_type', $scope.new_type).then(function(response){
        //auto update current view with new data
        $scope.room_types.push(response.data);
        $scope.new_type.name = '';
        $scope.new_type.short_name = '';
        $scope.new_type.base_price = '';
        $scope.new_type.base_availability = '';
        $scope.new_type.max_occupancy = '';

      });
    };

    $scope.select_type = function(index) {
      $scope.selected_idx = index;
      $scope.selected_type = $scope.room_types[index];
      $scope.update_data.room_type = $scope.selected_type.id;
      $scope.message = null;
    };
    //set price for room
    $scope.setPrice = function(){
      console.log($scope.update_data);
      $http.post('/adminapi/setpriceinrange', $scope.update_data).then(function(response){
        $scope.selected_idx = -1;
        $scope.selected_type = null;
        $scope.update_data = {};

        $scope.message = response.data;
        console.log(response);
      });
    };
  });
