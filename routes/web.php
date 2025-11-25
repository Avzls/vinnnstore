<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\CartController;    
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Auth\Auth;
use Illuminate\Foundation\Application;

/**
 |---------------------------
 | HOMEPAGE -> PRODUCT LIST
 |---------------------------
*/

Route::resource('admin/products', ProductController::class)
    ->names('admin.products');

/**
 |---------------------------
 | ADMIN ROUTES
 |---------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
        ->name('dashboard');
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);

});





/**
 |---------------------------
 | CART ROUTES
 |---------------------------
*/
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

Route::post('/cart/clear', [CartController::class, 'clear']);


/**
 |---------------------------
 | DASHBOARD (OPTIONAL)
 |---------------------------
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/**
 |---------------------------
 | CHECKOUT
 |---------------------------
*/

Route::get('/checkout', [CartController::class, 'checkout']);


/**
 |---------------------------
 | PROFILE
 |---------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
