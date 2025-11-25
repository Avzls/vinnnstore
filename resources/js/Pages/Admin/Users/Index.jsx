import React, { useState, useMemo } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";


export default function UserIndex() {
const { users } = usePage().props;

// Search & Pagination State
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const perPage = 5; // jumlah data per halaman

// Filter by search
const filtered = useMemo(() => {
return users.filter(
(u) =>
u.name.toLowerCase().includes(search.toLowerCase()) ||
u.email.toLowerCase().includes(search.toLowerCase())
);
}, [users, search]);

// Pagination
const totalPages = Math.ceil(filtered.length / perPage);
const paginatedData = filtered.slice(
(currentPage - 1) * perPage,
currentPage * perPage
);

const handleDelete = (id) => {
if (confirm("Yakin hapus user ini?")) {
router.delete(`/admin/users/${id}`);
}
};

return ( <AdminLayout> <h1 className="text-3xl font-bold mb-6">Management User</h1>


  {/* Search */}
  <div className="mb-4">
    <input
      type="text"
      placeholder="Cari"
      className="border p-2 rounded w-full"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
    <table className="w-full border-collapse table-auto w-full border-collapse text-center">
      <thead>
        <tr className="bg-gray-100 border px-4 py-2 font-semibold bg-gray-50 text-center whitespace-nowrap">
          <th className="border px-4 py-2 text-center whitespace-nowrap">No</th>
          <th className="border px-4 py-2 text-center whitespace-nowrap">Name</th>
          <th className="border px-4 py-2 text-center whitespace-nowrap">Email</th>
          <th className="border px-4 py-2 text-center whitespace-nowrap">Role</th>
          <th className="border px-4 py-2 text-center whitespace-nowrap">Action</th>
        </tr>
      </thead>

      <tbody>
        {paginatedData.map((u, index) => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2 text-center whitespace-nowrap">
              {(currentPage - 1) * perPage + index + 1}
            </td>
            <td className="border px-4 py-2 text-center whitespace-nowrap">{u.name}</td>
            <td className="border px-4 py-2 text-center whitespace-nowrap">{u.email}</td>
            <td className="border px-4 py-2 text-center whitespace-nowrap">{u.role ?? "User"}</td>
            <td className="border px-4 py-2 text-center whitespace-nowrap">
              <div className="flex gap-2 justify-center">
{/* EDIT BUTTON */}
<Link
  href={`/admin/users/${u.id}/edit`}
  className="flex items-center gap-2 border border-blue-400 text-blue-500 px-3 py-1 no-underline rounded-lg text-xs hover:bg-blue-50 transition"
>
  <FiEdit2 size={14} />
  Edit
</Link>

{/* DELETE BUTTON */}
<button
  onClick={() => handleDelete(u.id)}
  className="flex items-center gap-2 border border-red-400 text-red-500 px-3 py-1 rounded-lg text-xs hover:bg-red-50 transition"
>
  <FiTrash2 size={14} />
  Delete
</button>
              </div>
            </td>
          </tr>
        ))}

        {paginatedData.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-4 text-gray-500">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="flex justify-center gap-2 mt-4">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded border 
            ${currentPage === i + 1 ? "bg-gray-800 text-white" : ""}
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
</AdminLayout>

);
}
