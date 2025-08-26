<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $profile = $request->user()->profile;
        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'contact_phone' => 'required|string',
            'contact_email' => 'required|email',
            'contact_address' => 'required|string',
            'contact_tin' => 'required|string',
            'contact_iban' => 'required|string',
            'contact_name' => 'required|string',
        ]);
        $profile = $user->profile ?: new Profile(['user_id' => $user->id]);
        $profile->fill($data);
        $profile->save();
        return response()->json(['success' => true, 'profile' => $profile]);
    }
}
