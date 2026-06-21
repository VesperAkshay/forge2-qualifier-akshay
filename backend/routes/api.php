<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BoardController;
use App\Http\Controllers\API\BoardListController;
use App\Http\Controllers\API\CardController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\MemberController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Board routes
Route::apiResource('boards', BoardController::class);

// BoardList routes (using BoardList to avoid PHP reserved keyword)
Route::apiResource('lists', BoardListController::class);

// Card routes
Route::apiResource('cards', CardController::class);
Route::post('cards/{card}/move', [CardController::class, 'move']);

// Tag routes
Route::apiResource('tags', TagController::class);

// Member routes
Route::apiResource('members', MemberController::class);

// Card relationship routes
Route::post('cards/{card}/tags', [CardController::class, 'attachTags']);
Route::delete('cards/{card}/tags/{tag}', [CardController::class, 'detachTag']);
Route::post('cards/{card}/members', [CardController::class, 'attachMembers']);
Route::delete('cards/{card}/members/{member}', [CardController::class, 'detachMember']);