import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Component/utils/ProtectedRoute";

import AdminDashboard from "./Component/Pages/Admin/AdminDashBoard";
// import SuperDashboard from "./Component/Pages/SuperAdmin/SuperDashboard";
import AdminLayout from "./Component/Layout/AdminLayout";
import AdminAnnouncements from "./Component/Pages/Admin/AdminAnnoucement";
import Memberships from "./Component/Pages/Admin/Membership";
import AdminApplications from "./Component/Pages/Admin/AdminApplications";
import UserAdmin from "./Component/Pages/Admin/UserAdmin";
import AdminReport from "./Component/Pages/Admin/AdminReport";
import AuthPage from "./Component/auth/AuthPage";
import UserLayout from "./Component/Layout/UserLayout";
import UserDashboard from "./Component/Pages/Users/UserDashboard";
import UserAnnouncement from "./Component/Pages/Users/UserAnnoucement";
import UserMemberships from "./Component/Pages/Users/UserMemberShip";
import UserProfile from "./Component/Pages/Users/UserProfile";
import SuperAdmin from "./Component/Layout/SuperAdmin";
import SuperDashboard from "./Component/Pages/SuperAdmin/SuperDashboard";
import SuperAnnouncements from "./Component/Pages/SuperAdmin/SuperAnnouncement";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<AuthPage />} />
{/* 
        <Route path="/user" element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        } /> */}
        <Route
  path="/user"
  element={<UserLayout />}>
  <Route path="/user/dashboard" element={<UserDashboard />} />
  <Route path="/user/announcements" element={<UserAnnouncement/>} />
  <Route path="/user/memberships" element={<UserMemberships />} />
  <Route path="/user/Profile" element={<UserProfile />} />
  {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
</Route>


     <Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="/admin/announcements" element={<AdminAnnouncements />} />
  <Route path="/admin/memberships" element={<Memberships/>} />
  <Route path="/admin/applications" element={<AdminApplications/>} />
  <Route path="/admin/users" element={<UserAdmin/>} />
  <Route path="/admin/reports" element={<AdminReport/>} />
</Route>

      <Route path="/super" element={<SuperAdmin />}>
          <Route path="/super/dashboard" element={<SuperDashboard />} />
          <Route path="/super/announcements" element={<SuperAnnouncements />} />
          {/* <Route path="/super/memberships" element={<Memberships />} />
          <Route path="/super/applications" element={<Applications />} />
          <Route path="/super/manage-admins" element={<ManageAdmins />} />
          <Route path="/super/all-members" element={<AllMembers />} />
          <Route path="/super/reports" element={<Reports />} />
          <Route path="/super/settings" element={<Settings />} /> */}
        </Route>
        
      </Routes>
 
  );
}

export default App;
