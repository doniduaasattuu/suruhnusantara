<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    public function getRouteKeyName(): string
    {
        return 'code';
    }

    // Relation
    public function regency()
    {
        return $this->belongsTo(
            Regency::class,
            'regency_code',
            'code'
        );
    }

    public function villages(): HasMany
    {
        return $this->hasMany(
            Village::class,
            'district_code',
            'code'
        );
    }
}
