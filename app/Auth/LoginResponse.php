<?php

namespace App\Auth;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        if ($request->user()->isAdministrator()) {
            return redirect()->route('administrator.dashboard');
        }

        return redirect()->intended(
            route('dashboard')
        );
    }
}
