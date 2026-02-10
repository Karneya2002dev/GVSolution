const UserTop = () => {
  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Member Portal</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded"
        />

        <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
          JD
        </div>
      </div>
    </div>
  );
};

export default UserTop;
