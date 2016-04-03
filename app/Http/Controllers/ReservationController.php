<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Reservation;
use App\RoomCalendar;
use App\ReservationNight;
use App\Customer;
use Carbon\Carbon;

class ReservationController extends Controller
{
  public function createReservations(Request $request) {

      $start_dt = Carbon::createFromFormat('d-m-Y', $request['start_dt'])->toDateString();
      $end_dt = Carbon::createFromFormat('d-m-Y', $request['end_dt'])->toDateString();

      $customer = Customer::firstOrCreate(array('first_name'=>$request['first_name'],
                                                'last_name'=>$request['last_name'],
                                                'email'=>$request['email']));

      $reservation = Reservation::create(array('total_price' => $request['total_price'],
                                               'occupancy' => $request['occupancy'],
                                               'checkin' => $start_dt,
                                               'checkout' => $end_dt,
                                               'customer_id' => $customer->id));

      $date = $start_dt;

      while (strtotime($date) < strtotime($end_dt)) {

        $room_calendar = RoomCalendar::where('day', '=', $date)
          ->where('room_type_id', '=', $request['id'])->first();

        $night = ReservationNight::create(array('day' => $date,
                                                'rate' => $room_calendar->rate,
                                                'room_type_id' => $request['id'],
                                                'reservation_id' => $reservation->id));

        $date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));

      }

      $nights = $reservation->nights;
      $customer = $reservation->customer;
      return $reservation;
  }
}
