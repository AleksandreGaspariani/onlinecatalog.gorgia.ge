<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group_id' => 'nullable|string|max:50',
            'image' => 'nullable|file|image|max:2048',
        ]);

        $categoryName = $request->input('name');
        $groupId = $request->input('group_id');

        if ($groupId && Category::where('name', $categoryName)->where('group_id', $groupId)->exists()) {
            return response()->json(['error' => 'group_id must be unique'], 400);
        }

        $attachment = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('category', 'public');
            $attachment = 'storage/' . $path;
        }

        $category = Category::create([
            'group_id' => $request->input('group_id'),
            'name' => $request->input('name'),
            'attachment' => $attachment,
        ]);

        return response()->json($category, 201);
    }

    public function index()
    {
        $user = request()->user();

        if ($user && $user->role === 'contragent') {
            $categoryIds = $user->categories ? (is_array($user->categories) ? $user->categories : json_decode($user->categories, true)) : [];
            $categories = Category::whereIn('id', $categoryIds)->get();
        } else {
            $categories = Category::all();
        }
        return response()->json($categories);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group_id' => 'nullable|string|max:50',
            'image' => 'nullable|file|image|max:2048',
        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->input('name');
        $category->group_id = $request->input('group_id');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('category', 'public');
            $category->attachment = 'storage/' . $path;
        }

        $category->save();
        return response()->json($category);
    }

    public function destroy($id, Request $request)
    {
        $category = Category::findOrFail($id);
        $user = $request->user();

        if ($user->role !== 'admin' && $category->user_id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to delete this category'], 403);
        }

        if ($category->attachment && File::exists(public_path($category->attachment))) {
            File::delete(public_path($category->attachment));
        }
        $category->delete();
        return response()->json(null, 204);
    }
}
