<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Header;
use App\Models\Image;
use App\Http\Requests\HeaderRequest;
use Illuminate\Support\Facades\Storage;

class HeaderController extends Controller
{
    public function store(HeaderRequest $request)
    {
        $header = Header::first();
        //Delete previous project images from storage and database
        if ($header && $header->images)
        {

            foreach ($header->images as $img)
            {
                Storage::delete($img->title);
            }
            $header->images()->delete();
        }

        //Update values
        $header = Header::updateOrCreate([], $request->safe()->except("images"));
        if ($request->hasFile("images"))
        {

            foreach ($request->file("images") as $img)
            {
                $imageName =  $img->hashName();
                Storage::putFileAs(null, $img, $imageName);
                Image::create(["path" => Storage::url($imageName), "title" => $imageName])->header()->associate($header)->save();
            }
        }
        return response($header->load("images")->toArray(), 200);
    }
    public function all()
    {
        $header = Header::first();
        $header ? $header->load("images")->toArray() : null;
        return response($header);
    }
}
