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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();

            /*
    |--------------------------------------------------------------------------
    | User
    |--------------------------------------------------------------------------
    */

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            /*
    |--------------------------------------------------------------------------
    | Address Information
    |--------------------------------------------------------------------------
    */

            $table->string('label', 50);

            $table->string('recipient_name');

            $table->string('phone', 20);

            $table->text('address');

            /*
    |--------------------------------------------------------------------------
    | Administrative Region
    |--------------------------------------------------------------------------
    */

            $table->string('province_code', 10);

            $table->string('regency_code', 10);

            $table->string('district_code', 15);

            $table->string('village_code', 20);

            $table->string('postal_code', 5);

            /*
    |--------------------------------------------------------------------------
    | Additional Information
    |--------------------------------------------------------------------------
    */

            $table->string('notes')->nullable();

            /*
    |--------------------------------------------------------------------------
    | Primary Address
    |--------------------------------------------------------------------------
    */

            $table->boolean('is_primary')->default(false);

            $table->timestamps();

            /*
    |--------------------------------------------------------------------------
    | Foreign Keys
    |--------------------------------------------------------------------------
    */

            $table->foreign('province_code')
                ->references('code')
                ->on('provinces')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreign('regency_code')
                ->references('code')
                ->on('regencies')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreign('district_code')
                ->references('code')
                ->on('districts')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreign('village_code')
                ->references('code')
                ->on('villages')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            /*
    |--------------------------------------------------------------------------
    | Indexes
    |--------------------------------------------------------------------------
    */

            $table->index('user_id');
            $table->index('is_primary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
