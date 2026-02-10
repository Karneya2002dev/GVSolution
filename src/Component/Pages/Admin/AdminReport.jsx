import { useMemo, useState } from "react";
import { Download, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ---------------- DATA ---------------- */
const reports = [
  {
    id: "MEM-2024-0004",
    name: "Member 4",
    email: "member4@example.com",
    city: "San Antonio",
    plan: "Premium Plan",
    joinDate: "2023-02-09",
    endDate: "2024-02-09",
  },
  {
    id: "MEM-2024-0005",
    name: "Member 5",
    email: "member5@example.com",
    city: "Dallas",
    plan: "Enterprise Plan",
    joinDate: "2023-05-16",
    endDate: "2024-05-16",
  },
  {
    id: "MEM-2024-0007",
    name: "Member 7",
    email: "member7@example.com",
    city: "San Antonio",
    plan: "Basic Plan",
    joinDate: "2023-12-16",
    endDate: "2024-12-16",
  },
];

const PAGE_SIZE = 5;

export default function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [plan, setPlan] = useState("All Plans");
  const [page, setPage] = useState(1);

  /* ---------------- FILTER LOGIC ---------------- */
  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const join = new Date(r.joinDate);
      if (startDate && join < new Date(startDate)) return false;
      if (endDate && join > new Date(endDate)) return false;
      if (plan !== "All Plans" && r.plan !== plan) return false;
      return true;
    });
  }, [startDate, endDate, plan]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- CHART DATA ---------------- */
  const planChart = useMemo(() => {
    const map = {};
    filtered.forEach((r) => {
      map[r.plan] = (map[r.plan] || 0) + 1;
    });
    return Object.entries(map).map(([plan, count]) => ({
      plan,
      count,
    }));
  }, [filtered]);

  const monthlyChart = useMemo(() => {
    const map = {};
    filtered.forEach((r) => {
      const month = r.joinDate.slice(0, 7);
      map[month] = (map[month] || 0) + 1;
    });
    return Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
  }, [filtered]);

  /* ---------------- EXPORT ---------------- */
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Members");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "members-report.xlsx");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Reports</h1>
            <p className="text-sm text-slate-500">
              Generate and export membership reports
            </p>
          </div>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            <Download size={16} /> Export Excel
          </button>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Members by Plan</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={planChart}>
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Monthly Join Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="total" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FILTER CARD */}
        <div className="bg-white border rounded-xl p-5 space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-sm">
            <Filter size={16} /> Report Filters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option>All Plans</option>
              <option>Basic Plan</option>
              <option>Premium Plan</option>
              <option>Enterprise Plan</option>
            </select>

            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setPlan("All Plans");
              }}
              className="border rounded-lg text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-xl p-5">
          <table className="w-full text-sm border">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Member ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Plan</th>
                <th className="p-2">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r, i) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.name}</td>
                  <td className="p-2">{r.plan}</td>
                  <td className="p-2">{r.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length}
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ‹ Prev
              </button>
              <span>{page}</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
