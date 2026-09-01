<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'label',
    'recipient_name',
    'phone',
    'address',
    'province_code',
    'regency_code',
    'district_code',
    'village_code',
    'postal_code',
    'notes',
    'is_primary',
    'province_code',
    'regency_code',
    'district_code',
    'village_code',
])]
class Address extends Model
{
    // RELATION
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
