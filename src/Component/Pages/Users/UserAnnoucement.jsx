import React, { useState, useMemo } from 'react';
import { Eye, Calendar, ArrowRight, Sparkles, Megaphone, Search, X, ChevronDown, ChevronUp } from 'lucide-react';

const UserAnnouncement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const data = [
    {
      id: 1,
      title: "Welcome to 2026!",
      date: "Jan 1, 2026",
      views: 245,
      category: "Update",
      description: "We are excited to announce new features and improvements coming this year, including the new AI-driven dashboard and real-time collaboration tools.",
      content: "Full details: Our 2026 roadmap includes a complete UI overhaul, faster API response times, and a dedicated mobile app for both iOS and Android. Stay tuned for our February town hall.",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      id: 2,
      title: "New Membership Benefits",
      date: "Jan 15, 2026",
      views: 890,
      category: "Premium",
      description: "We have added new exclusive benefits for our premium members including lounge access and priority support.",
      content: "Premium members now enjoy: 1. Global Lounge access, 2. 24/7 Priority Concierge, 3. Early access to beta features, and 4. Monthly networking dinners.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Member Meetup",
      date: "Feb 1, 2026",
      views: 156,
      category: "Event",
      description: "Join us for our quarterly member meetup on February 20th in the main hall.",
      content: "Agenda: 6:00 PM - Networking Drinks, 7:00 PM - Keynote Speaker, 8:00 PM - Dinner. Please RSVP by Feb 10th to secure your spot.",
      gradient: "from-emerald-500 to-teal-600"
    },
  ];

  // Logic: Functional Filtering & Searching
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || item.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header & Functional Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            Pulse <Megaphone className="text-blue-600 animate-bounce" size={28} />
          </h2>
          <p className="text-slate-500 font-medium mt-1">Found {filteredData.length} updates for you</p>
        </div>

        <div className="relative group w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search updates..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <X 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600" 
              size={16} 
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>

      {/* Segmented Control (Tabs) */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
        {['All', 'Update', 'Premium', 'Event'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* Dynamic List */}
      <div className="grid gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div 
              key={item.id}
              className={`group bg-white rounded-3xl border transition-all duration-300 ${
                expandedId === item.id ? "ring-2 ring-blue-500 border-transparent shadow-xl" : "border-slate-100 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-6">
                {/* Date Icon */}
                <div className={`hidden md:flex flex-col items-center justify-center w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                  <span className="text-[10px] font-bold uppercase opacity-80">{item.date.split(' ')[0]}</span>
                  <span className="text-xl font-black">{item.date.split(' ')[1].replace(',', '')}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold tracking-tighter uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                      {item.category}
                    </span>
                    {item.views > 500 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600">
                        <Sparkles size={12} fill="currentColor" /> HOT
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    <Eye size={14} />
                    <span className="text-xs font-bold">{item.views}</span>
                  </div>
                  <button 
                    onClick={() => toggleExpand(item.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                      expandedId === item.id ? "bg-blue-600 text-white" : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {expandedId === item.id ? 'Close' : 'View'}
                    {expandedId === item.id ? <ChevronUp size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable Content Area */}
              {expandedId === item.id && (
                <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-4 text-slate-700 leading-relaxed italic">
                      {item.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No updates match your search.</p>
            <button onClick={() => {setSearchQuery(""); setActiveTab("All")}} className="mt-2 text-blue-600 font-bold hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncement;