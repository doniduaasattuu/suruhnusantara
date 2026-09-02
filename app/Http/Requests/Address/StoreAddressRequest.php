<?php

namespace App\Http\Requests\Address;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => [
                'required',
                'string',
                'max:50',
            ],

            'recipient_name' => [
                'required',
                'string',
                'max:255',
            ],

            'phone' => [
                'required',
                'string',
                'max:20',
                'regex:/^[0-9+\-\s()]+$/',
            ],

            'province_code' => [
                'required',
                'string',
                'exists:provinces,code',
            ],

            'regency_code' => [
                'required',
                'string',
                Rule::exists('regencies', 'code')
                    ->where(
                        fn($query) => $query->where(
                            'province_code',
                            $this->province_code
                        )
                    ),
            ],

            'district_code' => [
                'required',
                'string',
                Rule::exists('districts', 'code')
                    ->where(
                        fn($query) => $query->where(
                            'regency_code',
                            $this->regency_code
                        )
                    ),
            ],

            'village_code' => [
                'required',
                'string',
                Rule::exists('villages', 'code')
                    ->where(
                        fn($query) => $query->where(
                            'district_code',
                            $this->district_code
                        )
                    ),
            ],

            'postal_code' => [
                'required',
                'string',
                'regex:/^\d{5}$/',
            ],

            'address' => [
                'required',
                'string',
                'max:1000',
            ],

            'notes' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'is_primary' => [
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'label.required' => 'Label alamat wajib diisi.',
            'recipient_name.required' => 'Nama penerima wajib diisi.',
            'phone.required' => 'Nomor telepon wajib diisi.',

            'province_code.required' => 'Provinsi wajib dipilih.',
            'province_code.exists' => 'Provinsi yang dipilih tidak valid.',

            'regency_code.required' => 'Kabupaten/Kota wajib dipilih.',
            'regency_code.exists' => 'Kabupaten/Kota yang dipilih tidak sesuai dengan provinsi.',

            'district_code.required' => 'Kecamatan wajib dipilih.',
            'district_code.exists' => 'Kecamatan yang dipilih tidak sesuai dengan Kabupaten/Kota.',

            'village_code.required' => 'Desa/Kelurahan wajib dipilih.',
            'village_code.exists' => 'Desa/Kelurahan yang dipilih tidak sesuai dengan Kecamatan.',

            'postal_code.required' => 'Kode pos wajib diisi.',
            'postal_code.regex' => 'Kode pos harus terdiri dari 5 angka.',

            'address.required' => 'Alamat lengkap wajib diisi.',
        ];
    }

    /**
     * Get custom attribute names for validation errors.
     */
    public function attributes(): array
    {
        return [
            'label' => 'label alamat',
            'recipient_name' => 'nama penerima',
            'phone' => 'nomor telepon',
            'province_code' => 'provinsi',
            'regency_code' => 'kabupaten/kota',
            'district_code' => 'kecamatan',
            'village_code' => 'desa/kelurahan',
            'postal_code' => 'kode pos',
            'address' => 'alamat lengkap',
            'notes' => 'catatan',
            'is_primary' => 'alamat utama',
        ];
    }
}
