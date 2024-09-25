<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

/**
 * @author Madusha Pravinda <madusha.dev001@gmail.com>
 * @description This controller handles user authentication, including login, registration,
 * and logout functionality. It also manages token-based authentication to ensure secure access for users.
 * @created on 2024-09-23
 * Class AuthController
 * @package App\Http\Controllers
 */

class AuthController extends Controller
{
    /**
     * Register a new user and generate an authentication token for API access.
     *
     * This method validates user input, creates a new user in the database, and generates a
     * personal access token for authentication using Laravel Sanctum. It returns a JSON
     * response containing the token, which can be used for subsequent API requests.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        //Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        //Create a new user and hash their password
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        //Generate a token for the user (Token-based authentication)
        $token = $user->createToken('authTokenUser')->plainTextToken;

        //Store the token in the session for future requests (if needed)
        session(['auth_token' => $token]);

        //Return the token and a success message
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,  // Returning the token for client-side use
        ], 201);
    }
    /**
     * Authenticate a user and generate a personal access token upon successful login.
     *
     * This method checks user credentials, and if they are valid, it generates a new
     * authentication token using Laravel Sanctum and returns the token in the response.
     * The token can be used for API authentication.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        //Validate the incoming request data
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        //Attempt to find the user by email
        $user = User::where('email', $credentials['email'])->first();

        //Check if the user exists and the password matches
        if ($user && Hash::check($credentials['password'], $user->password)) {
            //Generate a new token for the authenticated user
            $token = $user->createToken('authTokenUser')->plainTextToken;

            // Optionally store token in the session if needed
            session(['auth_token' => $token]);

            //Return the token and user info
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,  // Return token to the client for authentication in future requests
            ], 200);
        }

        //Return an error message if credentials are invalid
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    /**
     * Logout the user by revoking the current authentication token and clearing the session.
     *
     * This method ensures that the token-based authentication is invalidated by deleting
     * the currently used token. Optionally, it can also clear the session if the token 
     * was stored there for front-end access.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Get the user's current token and revoke (delete) it
        $request->user()->currentAccessToken()->delete();

        // Optionally, clear the auth_token from the session if it was stored there
        session()->forget('auth_token');

        return response()->json(['message' => 'Logout successful'], 200);
    }

    /**
     * Handle the process of sending a password reset link to the user's email.
     *
     * This method validates the user's email, generates a password reset token,
     * and sends an email with the reset link to the user. The user can use this
     * link to reset their password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'email' => 'required|string|email|max:255',
        ]);

        // Attempt to find the user by email
        $user = User::where('email', $request->email)->first();

        // If the user does not exist, return an error message
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Generate a password reset token
        $token = app('auth.password.broker')->createToken($user);

        // Send the password reset email
        Password::sendResetLink(
            $request->only('email')
        );

        // Return a success message
        return response()->json([
            'message' => 'Password reset link sent',
            'token' => $token,  // Return token to the client for authentication in future requests
        ], 200);
    }

}
