<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\HeaderController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ImageController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request)
{
    return $request->user();
});
Route::middleware("auth:sanctum")->group(function ()
{
    Route::get('/logout', [AuthController::class, "logout"]);


    Route::post('/contact/update', [ContactController::class, "store"]);

    Route::post('/header/update', [HeaderController::class, "store"]);

    Route::post('/category', [CategoryController::class, "store"]);
    Route::put('/category/{id}', [CategoryController::class, "modify"]);
    Route::delete('/category/{id}', [CategoryController::class, "delete"]);


    Route::post('/project', [ProjectController::class, "store"]);
    Route::post('/project/{id}', [ProjectController::class, "modify"]);
    Route::delete('/project/{id}', [ProjectController::class, "delete"]);
});


Route::post('/signup', [AuthController::class, "signup"]);
Route::post('/login', [AuthController::class, "login"]);

Route::get('/contact', [ContactController::class, "all"]);

Route::get('/header', [HeaderController::class, "all"]);

Route::get('/category', [CategoryController::class, "all"]);

Route::get('/category/{id}', [CategoryController::class, "show"]);


Route::get('/project', [ProjectController::class, "all"]);
Route::get('/project/{id}', [ProjectController::class, "show"]);

Route::get('/image/{path}', [ImageController::class, "get"]);
Route::get('/i', function (Request $request)
{
    return $request->header();
});
