<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $user = request()->user();

        if ($user->role === 'admin') {
            return User::with('profile')->get();
        } else if ($user->role === 'presailer') {
            return User::with('profile')->where('user_id', $user->id)->get();
        }
        return User::with('profile')->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $allowedRoles = [];

        if ($user->role === 'admin') {
            $allowedRoles = ['operator', 'presailer'];
        } elseif ($user->role === 'presailer') {
            $allowedRoles = ['contragent'];
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,operator,presailer,contragent',
        ]);

        if (!in_array($request->role, $allowedRoles)) {
            return response()->json(['message' => 'You are not allowed to create this role'], 403);
        }

        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'user_id' => $user->id,
        ]);

        return response()->json($newUser, 201);
    }

    public function destroy(Request $request, User $user)
    {
        $currentUser = $request->user();

        if ($currentUser->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized to delete users'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function update(Request $request, User $user)
    {
        $currentUser = $request->user();

        if ($currentUser->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized to edit users'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role' => 'required|string|in:admin,operator,presailer,contragent',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role,
        ]);

        return response()->json($user);
    }
}
