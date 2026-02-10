import React from 'react';
import { Trophy, Bell, Zap, Calendar, ArrowUpRight } from 'lucide-react';

const UserDashboard = () => {
  const user = { name: "John", id: "MEM-2024-001", status: "Active", plan: "Basic" };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* Dynamic Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Hey {user.name} <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-gray-500 font-medium">Here's what's happening with your membership today.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-all">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 border-2 border-white shadow-md" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Status & Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Futuristic Membership Card */}
          <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Zap size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Current Plan</p>
                  <h2 className="text-4xl font-bold mt-1">{user.plan}</h2>
                </div>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                  {user.status}
                </span>
              </div>

              <div className="mt-12">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Membership Progress</span>
                  <span className="text-white font-medium">65% Year Complete</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[65%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Renewal Date</p>
                    <p className="text-sm font-semibold">Jan 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy size={18} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Member ID</p>
                    <p className="text-sm font-semibold">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New: Quick Action Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Renew Plan', 'Perks', 'Invoices', 'Support'].map((action) => (
              <button key={action} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all group text-left">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-3">
                  <ArrowUpRight size={20} />
                </div>
                <span className="font-semibold text-gray-700">{action}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Feed/Announcements */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Feed</h3>
              <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
            </div>

            <div className="space-y-6">
              {[
                { title: "2024 Strategy Reveal", date: "Jan 1", color: "bg-purple-500" },
                { title: "Premium Perks Added", date: "Jan 15", color: "bg-blue-500" },
                { title: "Community Meetup", date: "Feb 2", color: "bg-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={`w-1 h-12 rounded-full ${item.color} group-hover:scale-y-110 transition-transform`} />
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-tight font-medium">{item.date} • Update</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
              Explore Benefits
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserDashboard;