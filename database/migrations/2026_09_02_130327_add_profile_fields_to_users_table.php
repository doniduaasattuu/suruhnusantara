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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)
                ->nullable()
                ->after('email');

            $table->string('avatar')
                ->nullable()
                ->after('phone');

            $table->text('bio')
                ->nullable()
                ->after('avatar');

            $table->date('birth_date')
                ->nullable()
                ->after('bio');

            $table->string('gender', 20)
                ->nullable()
                ->after('birth_date');

            $table->timestamp('last_login_at')
                ->nullable()
                ->after('password');

            $table->boolean('is_active')
                ->default(true)
                ->after('last_login_at');

            $table->index('phone');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['phone']);
            $table->dropIndex(['is_active']);

            $table->dropColumn([
                'phone',
                'avatar',
                'bio',
                'birth_date',
                'gender',
                'last_login_at',
                'is_active',
            ]);
        });
    }
};
