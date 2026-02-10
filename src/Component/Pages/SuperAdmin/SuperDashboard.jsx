import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

/* ---------------- DATA ---------------- */

const stats = [
  { title: "Total Users", value: "1,250" },
  { title: "Total Admins", value: "8" },
  { title: "Active Members", value: "1,100" },
  { title: "Pending Approvals", value: "25" },
  { title: "Announcements", value: "45" },
  { title: "Total Approved", value: "1,050" },
  { title: "Rejected", value: "75" },
];

const growthData = [
  { month: "Jan", users: 120, members: 80 },
  { month: "Feb", users: 150, members: 100 },
  { month: "Mar", users: 200, members: 140 },
  { month: "Apr", users: 180, members: 130 },
  { month: "May", users: 250, members: 180 },
  { month: "Jun", users: 300, members: 220 },
];

const plans = [
  { name: "Basic Plan", value: 650 },
  { name: "Premium Plan", value: 350 },
  { name: "Enterprise", value: 100 },
];

const pieData = [
  { name: "Approved", value: 1050, color: "#2563eb" },
  { name: "Pending", value: 25, color: "#facc15" },
  { name: "Rejected", value: 75, color: "#ef4444" },
];

/* ---------------- COMPONENT ---------------- */

export default function SuperDashboard() {
  const [activeStat, setActiveStat] = useState(0);
  const [lineType, setLineType] = useState("users");
  const [hiddenSlice, setHiddenSlice] = useState(null);

  return (
    <>
      {/* STATS */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            onClick={() => setActiveStat(i)}
            className={`bg-white p-5 rounded-xl shadow-sm cursor-pointer
              ${activeStat === i ? "ring-2 ring-blue-500" : ""}`}
          >
            <p className="text-sm text-gray-500">{s.title}</p>
            <h2 className="text-2xl font-bold mt-1">{s.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Growth Overview</h3>

            {/* Toggle */}
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => setLineType("users")}
                className={`px-3 py-1 rounded ${
                  lineType === "users"
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setLineType("members")}
                className={`px-3 py-1 rounded ${
                  lineType === "members"
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                Members
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={lineType}
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-80">
          <h3 className="font-semibold mb-4">Membership Plans</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={plans} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE + ADMINS */}
      <div className="grid grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Application Status</h3>

          <div className="flex items-center gap-6">
            <PieChart width={220} height={220}>
              <Pie
                data={pieData.filter(p => p.name !== hiddenSlice)}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {pieData.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Pie>
            </PieChart>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              {pieData.map(p => (
                <button
                  key={p.name}
                  onClick={() =>
                    setHiddenSlice(hiddenSlice === p.name ? null : p.name)
                  }
                  className="flex items-center gap-2"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: p.color }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ADMINS */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Administrators</h3>
            <button
              onClick={() => alert("Navigate to Manage Admins")}
              className="text-sm border px-3 py-1 rounded"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3">
            <div className="border p-3 rounded-lg hover:bg-slate-50">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-500">admin@example.com</p>
            </div>

            <div className="border p-3 rounded-lg hover:bg-slate-50">
              <p className="font-medium">Super Admin</p>
              <p className="text-sm text-gray-500">superadmin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
