import React, { useState, useMemo } from "react";
import { 
  Search, Eye, X, Check, Ban, Download, 
  MoreHorizontal, UserPlus, Filter, ShieldCheck, 
  Clock, AlertCircle, ChevronRight, Mail
} from "lucide-react";

/* ------------------ MOCK DATA ------------------ */
const usersData = [
  { id: "MEM-2024-0001", name: "Marcus Aurelius", email: "marcus@rome.gov", city: "Phoenix", plan: "Basic", status: "Pending", lastActive: "2m ago" },
  { id: "MEM-2024-0002", name: "Sonia Gupta", email: "sonia.g@tech.co", city: "San Diego", plan: "Basic", status: "Rejected", lastActive: "1d ago" },
  { id: "MEM-2024-0003", name: "Julian Casablancas", email: "julian@strokes.com", city: "Philadelphia", plan: "Enterprise", status: "Pending", lastActive: "5h ago" },
  { id: "MEM-2024-0004", name: "Sarah Connor", email: "s.connor@sky.net", city: "San Antonio", plan: "Premium", status: "Active", lastActive: "Active Now" },
  { id: "MEM-2024-0005", name: "Miles Morales", email: "miles@spidey.nyc", city: "Dallas", plan: "Enterprise", status: "Active", lastActive: "3h ago" },
];

export default function InnovativeUserManagement() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [inspectUser, setInspectUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  /* ------------------ INTELLIGENT FILTERING ------------------ */
  const processedUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || u.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [users, search, activeFilter]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkStatus = (status) => {
    setUsers(prev => prev.map(u => selectedIds.includes(u.id) ? { ...u, status } : u));
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Management</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Members<span className="text-blue-600">.</span></h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-all"><Download size={20}/></button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
              <UserPlus size={18} /> Add Member
            </button>
          </div>
        </div>

        {/* PULSE STATS (Quick Filters) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <QuickStat label="Total" count={users.length} active={activeFilter === "All"} onClick={() => setActiveFilter("All")} color="blue" />
          <QuickStat label="Pending" count={users.filter(u => u.status === "Pending").length} active={activeFilter === "Pending"} onClick={() => setActiveFilter("Pending")} color="amber" />
          <QuickStat label="Active" count={users.filter(u => u.status === "Active").length} active={activeFilter === "Active"} onClick={() => setActiveFilter("Active")} color="emerald" />
          <QuickStat label="Flagged" count={users.filter(u => u.status === "Rejected").length} active={activeFilter === "Rejected"} onClick={() => setActiveFilter("Rejected")} color="red" />
        </div>

        {/* TABLE HUB */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
          
          {/* SEARCH & BULK ACTIONS */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                placeholder="Search member identity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <span className="text-xs font-bold text-slate-400 mr-2">{selectedIds.length} selected</span>
                <button onClick={() => handleBulkStatus("Active")} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check size={18}/></button>
                <button onClick={() => handleBulkStatus("Rejected")} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Ban size={18}/></button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-4 w-10">
                    <input type="checkbox" className="rounded-md border-slate-200" onChange={(e) => setSelectedIds(e.target.checked ? users.map(u => u.id) : [])} />
                  </th>
                  <th className="px-4 py-4">Identity</th>
                  <th className="px-4 py-4">Subscription</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Last Pulse</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {processedUsers.map((u) => (
                  <tr key={u.id} className={`group hover:bg-slate-50/50 transition-colors ${selectedIds.includes(u.id) ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-8 py-5">
                      <input type="checkbox" checked={selectedIds.includes(u.id)} onChange={() => toggleSelect(u.id)} className="rounded-md border-slate-200 text-blue-600" />
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-500">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{u.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 font-mono">{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${u.plan === 'Enterprise' ? 'border-purple-200 text-purple-600 bg-purple-50' : 'border-slate-200 text-slate-500'}`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <StatusPill status={u.status} />
                    </td>
                    <td className="px-4 py-5 text-xs font-bold text-slate-400">{u.lastActive}</td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setInspectUser(u)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* INSPECTION SLIDE-OVER */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out border-l border-slate-100 ${inspectUser ? 'translate-x-0' : 'translate-x-full'}`}>
        {inspectUser && (
          <div className="h-full flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-2xl font-black">Inspect Member</h2>
              <button onClick={() => setInspectUser(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={20}/></button>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto space-y-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-4xl bg-blue-600 flex items-center justify-center text-3xl text-white font-black shadow-2xl shadow-blue-200">
                  {inspectUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{inspectUser.name}</h3>
                  <p className="text-slate-400 font-medium text-sm">{inspectUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoBox label="Member ID" value={inspectUser.id} icon={<ShieldCheck size={14}/>} />
                <InfoBox label="Status" value={inspectUser.status} icon={<Clock size={14}/>} />
                <InfoBox label="Subscription" value={inspectUser.plan} icon={<AlertCircle size={14}/>} />
                <InfoBox label="Location" value={inspectUser.city} icon={<Filter size={14}/>} />
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                  <Mail size={18}/> Contact Member
                </button>
                {inspectUser.status === "Pending" && (
                  <div className="flex gap-2">
                    <button className="flex-1 py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all">Approve</button>
                    <button className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all">Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {inspectUser && <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40" onClick={() => setInspectUser(null)} />}
    </div>
  );
}

/* ------------------ HELPERS ------------------ */

const QuickStat = ({ label, count, active, onClick, color }) => {
  const colors = {
    blue: "bg-blue-600 text-white",
    amber: "bg-amber-500 text-white",
    emerald: "bg-emerald-500 text-white",
    red: "bg-red-500 text-white",
  };
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-4xl text-left transition-all ${active ? colors[color] + " shadow-xl" : "bg-white border border-slate-100 hover:border-blue-300 shadow-sm"}`}
    >
      <p className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-white/70" : "text-slate-400"}`}>{label}</p>
      <p className="text-3xl font-black mt-1">{count}</p>
    </button>
  );
};

const StatusPill = ({ status }) => {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Rejected: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

const InfoBox = ({ label, value, icon }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-2 text-slate-400 mb-1">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-sm font-bold text-slate-800">{value}</p>
  </div>
);