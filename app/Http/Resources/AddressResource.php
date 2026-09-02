<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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

            // User
            'user_id' => $this->user_id,

            // Address information
            'label' => $this->label,
            'recipient_name' => $this->recipient_name,
            'phone' => $this->phone,
            'address' => $this->address,

            // Administrative region
            'province_code' => $this->province_code,
            'province' => ProvinceResource::make(
                $this->whenLoaded('province')
            ),

            'regency_code' => $this->regency_code,
            'regency' => RegencyResource::make(
                $this->whenLoaded('regency')
            ),

            'district_code' => $this->district_code,
            'district' => DistrictResource::make(
                $this->whenLoaded('district')
            ),

            'village_code' => $this->village_code,
            'village' => VillageResource::make(
                $this->whenLoaded('village')
            ),

            'postal_code' => $this->postal_code,

            // Additional information
            'notes' => $this->notes,

            // Primary address
            'is_primary' => $this->is_primary,

            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
