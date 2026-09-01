<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Log;

class LogUserRegistered
{
    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        Log::channel('audit')->info('User registered.', [
            'user_id' => $event->user->id,
            'name' => $event->user->name,
            'email' => $event->user->email,
            'ip' => request()->ip(),
        ]);
    }
}
