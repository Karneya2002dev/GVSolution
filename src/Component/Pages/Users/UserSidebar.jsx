import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Member</h2>

        <nav className="space-y-3">
          <NavLink
            to="/user/dashboard"
            className="block p-2 rounded hover:bg-blue-100"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/user/announcements"
            className="block p-2 rounded hover:bg-blue-100"
          >
            Announcements
          </NavLink>

          <NavLink
            to="/user/memberships"
            className="block p-2 rounded hover:bg-blue-100"
          >
            Memberships
          </NavLink>

          <NavLink
            to="/user/profile"
            className="block p-2 rounded hover:bg-blue-100"
          >
            My Profile
          </NavLink>
        </nav>
      </div>

      <button className="text-red-500 text-left mt-10">
        Logout
      </button>
    </div>
  );
};

export default UserSidebar;
