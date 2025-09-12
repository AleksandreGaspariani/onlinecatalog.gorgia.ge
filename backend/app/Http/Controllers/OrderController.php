<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrderController extends Controller
{
    //
    public function index()
    {
        $orders = Orders::with('user')->get();
        return response()->json(['orders' => $orders], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_status' => 'required|string',
            'delivery_date' => 'nullable|date',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'item_id' => 'required|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'total' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        $validated['user_id'] = $request->user()->id;

        $order = Orders::create($validated);

        return response()->json(['success' => true, 'order' => $order], 201);
    }


    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $order = Orders::findOrFail($id);

        $validated = $request->validate([
            'order_status' => 'sometimes|string',
            'delivery_date' => 'sometimes|date|nullable',
            'email' => 'sometimes|email|nullable',
            'phone' => 'sometimes|string|nullable',
            'item_id' => 'sometimes|string',
            'quantity' => 'sometimes|integer',
            'price' => 'sometimes|numeric',
            'total' => 'sometimes|numeric',
            'payment_method' => 'sometimes|string',
        ]);

        $order->update($validated);

        return response()->json(['success' => true, 'order' => $order], 200);
    }
}
