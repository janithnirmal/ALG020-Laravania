<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;


// routes:pages

// client
Route::get('/', function () {
    return view('pages.client.home');
});
Route::get('/home', function () {
    return view('pages.client.home');
});

Route::get('/shop', function () {
    return view('pages.client.shop');
});
Route::get('/about', function () {
    return view('pages.client.about');
});


// admin
Route::get('/admin', function () {
    return view('pages.admin.home');
});
