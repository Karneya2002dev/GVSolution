import React, { useState, useMemo } from "react";
import { 
  Check, X, Clock, CheckSquare, Search, 
  Filter, Users, ShieldCheck, 
  MoreHorizontal, Mail, Eye, Info
} from "lucide-react";

export default function MembershipCommandCenter() {
  const [pending, setPending] = useState([
    { id: 1, name: "Bob Wilson", email: "bob@example.com", plan: "Basic", applied: "2026-02-01", initials: "BW", color: "bg-blue-500", note: "Interested in networking events." },
    { id: 2, name: "Alice Brown", email: "alice@example.com", plan: "Premium", applied: "2026-02-03", initials: "AB", color: "bg-purple-500", note: "Previous member at the London branch." },
    { id: 3, name: "Charlie Davis", email: "charlie@web.com", plan: "Elite", applied: "2026-02-05", initials: "CD", color: "bg-amber-500", note: "Corporate sponsor referral." },
  ]);

  const [processed, setProcessed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // FOR BULK ACTIONS
  const [viewingApp, setViewingApp] = useState(null); // FOR DETAILS MODAL

  // 1. FILTER & SEARCH LOGIC
  const filteredPending = useMemo(() => {
    return pending.filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pending]);

  // 2. ACTION LOGIC (Single & Bulk)
  const handleAction = (ids, status) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const itemsToProcess = pending.filter(app => idArray.includes(app.id));
    
    setPending(pending.filter(app => !idArray.includes(app.id)));
    setProcessed([
      ...itemsToProcess.map(app => ({ ...app, status, processedAt: new Date().toLocaleDateString() })),
      ...processed
    ]);
    setSelectedIds([]); // Reset selection
    setViewingApp(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 text-slate-900 font-sans relative">
      
      {/* 3. BULK ACTION BAR (Floating) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10">
          <span className="text-sm font-bold">{selectedIds.length} items selected</span>
          <div className="h-6 w-px bg-slate-700" />
          <div className="flex gap-2">
            <button onClick={() => handleAction(selectedIds, "Rejected")} className="p-2 hover:bg-red-500 rounded-xl transition-colors"><X size={20}/></button>
            <button onClick={() => handleAction(selectedIds, "Approved")} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors">
              <Check size={18}/> Approve All
            </button>
          </div>
        </div>
      )}

      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Queue Management</h1>
          <p className="text-slate-500 font-medium font-mono text-sm tracking-tighter">V2.4.0 • SYSTEM ACTIVE</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search applicants..." 
            className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-64 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* PENDING COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black flex items-center gap-3">
              Live Queue 
              <span className="px-2 py-0.5 bg-blue-600 text-white rounded-lg text-xs animate-pulse">
                {pending.length} NEW
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {filteredPending.map((app) => (
              <div 
                key={app.id} 
                className={`group bg-white border p-5 rounded-[2rem] transition-all flex items-center gap-4 ${
                  selectedIds.includes(app.id) ? "border-blue-500 ring-4 ring-blue-500/5 shadow-lg" : "border-slate-100 hover:shadow-md"
                }`}
              >
                {/* Checkbox */}
                <button 
                  onClick={() => toggleSelect(app.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    selectedIds.includes(app.id) ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200"
                  }`}
                >
                  {selectedIds.includes(app.id) && <Check size={14} strokeWidth={4} />}
                </button>

                <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${app.color} text-white flex items-center justify-center text-lg font-black`}>
                      {app.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{app.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {app.plan}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setViewingApp(app)}
                        className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleAction(app.id, "Approved")}
                        className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all"
                      >
                        <Check size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ACTIVITY LOG (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={20} /> Decision Log
            </h3>
            <div className="space-y-6">
              {processed.length === 0 ? (
                <div className="text-center py-10">
                  <Mail className="mx-auto text-slate-200 mb-2" size={32}/>
                  <p className="text-sm text-slate-400 italic">Waiting for processing...</p>
                </div>
              ) : (
                processed.map((app) => (
                  <div key={app.id} className="flex items-start gap-4 animate-in slide-in-from-right-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${app.status === 'Approved' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{app.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.status} • {app.processedAt}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. DETAILS SLIDE-OVER (Innovative Detail View) */}
      {viewingApp && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewingApp(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-10 animate-in slide-in-from-right duration-300">
             <button onClick={() => setViewingApp(null)} className="absolute top-6 left-6 p-2 hover:bg-slate-100 rounded-full">
               <X size={24}/>
             </button>
             
             <div className="mt-16 space-y-8">
                <div className={`${viewingApp.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl text-white font-black shadow-2xl`}>
                  {viewingApp.initials}
                </div>
                <div>
                  <h2 className="text-3xl font-black">{viewingApp.name}</h2>
                  <p className="text-slate-500 font-medium">{viewingApp.email}</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Info size={18}/> <span className="text-xs font-black uppercase tracking-widest">Applicant Note</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{viewingApp.note}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Plan Requested</p>
                    <p className="font-bold">{viewingApp.plan}</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Applied On</p>
                    <p className="font-bold">{viewingApp.applied}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-10">
                  <button 
                    onClick={() => handleAction(viewingApp.id, "Rejected")}
                    className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-black text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleAction(viewingApp.id, "Approved")}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 shadow-xl transition-all"
                  >
                    Approve
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}