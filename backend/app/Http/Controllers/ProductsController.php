<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Products;

class ProductsController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'category' => 'nullable|string|max:255',
            'numerologicalName' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'bmCode' => 'nullable|string|max:255',
            'article' => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:255',
            'packageCount' => 'nullable|integer',
            'manufacturer' => 'nullable|string|max:255',
            'annotation' => 'nullable|string',
            'image' => 'nullable|file|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $imagePath = 'storage/' . $path;
        }

        $product = Products::create([
            'category' => $request->input('category'),
            'numerologicalName' => $request->input('numerologicalName'),
            'price' => $request->input('price'),
            'bmCode' => $request->input('bmCode'),
            'article' => $request->input('article'),
            'barcode' => $request->input('barcode'),
            'size' => $request->input('size'),
            'packageCount' => $request->input('packageCount'),
            'manufacturer' => $request->input('manufacturer'),
            'annotation' => $request->input('annotation'),
            'image' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    public function index()
    {
        $products = Products::all();
        return response()->json($products);
    }
}
