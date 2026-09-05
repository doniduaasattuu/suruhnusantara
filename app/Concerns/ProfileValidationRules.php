<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'email' => $this->emailRules($userId),
            'phone' => $this->phoneRules(),
            'avatar' => $this->avatarRules(),
            'bio' => $this->bioRules(),
            'birth_date' => $this->birthDateRules(),
            'gender' => $this->genderRules(),
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Get the validation rules used to validate user emails.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }

    /**
     * Get the validation rules used to validate user phone numbers.
     *
     * @return array<int, ValidationRule|string>
     */
    protected function phoneRules(): array
    {
        return [
            'phone' => ['required', 'string', 'regex:/^\+?[0-9]{7,15}$/'],
        ];
    }

    /**
     * Get the validation rules used to validate user avatars.
     *
     * @return array<int, ValidationRule|string>
     */
    protected function avatarRules(): array
    {
        return [
            'nullable',
            'image',
            'mimes:jpg,jpeg,png,webp',
            'max:2048',
        ];
    }

    /**
     * Get the validation rules used to validate user biographies.
     *
     * @return array<int, ValidationRule|string>
     */
    protected function bioRules(): array
    {
        return [
            'nullable',
            'string',
            'max:1000',
        ];
    }

    /**
     * Get the validation rules used to validate user birth dates.
     *
     * @return array<int, ValidationRule|string>
     */
    protected function birthDateRules(): array
    {
        return [
            'required',
            'date:Y-m-d',
            'before:today',
        ];
    }

    /**
     * Get the validation rules used to validate user genders.
     *
     * @return array<int, ValidationRule|string>
     */
    protected function genderRules(): array
    {
        return [
            'nullable',
            'required',
            Rule::in([
                'male',
                'female',
            ]),
        ];
    }
}
