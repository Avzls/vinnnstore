<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return inertia('Cart/Index', [
            'cart' => session('cart', [])
        ]);
    }

    public function addToCart(Request $request)
    {
        $productId = $request->product_id;
        $product = Product::findOrFail($productId);

        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            // Kalau sudah punya item, tambah quantity
            $cart[$productId]['quantity'] = ($cart[$productId]['quantity'] ?? 1) + 1;
        } else {
            // Item baru
            $cart[$productId] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => 1,
            ];
        }

        session()->put('cart', $cart);
        return back();
    }

    public function checkout()
    {
        $cart = session()->get('cart', []);

        // Hitung aman meski quantity belum ada
        $total = array_reduce($cart, function ($t, $i) {
            return $t + ($i['price'] * ($i['quantity'] ?? 1));
        }, 0);

        return Inertia::render('Checkout', [
            'cart' => $cart,
            'total' => $total,
        ]);
    }
    public function clear()
{
    session()->forget('cart');
    return back();
}

}
