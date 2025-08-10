<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['nama'];

    public function keuangans()
    {
        return $this->hasMany(Keuangan::class);
    }
}
