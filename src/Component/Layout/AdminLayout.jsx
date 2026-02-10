import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <Header />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-400 mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
