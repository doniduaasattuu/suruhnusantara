<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Regency extends Model
{
    public function getRouteKeyName(): string
    {
        return 'code';
    }

    // Relation
    public function province(): BelongsTo
    {
        return $this->belongsTo(
            Province::class,
            'province_code',
            'code'
        );
    }

    public function districts(): HasMany
    {
        return $this->hasMany(
            District::class,
            'regency_code',
            'code'
        );
    }
}
