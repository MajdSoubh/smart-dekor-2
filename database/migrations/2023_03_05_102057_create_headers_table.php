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
        Schema::create('headers', function (Blueprint $table)
        {
            $table->id();
            $table->string("introTitle")->nullable();
            $table->text("introDescription")->nullable();
            $table->string("outroTitle")->nullable();
            $table->text("outroDescription")->nullable();
            $table->text("portfolioDescription")->nullable();
            $table->text("aboutDescription")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('headers');
    }
};
