<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    function welcome()
    {
        return view("welcome");
    }
}
