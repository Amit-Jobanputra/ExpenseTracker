<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $r){
        $data=$r->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
        ]);
        $user =User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
        ]);
        return response()->json([
            'message'=>'User created successfully',
        ], 201);
    }
    public function login(Request $r){
        $r->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);
        if(!Auth::attempt($r->only('email', 'password'))){
            return response()->json([
                'message'=>'Invalid credentials',
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message'=>'Login successful',
            'token'=>$token,
            'token_type'=>'Bearer',
        ], 200);
}
    public function logout(Request $r){
        $r->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'Logout successful',
        ], 200);
    }
}