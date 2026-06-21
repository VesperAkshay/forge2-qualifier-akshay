<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['list_id', 'title', 'description', 'position', 'due_date'];

    public function list()
    {
        return $this->belongsTo(BoardList::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function members()
    {
        return $this->belongsToMany(Member::class);
    }
}