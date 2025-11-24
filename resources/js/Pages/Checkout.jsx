import React from 'react';

export default function Checkout({ cart, total }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Checkout</h1>

      <ul>
        {Object.values(cart).map((i) => (
          <li key={i.id}>
            {i.name} — {i.quantity} x Rp {i.price}
          </li>
        ))}
      </ul>

      <h3>Total: Rp {total}</h3>

      <button>Confirm Payment</button>
    </div>
  );
}
