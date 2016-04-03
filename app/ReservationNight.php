<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReservationNight extends Model
{
  protected $fillable = ['rate', 'day', 'room_type_id', 'reservation_id'];

  function Reservation() {
    return $this->hasOne('App\Reservation');
  }

  function RoomType() {
    return $this->hasOne('App\RoomType');
  }
}
