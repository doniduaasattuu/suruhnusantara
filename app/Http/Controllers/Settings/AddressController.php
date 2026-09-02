<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;
use App\Http\Resources\AddressResource;
use App\Http\Resources\ProvinceResource;
use App\Models\Address;
use App\Models\Province;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Address::class);

        $addresses = Address::query()
            ->where('user_id', $request->user()->id)
            ->with([
                'province',
                'regency',
                'district',
                'village',
            ])
            ->get();

        return Inertia::render('settings/address/index', [
            'addresses' => AddressResource::collection($addresses),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Address::class);

        return Inertia::render('settings/address/create', [
            'provinces' => ProvinceResource::collection(
                Province::query()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAddressRequest $request)
    {
        Gate::authorize('create', Address::class);

        $user = $request->user();

        $validated = $request->validated();

        DB::transaction(function () use ($user, $validated) {
            // Lock user untuk mencegah race condition
            // ketika beberapa request mencoba mengubah alamat utama.
            $user->newQuery()
                ->whereKey($user->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            $hasPrimaryAddress = $user->addresses()
                ->where('is_primary', true)
                ->exists();

            $isPrimary = $validated['is_primary'] ?? false;

            // Jika user belum mempunyai alamat utama,
            // alamat pertama otomatis menjadi alamat utama.
            if (! $hasPrimaryAddress) {
                $isPrimary = true;
            }

            // Jika alamat baru dijadikan alamat utama,
            // nonaktifkan alamat utama sebelumnya.
            if ($isPrimary) {
                $user->addresses()
                    ->where('is_primary', true)
                    ->update([
                        'is_primary' => false,
                    ]);
            }

            $validated['is_primary'] = $isPrimary;

            $user->addresses()->create($validated);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Alamat berhasil disimpan.')]);

        return to_route('address.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(
        Request $request,
        Address $address
    ): Response {

        Gate::authorize('update', $address);

        return Inertia::render('settings/address/edit', [
            'address' => AddressResource::make(
                $address->load([
                    'province',
                    'regency',
                    'district',
                    'village',
                ])
            ),
            'provinces' => ProvinceResource::collection(
                Province::query()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        Gate::authorize('update', $address);

        $data = $request->validated();

        DB::transaction(function () use ($address, $data) {
            if ($data['is_primary'] ?? false) {
                Address::query()
                    ->where('user_id', $address->user_id)
                    ->whereKeyNot($address->id)
                    ->update([
                        'is_primary' => false,
                    ]);
            }

            $address->update($data);
        });

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Alamat berhasil diperbarui.'),
        ]);

        return to_route('address.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Request $request,
        Address $address
    ): RedirectResponse {
        Gate::authorize('delete', $address);

        $user = $request->user();

        DB::transaction(function () use ($user, $address) {
            $user->newQuery()
                ->whereKey($user->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            $wasPrimary = $address->is_primary;

            $address->delete();

            if ($wasPrimary) {
                $user->addresses()
                    ->latest('id')
                    ->first()
                    ?->update([
                        'is_primary' => true,
                    ]);
            }
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Alamat berhasil dihapus.')]);

        return to_route('address.index');
    }

    public function setPrimary(
        Request $request,
        Address $address
    ): RedirectResponse {
        $user = $request->user();

        abort_unless(
            $address->user_id === $user->id,
            404
        );

        DB::transaction(function () use ($user, $address) {
            $user->newQuery()
                ->whereKey($user->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            $user->addresses()
                ->where('is_primary', true)
                ->update([
                    'is_primary' => false,
                ]);

            $address->update([
                'is_primary' => true,
            ]);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Alamat utama berhasil diubah.')]);

        return to_route('address.index');
    }
}
