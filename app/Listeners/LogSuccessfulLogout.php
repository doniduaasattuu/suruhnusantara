<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Log;

class LogSuccessfulLogout
{

    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        $user = User::find($event->user?->id);

        Log::channel('audit')->info('User logged out.', [
            'user_id' => $event->user?->id,
            'name' => $event->user?->name,
            'email' => $event->user?->email,
            'ip' => request()->ip(),
        ]);

        if ($user) {
            $user->update(['last_logout_at' => now()]);
        }
    }
}
