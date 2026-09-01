<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('villages', function (Blueprint $table) {
            $table->string('code', 20)->primary();

            $table->string('district_code', 15);
            $table->string('name');

            $table->string('postal_code', 5)->nullable();

            $table->timestamps();

            $table->foreign('district_code')
                ->references('code')
                ->on('districts')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->index('district_code');
            $table->index('name');
            $table->index('postal_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('villages');
    }
};
