<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Products;
use Illuminate\Support\Facades\File;

class ProductsController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'category_id' => 'nullable|integer|exists:category,id',
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
            'category_id' => $request->input('category_id'),
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

    public function update(Request $request, $id)
    {
        $request->validate([
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

        $product = Products::findOrFail($id);
        $product->category_id = $request->input('category_id');
        $product->category = $request->input('category');
        $product->numerologicalName = $request->input('numerologicalName');
        $product->price = $request->input('price');
        $product->bmCode = $request->input('bmCode');
        $product->article = $request->input('article');
        $product->barcode = $request->input('barcode');
        $product->size = $request->input('size');
        $product->packageCount = $request->input('packageCount');
        $product->manufacturer = $request->input('manufacturer');
        $product->annotation = $request->input('annotation');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->image = 'storage/' . $path;
        }

        $product->save();
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Products::findOrFail($id);
        if ($product->image && File::exists(public_path($product->image))) {
            File::delete(public_path($product->image));
        }
        $product->delete();
        return response()->json(null, 204);
    }

    public function show($id)
    {
        $product = Products::findOrFail($id);
        return response()->json($product);
    }
}
