<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = ['title', 'description'];

    public function lists()
    {
        return $this->hasMany(BoardList::class);
    }
}