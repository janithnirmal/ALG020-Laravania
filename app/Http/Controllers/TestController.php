<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function test()
    {
        return response()->json([
            'message' => 'Test successful',
        ]);
    }

    public function ok(Request $request)
    {

        $isAdmin = $request->attributes->get('isAdmin');

        return response()->json([
            'message' => 'OK',
            'isAdmin' => $isAdmin,
        ]);
    }
}
