import React, { useState } from "react";
import { router } from "@inertiajs/core";
import { formatRupiah } from "../../../Helpers/formatRupiah";

export default function Edit({ product }) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    active: product.active,
  });
  const [showToast, setShowToast] = useState(false);

  const submit = () => {
    router.put(`/admin/products/${product.id}`, form, {
      onSuccess: () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    });
  };

  return (
    <div className="container py-4">

      {showToast && (
        <div className="alert alert-success position-fixed text-center"
             style={{ top: 20, right: 20, minWidth: 200, zIndex: 9999 }}>
          ✓ Product berhasil diupdate!
        </div>
      )}

      <h1 className="fw-bold mb-4">Edit Product</h1>

      <input
        className="form-control mb-3"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="Product Name"
      />

      <textarea
        className="form-control mb-3"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />

      <input
        className="form-control mb-3"
        type="number"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
      />

      <input
        className="form-control mb-3"
        type="number"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })}
        placeholder="Stock"
      />

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={form.active}
          onChange={e => setForm({ ...form, active: e.target.checked })}
        />
        <label className="form-check-label">Active</label>
      </div>

      <button className="btn btn-success" onClick={submit}>Update</button>
      <button className="btn btn-secondary ms-2" onClick={() => router.get("/admin/products")}>Back</button>

    </div>
  );
}
