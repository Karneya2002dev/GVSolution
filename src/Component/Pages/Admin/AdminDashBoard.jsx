import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid
} from "recharts";
import { 
  Users, UserCheck, Clock, TrendingUp, 
  ArrowUpRight, Bell, ChevronRight, MoreHorizontal 
} from "lucide-react";

// Professional Color Palette
const COLORS = {
  primary: "#0f172a",    // Slate 900
  secondary: "#3b82f6",  // Blue 600
  success: "#10b981",    // Emerald 500
  warning: "#f59e0b",    // Amber 500
  muted: "#cbd5e1",      // Slate 300
  bg: "#f8fafc"          // Slate 50
};

const membershipData = [
  { name: "Basic", value: 650 },
  { name: "Premium", value: 350 },
  { name: "Enterprise", value: 100 },
];

const applicationStatus = [
  { name: "Approved", value: 1050 },
  { name: "Rejected", value: 75 },
  { name: "Pending", value: 25 },
];

const PIE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.muted];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 text-slate-900">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 text-sm">Real-time membership metrics and application queue.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Sync</p>
          <p className="text-sm font-medium text-slate-700">Feb 08, 2026 • 01:04 AM</p>
        </div>
      </div>

      {/* ===== 1. KEY PERFORMANCE INDICATORS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProfessionalStatCard 
          title="Total Users" 
          value="1,245" 
          trend="+12%" 
          icon={<Users size={20} />} 
        />
        <ProfessionalStatCard 
          title="Active Members" 
          value="982" 
          trend="+5.4%" 
          icon={<UserCheck size={20} />} 
        />
        <ProfessionalStatCard 
          title="Pending Review" 
          value="37" 
          trend="Critical" 
          trendColor="text-amber-600"
          icon={<Clock size={20} />} 
        />
      </div>

      {/* ===== 2. DATA VISUALIZATION SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Membership Distribution */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Membership Distribution</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={20}/></button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={membershipData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Health */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Application Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationStatus}
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {applicationStatus.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            <LegendItem color={COLORS.primary} label="Approved" value="1,050" />
            <LegendItem color={COLORS.secondary} label="Rejected" value="75" />
            <LegendItem color={COLORS.muted} label="Pending" value="25" />
          </div>
        </div>
      </div>

      {/* ===== 3. OPERATIONAL LOGS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Queue */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Registration Queue</h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              View all <ChevronRight size={14}/>
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {["Bob Wilson", "Alice Brown", "Charlie Davis"].map((name, i) => (
              <div key={name} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">Tier: {i === 1 ? 'Premium' : 'Basic'}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-100">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Announcements */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Announcements</h3>
            <Bell size={18} className="text-slate-400" />
          </div>
          <div className="p-2">
            {[
              { t: "Quarterly Membership Review", d: "Administrative", time: "2h ago" },
              { t: "Policy Update: Enterprise SLA", d: "Legal", time: "1d ago" },
              { t: "New Member Meetup", d: "Community", time: "3d ago" },
            ].map((item, i) => (
              <div key={i} className="p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.t}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.d} Department</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ProfessionalStatCard = ({ title, value, trend, icon, trendColor = "text-emerald-600" }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-center mb-4">
      <div className="p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trendColor}`}>
        <TrendingUp size={12} /> {trend}
      </div>
    </div>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const LegendItem = ({ color, label, value }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-slate-600 font-medium">{label}</span>
    </div>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);

export default Dashboard;