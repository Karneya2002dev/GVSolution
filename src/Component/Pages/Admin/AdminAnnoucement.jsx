import React, { useState, useMemo, useEffect } from "react";
import { 
  Plus, Eye, Pencil, Trash2, X, Search, 
  BarChart3, TrendingUp, CheckCircle2, Sparkles, 
  Smartphone, Monitor, Send, Calendar, Clock,
  MoreVertical, Bell, Globe, Trash
} from "lucide-react";

const AdminAnnouncements = () => {
  /* ------------------ STATE ------------------ */
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Welcome to 2026!", description: "Experience our new neural interface and faster data processing speeds.", date: "2026-01-01", views: 2450, category: "System", priority: "High" },
    { id: 2, title: "Member Perks: Gold Tier", description: "Gold members now receive double credits on all community interactions.", date: "2026-01-15", views: 1890, category: "Premium", priority: "Medium" },
    { id: 3, title: "Global Dev Meetup", description: "Connect with the team in San Francisco or via VR link.", date: "2026-02-01", views: 956, category: "Event", priority: "Low" },
  ]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(""); // "create" | "edit"
  const [previewDevice, setPreviewDevice] = useState("mobile");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  /* ------------------ COMPUTED ------------------ */
  const stats = useMemo(() => {
    const total = announcements.reduce((acc, curr) => acc + curr.views, 0);
    const avg = Math.round(total / (announcements.length || 1));
    return { total, avg };
  }, [announcements]);

  const filteredData = useMemo(() => {
    return announcements.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                            a.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filterType === "All" || a.category === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [announcements, search, filterType]);

  /* ------------------ HANDLERS ------------------ */
  const openModal = (item, m) => {
    setSelected(item ? { ...item } : { 
      title: "", 
      description: "", 
      date: new Date().toISOString().split('T')[0], 
      category: "System", 
      priority: "Medium" 
    });
    setMode(m);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => { setMode(""); setSelected(null); }, 300);
  };

  const handleSave = () => {
    if (!selected.title || !selected.description) return alert("Fields cannot be empty");

    if (mode === "edit") {
      setAnnouncements(prev => prev.map(a => a.id === selected.id ? selected : a));
    } else {
      const newEntry = { ...selected, id: Date.now(), views: 0 };
      setAnnouncements(prev => [newEntry, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Archiving this broadcast will remove it from member feeds. Proceed?")) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const simulateAiRewrite = () => {
    if (!selected.description) return;
    setIsAiProcessing(true);
    // Mimicking AI Latency
    setTimeout(() => {
      const prefixes = ["Correction:", "Update:", "Announcement:"];
      const rewrite = `${prefixes[Math.floor(Math.random()*prefixes.length)]} We are excited to announce that ${selected.description.charAt(0).toLowerCase() + selected.description.slice(1)} This update is part of our 2026 commitment to excellence.`;
      setSelected(prev => ({ ...prev, description: rewrite }));
      setIsAiProcessing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER & ANALYTICS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full tracking-wider">Communication Hub</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Clock size={10}/> Last sync: Just now
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Broadcast Center<span className="text-blue-600">.</span></h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm pr-6">
               <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                 <Globe size={20} />
               </div>
               <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase">Avg. Reach</p>
                 <p className="text-sm font-bold">{stats.avg.toLocaleString()} / post</p>
               </div>
            </div>
            <button 
              onClick={() => openModal(null, "create")}
              className="px-8 py-4 bg-slate-900 text-white rounded-3xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Plus size={20} /> New Broadcast
            </button>
          </div>
        </div>

        {/* SEARCH & DYNAMIC FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search title or content..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["All", "System", "Event", "Premium"].map(f => (
              <button 
                key={f} 
                onClick={() => setFilterType(f)}
                className={`px-6 py-2 text-xs font-black rounded-xl border transition-all whitespace-nowrap ${
                  filterType === f 
                  ? "bg-slate-900 text-white border-slate-900" 
                  : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* BROADCAST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? filteredData.map((item) => (
            <div key={item.id} className="group bg-white border border-slate-100 p-6 rounded-4xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-default relative overflow-hidden flex flex-col h-full">
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-10 group-hover:scale-150 transition-transform ${item.category === 'System' ? 'bg-blue-500' : 'bg-indigo-500'}`} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  item.category === 'System' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {item.category}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openModal(item, "edit")} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="Edit"><Pencil size={16}/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16}/></button>
                </div>
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl font-black mb-2 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">{item.description}</p>
              </div>
              
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-300 uppercase">Impact</span>
                   <div className="flex items-center gap-2">
                     <TrendingUp size={14} className="text-emerald-500" />
                     <span className="text-sm font-black text-slate-700">{item.views.toLocaleString()}</span>
                   </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-300 uppercase">Date</span>
                  <p className="text-xs font-bold text-slate-500">{item.date}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="inline-block p-6 bg-slate-100 rounded-full text-slate-300"><Search size={40}/></div>
              <p className="text-slate-400 font-bold uppercase tracking-widest">No matching broadcasts found</p>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER COMPONENT */}
      {mode && (
        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isAnimating ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-transparent pointer-events-none'}`}>
          <div className={`bg-white w-full max-w-5xl h-full shadow-2xl transition-transform duration-500 transform flex flex-col md:flex-row ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Form Side */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto border-r border-slate-50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black">{mode === "create" ? "New" : "Edit"} Broadcast<span className="text-blue-600">.</span></h3>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X/></button>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Title</label>
                  <input 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-lg font-bold focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                    value={selected.title} 
                    onChange={e => setSelected({...selected, title: e.target.value})} 
                    placeholder="Enter headline..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Content</label>
                    <button 
                      onClick={simulateAiRewrite}
                      disabled={isAiProcessing}
                      className={`text-[10px] font-black uppercase flex items-center gap-1 transition-all ${isAiProcessing ? 'text-slate-300 animate-pulse' : 'text-blue-600 hover:underline'}`}
                    >
                      <Sparkles size={10}/> {isAiProcessing ? 'Thinking...' : 'AI Professional Rewrite'}
                    </button>
                  </div>
                  <textarea 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 min-h-45 text-slate-600 font-medium focus:ring-4 focus:ring-blue-500/10 transition-all outline-none leading-relaxed" 
                    value={selected.description} 
                    onChange={e => setSelected({...selected, description: e.target.value})} 
                    placeholder="Write your announcement content here..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 font-bold text-sm outline-none"
                      value={selected.category}
                      onChange={e => setSelected({...selected, category: e.target.value})}
                    >
                      <option value="System">System</option>
                      <option value="Event">Event</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                    <input type="date" className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 font-bold text-sm outline-none" value={selected.date} onChange={e => setSelected({...selected, date: e.target.value})}/>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                 <button onClick={closeModal} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                 <button 
                   onClick={handleSave}
                   className="flex-2 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                 >
                    <Send size={18}/> {mode === "create" ? "Deploy Now" : "Update Broadcast"}
                 </button>
              </div>
            </div>

            {/* PREVIEW PANEL */}
            <div className="hidden lg:flex flex-1 bg-slate-50 p-12 flex-col items-center justify-center relative">
               <div className="absolute top-10 right-10 flex gap-2">
                  <button onClick={() => setPreviewDevice("mobile")} className={`p-2 rounded-lg transition-all ${previewDevice === 'mobile' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><Smartphone size={20}/></button>
                  <button onClick={() => setPreviewDevice("desktop")} className={`p-2 rounded-lg transition-all ${previewDevice === 'desktop' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><Monitor size={20}/></button>
               </div>

               <div className="text-center mb-10">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Member Preview</p>
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> Server: Production-2026
                 </div>
               </div>

               {/* VIRTUAL HARDWARE */}
               <div className={`${previewDevice === 'mobile' ? 'w-75 h-150 rounded-[3.5rem]' : 'w-125 h-80 rounded-2xl'} bg-white border-10 border-slate-900 shadow-2xl p-6 transition-all duration-700 overflow-hidden relative`}>
                  <div className="w-24 h-1.5 bg-slate-900 mx-auto rounded-full mb-8 opacity-20" />
                  <div className="space-y-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg ${selected.category === 'System' ? 'bg-blue-600 shadow-blue-100' : 'bg-indigo-600 shadow-indigo-100'}`}>B</div>
                     <h4 className="text-2xl font-black leading-tight text-slate-800">{selected.title || "Headline Here"}</h4>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{selected.date || "Scheduled Date"}</p>
                     <div className="w-full h-px bg-slate-100" />
                     <p className="text-sm text-slate-600 leading-relaxed max-h-50 overflow-hidden">
                       {selected.description || "Start typing in the editor to see your live broadcast preview here..."}
                     </p>
                     <button className={`w-full py-4 rounded-xl text-xs font-black mt-4 text-white transition-colors ${selected.category === 'System' ? 'bg-blue-600' : 'bg-indigo-600'}`}>
                       View Full Article
                     </button>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-slate-300">
                    <Bell size={10}/> NOTIFICATION_MODE: ACTIVE
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;