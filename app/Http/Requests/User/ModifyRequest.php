<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ModifyRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return
            [
                "password" => 'required|current_password:sanctum',
                "newPassword" => 'required|min:8',
                "newPassword_confirmation" => 'required|min:8'
            ];
    }
}
