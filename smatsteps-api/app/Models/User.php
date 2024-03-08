<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Sluggable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string, mixed>
     */
    protected $fillable = [
        'user_pseudo',

        'password',
        'user_email',
        'is_admin',
        'user_image',
        'slug',
    ];
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'user_pseudo'
            ]
        ];
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
