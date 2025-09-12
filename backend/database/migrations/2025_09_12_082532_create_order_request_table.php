<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_request', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('order_status');
            $table->date('delivery_date')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('item_id');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('total', 12, 2);
            $table->string('payment_method');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_request');
    }
};
