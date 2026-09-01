<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class LogAuthenticationEvents
{
    /**
     * Handle the event.
     */
    public function handle(Login|Failed $event): void
    {
        if ($event instanceof Login) {
            Log::channel('audit')->info('User logged in.', [
                'user_id' => $event->user->id,
                'name' => $event->user->name,
                'email' => $event->user->email,
                'ip' => request()->ip(),
            ]);

            return;
        }

        Log::channel('audit')->warning('Authentication failed.', [
            'email' => $event->credentials['email'] ?? null,
            'ip' => request()->ip(),
        ]);
    }
}
