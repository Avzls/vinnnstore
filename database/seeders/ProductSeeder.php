<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
        'name' => 'Netflix Premium 1 Bulan',
        'price' => 30000,
    ]);

    Product::create([
        'name' => 'YouTube Premium 1 Bulan',
        'price' => 20000,
    ]);
    }
}
