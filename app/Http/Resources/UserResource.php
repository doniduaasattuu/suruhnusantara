<?php

namespace App\Http\Resources;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' =>  "+62" . $this->phone,
            'avatar' => $this->avatar,
            'avatar_url' => $this->avatar_url,
            'is_active' => $this->is_active,
            'last_login_at' => $this->last_login_at,
            'last_logout_at' => $this->last_logout_at,
            'bio' => $this->bio,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'gender' => $this->gender,
            'email_verified_at' => $this->email_verified_at?->toISOString(),
            'two_factor_enabled' => ! is_null($this->two_factor_secret),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),

            'isAdministrator' => $this->isAdministrator(),

            'addresses' => AddressResource::collection($this->whenLoaded('addresses')),

            'primaryAddress' => new AddressResource(
                $this->whenLoaded('addresses', function () {
                    return $this->addresses->firstWhere('is_primary', true);
                })
            ),
        ];
    }
}
