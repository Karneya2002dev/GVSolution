import React, { useState, useMemo } from 'react';
import { Check, Zap, Crown, Rocket, ShieldCheck, Star, X, Info, Loader2 } from 'lucide-react';

const UserMemberships = () => {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [isUpgrading, setIsUpgrading] = useState(null); // Stores plan name being "purchased"
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    {
      name: "Basic",
      icon: <Star className="text-slate-400" />,
      price: billingCycle === 'yearly' ? 29.99 : 4.99,
      description: "Ideal for individuals starting their journey.",
      features: ["Access to basic features", "Monthly newsletter", "Community access"],
      specs: { storage: "5GB", support: "Email", api: "No", members: "1" },
      color: "blue"
    },
    {
      name: "Premium",
      icon: <Crown className="text-amber-500" />,
      price: billingCycle === 'yearly' ? 99.99 : 12.99,
      description: "For power users who want the full experience.",
      features: ["Advanced analytics", "Priority 24/7 support", "Exclusive workshops", "Ad-free experience"],
      specs: { storage: "50GB", support: "Priority", api: "Limited", members: "5" },
      color: "amber",
      recommended: true
    },
    {
      name: "Enterprise",
      icon: <Rocket className="text-indigo-500" />,
      price: billingCycle === 'yearly' ? 299.99 : 35.99,
      description: "Custom solutions for large organizations.",
      features: ["Unlimited API access", "Dedicated manager", "Custom onboarding", "SLA guarantees"],
      specs: { storage: "Unlimited", support: "Concierge", api: "Full", members: "Unlimited" },
      color: "indigo"
    }
  ];

  // Logic: Simulate a checkout process
  const handleUpgrade = (planName) => {
    setIsUpgrading(planName);
    // Simulate API Call
    setTimeout(() => {
      setCurrentPlan(planName);
      setIsUpgrading(null);
      alert(`Success! You are now a ${planName} member.`);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10 relative">
      
      {/* 1. HEADER & COMPARISON TRIGGER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Level Up Your Status</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-slate-200 rounded-full relative p-1 transition-colors hover:bg-slate-300"
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-slate-400'}`}>
              Yearly <span className="ml-1 bg-green-100 text-green-600 px-2 py-0.5 rounded-md text-[10px]">SAVE 20%</span>
            </span>
          </div>
          <button 
            onClick={() => setShowComparison(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            <Info size={14} /> Compare Technical Specs
          </button>
        </div>
      </div>

      {/* 2. THE PLAN GRID */}
      <div className="grid lg:grid-cols-3 gap-8 items-end">
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          const isLoading = isUpgrading === plan.name;
          
          return (
            <div key={plan.name} className={`relative transition-all duration-500 ${plan.recommended ? 'lg:scale-105 z-10' : ''}`}>
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-20 uppercase tracking-widest">
                  Best Value
                </div>
              )}

              <div className={`h-full bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-300 ${
                isCurrent ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-slate-100'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl">{plan.icon}</div>
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
                      <ShieldCheck size={12} /> ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-800">{plan.name}</h3>
                <div className="mt-4 mb-8">
                  <span className="text-5xl font-black text-slate-900">${plan.price}</span>
                  <span className="text-slate-400 font-bold">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Check size={16} className="text-green-500 shrink-0" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  disabled={isCurrent || !!isUpgrading}
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                    isCurrent 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-slate-900 text-white hover:bg-blue-600 active:scale-95 disabled:opacity-50'
                  }`}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : isCurrent ? 'Current Plan' : `Join ${plan.name}`}
                  {!isCurrent && !isLoading && <Zap size={16} fill="currentColor" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. TECHNICAL COMPARISON DRAWER */}
      {showComparison && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowComparison(false)} />
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black italic">SPECIFICATIONS</h3>
              <button onClick={() => setShowComparison(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X />
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 text-slate-400 uppercase text-[10px] tracking-widest">Feature</th>
                  {plans.map(p => <th key={p.name} className="py-4 font-bold text-sm">{p.name}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {Object.keys(plans[0].specs).map(specKey => (
                  <tr key={specKey} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-6 text-sm font-bold text-slate-500 capitalize">{specKey}</td>
                    {plans.map(p => (
                      <td key={p.name} className="py-6 text-sm font-medium text-slate-800">
                        {p.specs[specKey]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TRUST FOOTER (Persists) */}
      <div className="bg-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             {[1, 2, 3].map(i => <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />)}
          </div>
          <p className="text-sm font-bold text-slate-300">Trusted by <span className="text-white">2,400+</span> professionals</p>
        </div>
        <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
          Contact Enterprise Sales
        </button>
      </div>
    </div>
  );
};

export default UserMemberships;