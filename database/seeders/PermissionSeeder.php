<?php

namespace Database\Seeders;

use Database\Seeders\Traits\HasPermissionGenerator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    use HasPermissionGenerator;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            'User',
            'Role',
            'Permission',
            'Event',
            'Product',
        ];

        $this->generatePermissions($models);
    }
}
