<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function store(ContactRequest $request)
    {
        $validated = $request->validated();
        $contact = Contact::updateOrCreate([], $validated);
        return response($contact->toArray());
    }
    public function all()
    {
        $contact = Contact::first();

        return response($contact);
    }
}
