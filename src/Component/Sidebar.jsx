import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-xl font-bold">Admin</div>

      <nav className="space-y-1 px-4">
        {[
          ["Dashboard", "/admin/dashboard"],
          ["Announcements", "/admin/announcements"],
          ["Memberships", "/admin/memberships"],
          ["Applications", "/admin/applications"],
          ["Users", "/admin/users"],
          ["Reports", "/admin/reports"],
        

        ].map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 px-6 text-sm text-gray-500">
        Admin User <br />
        admin@example.com
      </div>
    </aside>
  );
};

export default Sidebar;
