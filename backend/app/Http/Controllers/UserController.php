<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
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
        ]);

        return response()->json($newUser, 201);
    }
}
