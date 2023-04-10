<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HeaderRequest extends FormRequest
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
            "introTitle" => "Intro title",
            "introDescription" => "Intro description",
            "outroTitle" => "Outro title",
            "outroDescription" => "Outro description",
            "portfolioDescription" => "Portfolio description",
            "aboutDescription" => "About description",

        ];
    }

    public function rules()
    {
        return [
            "introTitle" => "nullable|string",
            "introDescription" => "nullable|string",
            "outroTitle" => "nullable|string",
            "outroDescription" => "nullable|string",
            "portfolioDescription" => "nullable|string",
            "aboutDescription" => "nullable|string",
            "images" => "nullable|array",
            "images.*" => "image",
        ];
    }
}
