import React from "react";
import { router } from "@inertiajs/core";
import { formatRupiah } from "../../Helpers/formatRupiah";

export default function Cart({ cart }) {
  const items = Object.values(cart);
  const total = items.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <div className="container py-4">
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-muted">Cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="card p-3 mb-2">
              <strong>{item.name}</strong>
              <div className="text-muted">x{item.quantity} — Rp {formatRupiah(item.price)}</div>
            </div>
          ))}

          <h4 className="mt-4">Total: Rp {formatRupiah(total)}</h4>

          <button 
            className="btn btn-danger mt-3"
            onClick={() => router.post("/cart/clear")}
          >
            Clear Cart
          </button>

          <button 
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => router.get("/")}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
