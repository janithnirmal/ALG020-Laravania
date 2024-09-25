<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request)
    {
        $email = $request->input('age');

        return response()->json([
            'status' => 'success',
        ]);
    }
}
