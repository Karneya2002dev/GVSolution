const Header = () => {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-1 text-sm"
        />
        <span className="font-medium">Admin User</span>
      </div>
    </header>
  );
};

export default Header;
