import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    active: 1
  });

  const submit = () => {
    router.post("/admin/products", form);
  };

  return (
    <div className="container mt-5">

      <h2>Create New Product</h2>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Stock</label>
        <input
          type="number"
          className="form-control"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Active</label>
        <select
          className="form-control"
          value={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.value })}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={submit}
      >
        Save Product
      </button>

    </div>
  );
}
