<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected  $guarded = [];

    protected $hidden = ["header_id", "project_id"];
    public $timestamps = false;
    public function Project()
    {
        return $this->belongsTo(Project::class);
    }
    public function Header()
    {
        return $this->belongsTo(Header::class);
    }
}
