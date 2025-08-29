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
        Schema::dropIfExists('products');

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('category')->nullable();
            $table->string('numerologicalName')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('bmCode')->nullable();
            $table->string('article')->nullable();
            $table->string('barcode')->nullable();
            $table->string('size')->nullable();
            $table->integer('packageCount')->nullable();
            $table->string('manufacturer')->nullable();
            $table->text('annotation')->nullable();
            $table->json('image')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('category')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
