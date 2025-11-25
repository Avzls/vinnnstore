import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
  const { url } = usePage();

  const menu = [
    { name: "Dashboard", link: "/admin", icon: "🏠" },
    { name: "Products", link: "/admin/products", icon: "📦" },
    { name: "Orders", link: "/admin/orders", icon: "🧾" },
    { name: "Users", link: "/admin/users", icon: "👤" },
  ];

  return (
    <div
      style={{
        width: 240,
        height: "100vh",
        background: "#111827",
        color: "#fff",
        padding: 20,
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h3 style={{ fontWeight: 700, marginBottom: 30 }}>🔥 Admin Panel</h3>

      {menu.map((m, i) => (
        <Link
          href={m.link}
          key={i}
          style={{
            display: "block",
            padding: "12px 0",
            fontWeight: url.startsWith(m.link) ? 700 : 400,
            color: url.startsWith(m.link) ? "#fff" : "#9ca3af",
          }}
        >
          {m.icon} &nbsp; {m.name}
        </Link>
      ))}
    </div>
  );
}
