<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SecurityController extends Controller
{
    public function login(Request $request)
    {

        try {
            $validation = Validator::make(request()->all(), [
                // 'user_pseudo' => 'required|user_pseudo',
                // 'password' => 'required'
            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validation->errors()
                ], 401);
            }
            //verifi si leuser exist
            if (!Auth::attempt($request->only(['user_pseudo', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => "Le pseudo ou le mot de passe ne sont pas correct"
                ], 401);
            }

            $user = User::where("user_pseudo", $request->user_pseudo)->first();

            return response()->json([
                "status" => true,
                "message" => "User connecté",
                "user" => $user,
                //plainTextToken  => token en forme de string
                "token" => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 403);
        }
    }

    public function register(Request $request)
    {
        try {
            $validation = Validator::make(request()->all(), [

                'user_pseudo' => 'required|min:1|string|unique:users,user_pseudo,',
                'user_email' => 'required|min:1|string|unique:users,user_email,',
                'password' => 'required|string|min:8',

            ]);

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation error',
                    'errors' => $validation->errors(),
                ], 401);
            }

            $user = User::create([
                'user_pseudo' => request('user_pseudo'),

                'user_email' => request('user_email'),
                'is_admin' => false,
                'password' => Hash::make(request('password')),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Merci pour votre inscription',
                'user' => $user,
                'token' => $user->createToken('API TOKEN')->plainTextToken
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 403);
        }
    }

    public function logout(Request $request)
    {
        // Auth::logout();
        // $request->user()->tokens()->delete();

        return response()->json(['message' => 'Deconnexion']);
    }
}
