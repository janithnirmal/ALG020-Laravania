<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController
{
    public function dashboard()
    {
        return response()->json(['message' => 'Admin dashboard']);
    }
}
