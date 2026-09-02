<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('addresses')->truncate();

        $users = User::query()
            ->whereIn('email', [
                'doni@gmail.com',
            ])
            ->get();

        foreach ($users as $user) {
            $village = \App\Models\Village::query()
                ->inRandomOrder()
                ->firstOrFail();

            $district = $village->district;
            $regency = $district->regency;
            $province = $regency->province;

            Address::create([
                'user_id' => $user->id,
                'label' => 'Rumah',
                'recipient_name' => $user->name,
                'phone' => '08' . fake()->numerify('##########'),
                'address' => fake()->streetAddress(),
                'province_code' => $province->code,
                'regency_code' => $regency->code,
                'district_code' => $district->code,
                'village_code' => $village->code,
                'postal_code' => $village->postal_code,
                'notes' => null,
                'is_primary' => true,
            ]);

            $village = \App\Models\Village::query()
                ->inRandomOrder()
                ->firstOrFail();

            $district = $village->district;
            $regency = $district->regency;
            $province = $regency->province;

            Address::create([
                'user_id' => $user->id,
                'label' => 'Kantor',
                'recipient_name' => $user->name,
                'phone' => '08' . fake()->numerify('##########'),
                'address' => fake()->streetAddress(),
                'province_code' => $province->code,
                'regency_code' => $regency->code,
                'district_code' => $district->code,
                'village_code' => $village->code,
                'postal_code' => $village->postal_code,
                'notes' => null,
                'is_primary' => false,
            ]);
        }
    }
}
