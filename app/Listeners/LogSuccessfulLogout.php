<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Log;

class LogSuccessfulLogout
{

    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        Log::channel('audit')->info('User logged out.', [
            'user_id' => $event->user?->id,
            'name' => $event->user?->name,
            'email' => $event->user?->email,
            'ip' => request()->ip(),
        ]);
    }
}
