<?php

use App\Http\Controllers\AdministratorDashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('administrator')->group(function () {

        Route::get('dashboard', [AdministratorDashboardController::class, 'index'])->name('administrator.dashboard');

        // USER
        Route::patch('/users/{user}/activate', [UserController::class, 'activate'])
            ->name('users.activate');
        Route::patch('/users/{user}/deactivate', [UserController::class, 'deactivate'])
            ->name('users.deactivate');
        Route::resource('users', UserController::class);
    });
});
