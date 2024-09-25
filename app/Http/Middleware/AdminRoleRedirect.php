<?php
/**
 * AdminRoleRedirect Middleware checks the role of the authenticated admin user.
 *
 * - Ensures the admin is authenticated via the 'admin-api' guard.
 * - Verifies if the admin has the specified role.
 * - If unauthorized, returns a 401 response.
 * - Proceeds with the request if the admin has the correct role.
 *
 * Usage:
 * - Apply this middleware to routes requiring role-based access control for admins.
 */
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRoleRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Retrieve the authenticated admin user from the 'admin-api' guard
        $admin = Auth::guard('admin-api')->user();

        // Check if the admin user is not authenticated or does not have the required role
        if (!$admin || $admin->role !== $role) {
            // Return a JSON response with an 'Unauthorized' message and a 401 status code
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // If the admin user is authenticated and has the required role, proceed with the request
        return $next($request);
    }
}
