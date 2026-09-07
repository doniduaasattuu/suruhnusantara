<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administrator = User::updateOrCreate(
            ['email' => 'admin@snc.org'],
            [
                'name' => 'Administrator',
                'phone' => '81234567890',
                'gender' => 'male',
                'birth_date' => '1970-01-01',
                'password' => Hash::make(config('app.default_password')),
            ]
        );

        $administratorRole = Role::firstOrcreate([
            'name' => 'administrator',
        ]);

        $administratorRole->givePermissionTo(Permission::all());

        $administrator->assignRole($administratorRole);
    }
}
