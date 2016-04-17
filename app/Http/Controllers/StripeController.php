<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Customer;

class StripeController extends Controller
{
    public function pay(Request $request) {
        //sent from payment.js
        $token = $request['token'];
        $customer_id = $request['customer_id'];
        //Stripe wants total in cents
        $total_price = $request['total_price'] * 100;

        $customer = Customer::find($customer_id);

        if($customer->charge($total_price,
            [
              'source' => $token,
              'receipt_email' => $customer->email
            ])) {
          $mess = ['status' => "OK", "message" => "Your payment was processed"];
          return $mess;
        } else {
          $mess = ['status' => "ERROR", 'message' => 'Your payment was rejected'];
          return $mess;
        }

    }
}
