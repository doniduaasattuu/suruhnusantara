<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HasPerPagePreference;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class UserController extends Controller
{
    use HasPerPagePreference;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('index_user');

        $perPage = $this->getPerPage($request);

        $users = User::with(['addresses'])
            ->search($request)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('administrator/user/index', [
            'users' => UserResource::collection($users),
            'roles' => Role::pluck('name'),
            'filters' => [
                'query' => $request->query('query'),
                'per_page' => (string) $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('delete_user');

        try {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $user->delete();

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Pengguna berhasil dihapus secara permanen.')]);
            return to_route('users.index');
        } catch (Throwable $e) {

            Inertia::flash('toast', ['type' => 'success', 'message' => __($e->getMessage() ?? 'Pengguna berhasil dihapus permanen.')]);
            return to_route('users.index');
        }
    }

    public function activate(User $user): RedirectResponse
    {
        $user->update([
            'is_active' => true,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Pengguna berhasil diaktifkan.')]);

        return to_route('users.index');
    }

    public function deactivate(User $user): RedirectResponse
    {
        if ($user->isAdministrator()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('Tidak diperbolehkan.')]);
            abort(404);
            return to_route('users.index');
        };

        $user->update([
            'is_active' => false,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Pengguna berhasil non aktifkan.')]);

        return to_route('users.index');
    }
}
