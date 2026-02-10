import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/SuperAdmin/SideBar";
import Header from "../Pages/SuperAdmin/Header";


export default function SuperAdmin() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-400 mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
