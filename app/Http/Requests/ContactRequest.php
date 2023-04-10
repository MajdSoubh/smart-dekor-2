<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }


    public function attributes()
    {
        return [
            'email' => 'Email address',
            'whatsapp' => 'Whats app',
            "phone" => "Phone",
            "address" => "Address",
            "facebook" => "Facebook",
            "instagram" => "Instagram",

        ];
    }

    public function rules()
    {
        return [
            "email" => "email|nullable",
            "whatsapp" => "string|nullable",
            "phone" => "string|nullable",
            "address" => "string|nullable",
            "facebook" => "string|nullable",
            "instagram" => "string|nullable",
        ];
    }
}
