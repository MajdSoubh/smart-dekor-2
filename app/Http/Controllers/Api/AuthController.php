<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\SignupRequest;
use App\Http\Requests\User\ModifyRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credinatials = $request->validated();
        if (!Auth::attempt($credinatials))
        {
            return response(['message' => "Email address or password is incorrect"]);
        }
        /** @var user User */
        $user =   Auth::user();
        $token =   $user->createToken('main')->plainTextToken;
        return response(['user' => $user->name, 'token' => $token]);
    }
    public function signup(SignupRequest $request)
    {
        /** @var user User */
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
        ]);
        $token =   $user->createToken('main')->plainTextToken;
        return response(['user' => $user->name, 'token' => $token]);
    }
    public function modify(ModifyRequest $request)
    {

        $user = User::first();

        $check = Hash::check($request->password, $user->password);
        if (!$check)
        {
            return response(['message' => 'Invalid credential']);
        }

        $user->password = bcrypt($request['newPassword']);
        $user->save();
        return response($user, 200);
    }
    public function logout()
    {
        if (!auth("sanctum")->user())
        {
            return response("You are not login", 404);
        }
        /** @var user User */
        $user = auth("sanctum")->user();
        $user->currentAccessToken()->delete();
        return response('true', 204);
    }
}
