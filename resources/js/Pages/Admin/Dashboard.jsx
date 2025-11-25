import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";

export default function Dashboard({ totalUsers, totalProducts }) {
return ( <AdminLayout> <h1 className="text-2xl font-bold text-gray-800 mb-6">
Dashboard </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* CARD TOTAL USERS */}
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-gray-600 text-sm font-medium">
        Total Users
      </h2>
      <p className="text-3xl font-bold text-gray-900">
        {totalUsers}
      </p>
    </div>

    {/* CARD TOTAL PRODUCTS */}
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-gray-600 text-sm font-medium">
        Total Products
      </h2>
      <p className="text-3xl font-bold text-gray-900">
        {totalProducts}
      </p>
    </div>

  </div>
</AdminLayout>

);
}
