<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Products;
use Illuminate\Support\Facades\File;
use App\Models\Category;

class ProductsController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'category_id' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'numerologicalName' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'bmCode' => 'nullable|string|max:255',
            'article' => 'nullable|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'size' => 'nullable|string|max:255',
            'packageCount' => 'nullable|integer',
            'manufacturer' => 'nullable|string|max:255',
            'annotation' => 'nullable',
            'image' => 'nullable',
            'image.*' => 'file|image|max:2048',
        ]);

        $categoryId = $request->input('category_id');

        if ($categoryId && Products::where('category_id', $categoryId)->exists()) {
            return response()->json(['error' => 'category_id must be unique'], 400);
        }

        if ($request->input('category_id')) {
            $exists = Category::where('group_id', $request->input('category_id'))->exists();
            if (!$exists) {
                return response()->json(['error' => 'Invalid category_id'], 400);
            }
        }

        $imagePaths = [];
        if ($request->hasFile('image')) {
            $images = $request->file('image');
            if (is_array($images)) {
                foreach ($images as $file) {
                    $path = $file->store('products', 'public');
                    $imagePaths[] = 'storage/' . $path;
                }
            } else {
                $path = $images->store('products', 'public');
                $imagePaths[] = 'storage/' . $path;
            }
        }

        $product = Products::create([
            'user_id' => $request->user()->id,
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
            'image' => json_encode($imagePaths),
        ]);

        return response()->json($product, 201);
    }

    public function index()
    {
        $user = request()->user();
        $mine = request()->query('mine');
        if ($mine && $user) {
            $products = Products::where('user_id', $user->id)->get();
        } elseif ($user && $user->role === 'contragent') {
            $products = Products::where('user_id', $user->user_id)->get();
        } else {
            $products = Products::all();
        }
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
            'annotation' => 'nullable',
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

    public function destroy(Request $request, $id)
    {
        $product = Products::findOrFail($id);
        $user = $request->user();

        if ($user->role !== 'admin' && $product->user_id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to delete this product'], 403);
        }

        $images = [];
        if ($product->image) {
            if (is_string($product->image)) {
                $images = json_decode($product->image, true) ?? [];
            } elseif (is_array($product->image)) {
                $images = $product->image;
            }
        }

        foreach ($images as $imagePath) {
            if (\Illuminate\Support\Facades\File::exists(public_path($imagePath))) {
                \Illuminate\Support\Facades\File::delete(public_path($imagePath));
            }
        }

        $product->delete();
        return response()->json(null, 204);
    }

    public function show($id)
    {
        $product = Products::findOrFail($id);
        return response()->json($product);
    }

    public function updateWithImages(Request $request, $id)
    {
        $request->validate([
            'image' => 'nullable|array',
            'image.*' => 'file|image|max:2048',
        ]);

        $product = Products::findOrFail($id);

        if ($request->hasFile('image')) {
            $images = $request->file('image');
            $imagePaths = [];

            foreach ($images as $file) {
                $path = $file->store('products', 'public');
                $imagePaths[] = 'storage/' . $path;
            }

            $product->image = json_encode($imagePaths);
        }

        $product->save();
        return response()->json($product);
    }
}
