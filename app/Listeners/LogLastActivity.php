<?php

namespace App\Listeners;

use App\Events\UserActivityDetected;
use Carbon\Carbon;

class LogLastActivity
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserActivityDetected $event): void
    {
        $user = $event->user;

        if (
            !$user->last_login_at ||
            $user->last_login_at->lt(Carbon::now()->subMinute())
        ) {
            $user->update(['last_login_at' => now()]);
        }
    }
}
