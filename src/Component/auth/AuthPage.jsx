import { useState } from "react";
import { ShieldCheck, UserPlus, LogIn, UploadCloud, ChevronRight, CheckCircle2 } from "lucide-react";

const AuthPage = () => {
  const [tab, setTab] = useState("register");
  const [memberId, setMemberId] = useState("");

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-100 via-indigo-50 to-white flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white">
        
        {/* BRANDING SECTION */}
        <div className="lg:col-span-5 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <ShieldCheck size={28} />
              </div>
              <span className="text-2xl font-bold tracking-tight uppercase">Bharath Club</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Enterprise <br /> 
              <span className="text-indigo-400">Identity Management.</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-sm mb-10">
              Securely manage your corporate profile and access GVSolution's proprietary membership ecosystem.
            </p>

            <div className="space-y-6">
              <FeatureItem text="Government-Grade Verification" />
              <FeatureItem text="Instant Member Validation" />
              <FeatureItem text="Automated Security Audits" />
            </div>
          </div>
        </div>

        {/* AUTH SECTION */}
        <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {tab === "register" ? "Bharath Club Enrollment" : "Account Access"}
              </h2>
              <p className="text-slate-500">
                {tab === "register" 
                  ? "Initialize your secure profile today." 
                  : "Welcome back to the GVSolution dashboard."}
              </p>
            </div>

            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-8">
              <TabButton 
                active={tab === "login"} 
                onClick={() => setTab("login")} 
                icon={<LogIn size={18} />} 
                label="Sign In" 
              />
              <TabButton 
                active={tab === "register"} 
                onClick={() => setTab("register")} 
                icon={<UserPlus size={18} />} 
                label="Register" 
              />
            </div>

            {tab === "register" ? (
              <RegisterForm
                onSuccess={(id) => {
                  setMemberId(id);
                  setTab("login");
                }}
              />
            ) : (
              <LoginForm memberId={memberId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Register Form ---------- */

const RegisterForm = ({ onSuccess }) => {
  const [idType, setIdType] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError("Only PDF, JPG, PNG files are allowed");
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setFileError("File size must be under 10MB");
      setFile(null);
      return;
    }

    setFileError("");
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate Membership ID
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `GV-${year}-${random}`;

    onSuccess(generatedId);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" placeholder="Full legal name" />
        <Input label="Email Address" type="email" placeholder="name@gvsolution.com" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
            ID Proof Type
          </label>
          <select
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="">Select ID Type</option>
            <option value="aadhaar">Aadhaar Card</option>
            <option value="pan">PAN Card</option>
            <option value="passport">Passport</option>
            <option value="voter">Voter ID</option>
          </select>
        </div>

        <Input
          label="ID Number"
          placeholder={idType ? `Enter ${idType} number` : "Select ID Type first"}
          disabled={!idType}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
          Upload Digital Copy
        </label>

        <label className="group border-2 border-dashed border-slate-200 rounded-xl p-6 flex items-center gap-5 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
          <UploadCloud size={24} className="text-slate-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700">
              {file ? file.name : "Attach Document Copy"}
            </p>
            <p className="text-xs text-slate-400">PDF / JPG / PNG • Max 10MB</p>
            {fileError && <p className="text-xs text-red-500">{fileError}</p>}
          </div>
          <input type="file" hidden onChange={handleFileChange} />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <Input label="Password" type="password" placeholder="••••••••" />
        <Input label="Confirm" type="password" placeholder="••••••••" />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
      >
        Complete Registration <ChevronRight size={18} />
      </button>
    </form>
  );
};

/* ---------- Login Form ---------- */

const LoginForm = ({ memberId }) => (
  <form className="space-y-6">
    <Input
      label="Membership ID"
      placeholder="GV-XXXX-XXXX"
      value={memberId}
      readOnly
    />

    <Input label="Password" type="password" placeholder="••••••••" />

    <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
      Secure Login <ChevronRight size={18} />
    </button>
  </form>
);

/* ---------- Atomic Components ---------- */

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 text-slate-300">
    <CheckCircle2 size={18} className="text-indigo-400" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl ${
      active ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"
    }`}
  >
    {icon}
    {label}
  </button>
);

const Input = ({ label, value, readOnly, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
      {label}
    </label>
    <input
      value={value}
      readOnly={readOnly}
      {...props}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
    />
  </div>
);

export default AuthPage;
