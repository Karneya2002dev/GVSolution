import {
  LayoutDashboard,
  Megaphone,
  CreditCard,
  FileText,
  Users,
  UserCog,
  BarChart,
  Settings,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";


export const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/super/dashboard" },
  { label: "Announcements", icon: Megaphone, path: "/super/announcements" },
  { label: "Memberships", icon: CreditCard, path: "/super/memberships" },
  { label: "Applications", icon: FileText, path: "/super/applications" },
  { label: "Manage Admins", icon: UserCog, path: "/super/manage-admins" },
  { label: "All Members", icon: Users, path: "/super/all-members" },
  { label: "Reports", icon: BarChart, path: "/super/reports" },
  { label: "Settings", icon: Settings, path: "/super/settings" },
];



export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      
      {/* LOGO */}
      <div className="p-5 font-bold text-lg">👑 Super Admin</div>

      {/* MENU */}
      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-blue-50"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <p className="text-sm font-medium">Super Admin</p>
        <p className="text-xs text-gray-500">superadmin@example.com</p>

        <button className="flex items-center gap-2 text-red-500 mt-3 text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}