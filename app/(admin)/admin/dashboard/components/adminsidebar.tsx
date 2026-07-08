import { Box, LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

const base = "/admin/dashboard";

const AdminItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Products", icon: Box, href: base + "/products" },
  { name: "Orders", icon: ShoppingCart, href: base + "/orders" },
  { name: "Customers", icon: Users, href: base + "/customers" },
];

const AdminSideBar = () => {
  return (
    <div>
      <div className="mb-8 mt-5 ml-4">
        <h1 className="font-bold text-lg md:text-xl">Admin Panel</h1>
        <p className="text-sm">Ecommerce Dashboard</p>
      </div>

      <nav>
        {AdminItems.map((curNav) => {
          const Icon = curNav.icon;
          return (
            <Link
              key={curNav.name}
              href={curNav.href}
              className="flex gap-2 p-3 rounded-md hover:bg-muted"
            >
              <Icon />
              {curNav.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
export default AdminSideBar;
