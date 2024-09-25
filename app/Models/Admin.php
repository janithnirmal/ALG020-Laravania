<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Define the table associated with this model
    protected $table = 'admins';

    // Specify fillable fields for mass assignment
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',  // For example, super_admin = 1, admin = 2
    ];

    // Hidden fields when serializing the model
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Cast fields to specific types
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
