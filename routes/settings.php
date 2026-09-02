<?php

use App\Http\Controllers\RegionController;
use App\Http\Controllers\Settings\AddressController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('settings/address', [AddressController::class, 'index'])->name('profile.address');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');

    // ADDRESS
    Route::middleware('auth')->prefix('settings/address')->name('address.')->group(function () {
        Route::get('/', [AddressController::class, 'index'])
            ->name('index');

        Route::get('/create', [AddressController::class, 'create'])
            ->name('create');

        Route::post('/', [AddressController::class, 'store'])
            ->name('store');

        Route::get('/{address}/edit', [AddressController::class, 'edit'])
            ->name('edit');

        Route::put('/{address}', [AddressController::class, 'update'])
            ->name('update');

        Route::patch('/{address}/primary', [AddressController::class, 'setPrimary'])
            ->name('primary');

        Route::delete('/{address}', [AddressController::class, 'destroy'])
            ->name('destroy');
    });
    // Route::get('settings/address', [AddressController::class, 'index'])->name('address.index');
    // Route::get('settings/address/create', [AddressController::class, 'create'])->name('address.create');
    // Route::post('settings/address', [AddressController::class, 'store'])->name('address.store');

    Route::get('/regions/{province}/regencies', [RegionController::class, 'regencies']);
    Route::get('/regions/{regency}/districts', [RegionController::class, 'districts']);
    Route::get('/regions/{district}/villages', [RegionController::class, 'villages']);
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
