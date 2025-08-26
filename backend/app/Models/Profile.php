<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'contact_phone',
        'contact_email',
        'contact_address',
        'contact_tin',
        'contact_iban',
        'contact_name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
