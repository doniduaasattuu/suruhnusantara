<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request?->user()?->load(['roles.permissions']);
        $roles = [];
        $permissions = [];

        if ($user) {
            $roles = $user->roles->pluck('name')->unique()->toArray();

            $permissions = $user->roles
                ->flatMap->permissions
                ->pluck('name')
                ->unique()
                ->mapWithKeys(fn($permission) => [$permission => true]);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user()
                    ? [
                        ...$request->user()->toArray(),
                        'isAdministrator' => $request->user()->isAdministrator(),
                    ]
                    : null,
                'roles' => $roles,
                'permissions' => $permissions,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
