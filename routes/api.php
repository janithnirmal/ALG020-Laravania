<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Models\Admin;
use App\Http\Controllers\TestController;
use App\Http\Middleware\TestMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Register, login, and logout,forgotten [API] routes
Route::post('/register', [AuthController::class, "register"]);
Route::post('/login', [AuthController::class, "login"]);
Route::post('/logout', [AuthController::class, "logout"])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, "forgotPassword"]);

// Admin login route
Route::post('/admin_login', [AdminAuthController::class, "login"]);

// Admin protected route
Route::middleware(['auth:admin-api', 'role:2'])->group(function () {
    Route::post('/admin_dashboard', [AdminController::class, 'dashboard']);
});

Route::middleware(['auth:admin-api', 'role:1'])->group(function () {
    Route::post('/super_admin_dashboard', [AdminController::class, 'dashboard']);
});
// Test routes
// Route::middleware(["auth:sanctum", TestMiddleware::class])->group(function () {
// });

Route::get('/test', [TestController::class, "test"]);
Route::post('/test', [TestController::class, "test"])->middleware('api');
