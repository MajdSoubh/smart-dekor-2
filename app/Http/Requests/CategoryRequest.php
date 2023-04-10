<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
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

    public function onUpdate()
    {
        return ["name" => "required|string|", Rule::unique("categories")->ignore($this->route('id'))];
    }
    public function onCreate()
    {
        return ["name" => "required|string"];
    }
    public function rules()
    {
        if (request()->isMethod("put") || request()->isMethod("patch"))
        {
            return $this->onUpdate();
        }

        return $this->onCreate();
    }
}
