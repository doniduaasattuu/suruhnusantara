<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    public function getRouteKeyName(): string
    {
        return 'code';
    }

    // Relation
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'province_code', 'code');
    }

    public function regencies(): HasMany
    {
        return $this->hasMany(
            Regency::class,
            'province_code',
            'code'
        );
    }
}
