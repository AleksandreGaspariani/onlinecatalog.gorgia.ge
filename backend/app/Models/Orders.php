<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $table = 'order_request';
    protected $fillable = [
        'user_id',
        'order_status',
        'delivery_date',
        'email',
        'phone',
        'item_id',
        'quantity',
        'price',
        'total',
        'payment_method',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
