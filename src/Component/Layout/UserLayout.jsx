import { Outlet } from "react-router-dom";
import UserSidebar from "../Pages/Users/UserSidebar";
import UserTop from "../Pages/Users/UserTop";


const UserLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <UserTop />

        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
