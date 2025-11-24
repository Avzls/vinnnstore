import React, { useState } from "react";
import { router } from "@inertiajs/core";
import { formatRupiah } from "../../../Helpers/formatRupiah";

export default function Index({ products }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDelete = (id) => {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    router.delete(`/admin/products/${id}`, {
      onSuccess: () => {
        setToastMessage("✓ Product berhasil dihapus!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    });
  };

  return (
    <div className="container py-4">

      {showToast && (
        <div 
          className="alert alert-success position-fixed text-center"
          style={{ top: 20, right: 20, minWidth: 200, zIndex: 9999 }}
        >
          {toastMessage}
        </div>
      )}

      <h1 className="fw-bold mb-4">Products List</h1>

      <button
className="btn btn-primary mb-3"
onClick={() => router.get("/admin/products/create")}
      >
        + New Product
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>Rp {formatRupiah(p.price)}</td>
              <td>{p.stock}</td>
              <td>{p.active ? "Yes" : "No"}</td>
              <td>
                <button 
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => router.get(`/admin/products/${p.id}/edit`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
