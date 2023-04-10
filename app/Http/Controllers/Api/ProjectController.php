<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use GuzzleHttp\Psr7\Request;
use Illuminate\Contracts\Cache\Store;

class ProjectController extends Controller
{
    public function store(ProjectRequest $request)
    {
        $project = Project::create($request->safe()->except("category", "images"))->category()->associate($request->safe()->category);
        $project->save();
        foreach ($request->file("images") as $img)
        {
            $imageName =  $img->hashName();
            $path = Storage::putFileAs(null, $img, $imageName);
            Image::create(["path" => Storage::url($imageName), "title" => $imageName])->project()->associate($project)->save();
        }
        return response($project);
    }
    public function all()
    {
        $projects = Project::all()->load("images", "category");
        return response($projects, 200);
    }
    public function show($id)
    {
        $project = Project::find($id)->load("images");
        $exists = !is_null($project) || !empty($project);
        if (!$exists)
        {
            return response(null, 404);
        }

        return response($project, 200);
    }
    public function modify(ProjectRequest $request, $id)
    {
        $project = Project::find($id);
        $exist = !is_null($project) || !empty($project);
        if (!$exist)
        {

            return response(null, 404);
        }
        //Delete previous project images from storage and database
        foreach ($project->images as $img)
        {
            Storage::delete($img->title);
        }
        $project->images()->delete();

        //Update project with updated data
        $project->update($request->safe()->except("category", "images"));
        $project->category()->associate($request->safe()->category);
        $project->save();
        foreach ($request->file("images") as $img)
        {
            $imageName =  $img->hashName();
            Storage::putFileAs(null, $img, $imageName);
            Image::create(["path" => Storage::url($imageName), "title" => $imageName])->project()->associate($project)->save();
        }
        return response($project->load("images")->toArray(), 200);
    }
    public function delete($id)
    {

        $category = Project::find($id);
        $exist = !is_null($category) || !empty($category);
        if (!$exist)
        {

            return response(null, 404);
        }
        $cat = Project::destroy($id);
        return response($cat, 200);
    }
}
