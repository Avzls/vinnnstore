import React, { useState, useCallback, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

// ===============================
// SIDEBAR COMPONENT
// ===============================
const Sidebar = () => {
  const { url } = usePage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeSidebar = useCallback(() => setIsMobileOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) closeSidebar();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, link: "/admin" },
    { name: "Management User", icon: <FiUsers />, link: "/admin/users" },
    { name: "Products", icon: <FiShoppingBag />, link: "/admin/products" },
    { name: "Report", icon: <FiBarChart2 />, link: "/admin/report" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[9999] p-2 bg-white shadow rounded"
        onClick={() => setIsMobileOpen(true)}
      >
        <FiMenu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg transition-transform duration-300 z-[9998] 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Close button mobile */}
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={closeSidebar}
        >
          <FiX size={20} />
        </button>

        <div className="p-6 font-bold text-xl">VINNN</div>

        {/* Menu List */}
        <nav className="space-y-1 px-4">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`flex items-center text-gray-800 gap-3 p-3 rounded-md transition no-underline 

              ${
                url.startsWith(item.link)
                  ? "bg-gray-200 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          {/* Logout */}
          <Link
            href="/logout"
            method="post"
            as="button"
            className="flex items-center gap-3 p-3 text-red-600 no-underline hover:bg-red-50 rounded-md transition w-full text-left"
            onClick={closeSidebar}
          >
            <FiLogOut />
            Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

// ===============================
// LAYOUT COMPONENT
// ===============================
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-6">{children}</main>
    </div>
  );
}
