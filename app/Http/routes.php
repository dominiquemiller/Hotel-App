<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Admin route group needed by hotel owner
Route::group(['prefix' => 'adminapi'], function() {
  Route::resource('room_type', 'RoomTypeController');
});
