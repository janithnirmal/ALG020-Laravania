<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

// Route::get('/note', [NoteController::class, 'index'])->name('note.index');
// Route::get('/note/create', [NoteController::class, 'create'])->name('note.create');
// Route::post('/note', [NoteController::class, 'store'])->name('note.store');
// Route::get('/note/{id}', [NoteController::class, 'show'])->name('note.show');
// Route::get('/note/{id}/edit', [NoteController::class, 'edit'])->name('note.edit');
// Route::put('/note/{id}', [NoteController::class, 'update'])->name('note.update');
// Route::delete('/note/{id}', [NoteController::class, 'destroy'])->name('note.destroy');


Route::resource('note', NoteController::class);

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
