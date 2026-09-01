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
        Schema::create('districts', function (Blueprint $table) {
            $table->string('code', 15)->primary();

            $table->string('regency_code', 10);
            $table->string('name');

            $table->timestamps();

            $table->foreign('regency_code')
                ->references('code')
                ->on('regencies')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->index('regency_code');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
