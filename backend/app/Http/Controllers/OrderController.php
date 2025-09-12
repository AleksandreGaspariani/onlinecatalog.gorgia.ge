<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrderController extends Controller
{
    //
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_status' => 'required|string',
            'delivery_date' => 'nullable|date',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'item_id' => 'required|string', // changed from integer to string
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'total' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        $validated['user_id'] = $request->user()->id; // set user_id from authenticated user

        $order = Orders::create($validated);

        return response()->json(['success' => true, 'order' => $order], 201);
    }


    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }
}
