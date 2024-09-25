<?php
/**
 * AdminAuthController handles admin login and API token generation.
 *
 * - Validates email and password for login.
 * - Uses the 'admin-api' guard for authentication.
 * - Generates Sanctum API tokens upon successful login.
 * - Returns admin info and token in a JSON response.
 * - Responds with 401 error for invalid credentials.
 *
 * Requirements:
 * - Sanctum must be installed and configured.
 * - 'admin-api' guard set up in `config/auth.php`.
 */
namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

// Define the AdminAuthController class that extends the base Controller
class AdminAuthController extends Controller
{
    // Method to handle the login functionality
    public function login(Request $request)
    {
        // Validate the incoming request, ensuring the email and password are provided and properly formatted
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the admin using the provided credentials through the 'admin-api' guard
        if (Auth::guard('admin-api')->attempt($credentials)) {
            //Attempt to find the user by email
            $admin = Admin::where('email', $credentials['email'])->first();
            //If the user is found and the password is correct, then create a token for the user
            $token = $admin->createToken('adminAuthToken')->plainTextToken;
            // Return a JSON response with a success message, the authenticated admin's information, and the API token
            return response()->json([
                'message' => 'Admin logged in successfully',
                'admin' => $admin,
                'token' => $token,
            ], 200);
        }
        //Return an error message if credentials are invalid
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
