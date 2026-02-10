import React, { useState, useMemo, useRef } from 'react';
import { Mail, Phone, MapPin, Calendar, ShieldCheck, Camera, Edit3, Save, Zap, Activity, CheckCircle2, AlertCircle, CreditCard, User } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null); // Reference to hidden input

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 89",
    city: "New York",
    bio: "Passionate community member and tech enthusiast.",
    id: "MEM-2026-001",
    plan: "Basic Plan",
    joined: "2024-01-15",
    ends: "2025-01-15",
    avatar: "https://i.pravatar.cc/150?u=john" // Default fallback
  });

  // --- NEW: LOCAL IMAGE UPLOAD LOGIC ---
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file); // Converts local file to a string
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Completion Logic (Unchanged)
  const completionStats = useMemo(() => {
    const essentialFields = ['name', 'email', 'phone', 'city', 'bio'];
    const filled = essentialFields.filter(f => user?.[f]?.trim().length > 0);
    const score = Math.round((filled.length / essentialFields.length) * 100);
    return { score, missing: essentialFields.find(f => !user?.[f]) };
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* 1. IDENTITY HEADER */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar with Local Upload Trigger */}
          <div className="relative group cursor-pointer" onClick={triggerFileInput}>
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 transition-transform hover:scale-105">
              <div className="w-full h-full rounded-[2.3rem] bg-slate-900 overflow-hidden relative">
                <img 
                  src={user.avatar} 
                  alt="profile" 
                  className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </div>
            {/* Tooltip hint */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Upload Photo
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-4xl font-black tracking-tight">{user.name || "Guest"}</h2>
              {completionStats.score === 100 && (
                <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1">
                  <ShieldCheck size={12} /> VERIFIED
                </span>
              )}
            </div>
            <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">{user.id}</p>
          </div>

          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
              isEditing ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {isEditing ? <><Save size={18} /> Save Profile</> : <><Edit3 size={18} /> Edit Profile</>}
          </button>
        </div>
      </div>

      {/* ... Remaining components (Tabs, Settings Grid, Sidebar) stay exactly as they were ... */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Activity className="text-blue-500" size={20} /> Identity Settings
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", key: "name", icon: <Zap size={16}/> },
              { label: "Email Address", key: "email", icon: <Mail size={16}/> },
              { label: "Phone Number", key: "phone", icon: <Phone size={16}/> },
              { label: "City", key: "city", icon: <MapPin size={16}/> },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{field.label}</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    {field.icon}
                  </div>
                  <input 
                    disabled={!isEditing}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl transition-all outline-none ${
                      isEditing ? "bg-slate-50 border-2 border-blue-500/20 focus:border-blue-500 focus:bg-white" : "bg-transparent text-slate-700 font-bold"
                    }`}
                    value={user?.[field.key] || ""}
                    onChange={(e) => setUser({...user, [field.key]: e.target.value})}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Simple Sidebar Reprise */}
        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
           <div className="space-y-4">
             <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-tighter">
                <ShieldCheck size={16}/> Security Status
             </div>
             <p className="text-sm text-slate-500">Your profile is currently <span className="text-slate-900 font-bold">{completionStats.score}%</span> complete. {completionStats.score === 100 ? "You're a rockstar!" : "Complete it to gain trust."}</p>
           </div>
           <div className="w-full bg-slate-200 h-2 rounded-full mt-6 overflow-hidden">
             <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${completionStats.score}%` }} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;