import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Super Admin</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            className="pl-9 pr-4 py-2 border rounded-lg text-sm"
            placeholder="Search..."
          />
        </div>

        <Bell className="text-gray-600" />

        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
          SA
        </div>
      </div>
    </header>
  );
}
