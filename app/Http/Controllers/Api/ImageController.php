<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function get($path)
    {
        if (!Storage::exists($path))
        {

            return response(null, 404);
        }

        $img = Storage::get($path);
        return response($img)->header("Content-Type", Storage::mimeType($path));
    }
}
