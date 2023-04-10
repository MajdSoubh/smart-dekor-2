<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(CategoryRequest $request)
    {
        $validated = $request->validated();

        $category = Category::Create($validated);
        return response($category, 200);
    }
    public function modify(CategoryRequest $request, $id)
    {
        $validated = $request->validated();
        $category = Category::find($id);
        $exist = !is_null($category) || !empty($category);
        if (!$exist)
        {

            return response(null, 404);
        }
        $category = $category->update($validated);
        return response($category);
    }


    public function show($id)
    {
        $category = Category::find($id);
        $exist = !is_null($category) || !empty($category);
        if (!$exist)
        {

            return response(null, 404);
        }
        return response($category, 200);
    }

    public function all()
    {

        $categories = Category::all();
        return response($categories);
    }
    public function delete($id)
    {
        $category = Category::find($id);
        $exist = !is_null($category) || !empty($category);
        if (!$exist)
        {

            return response(null, 404);
        }
        $cat = Category::destroy($id);
        return response($cat, 200);
    }
}
