import { Search, Bell, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between px-8 py-5 bg-white border-b ">
      <div className="relative w-96">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search menu..."
          className="w-full pl-10 py-2 bg-gray-100 rounded-full"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Bell />
        {/* <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button> */}
        <Settings />
        <div className="w-8 h-8 bg-orange-400 rounded-full text-white flex items-center justify-center">
          AU
        </div>
      </div>
    </header>
  );
};

export default Header;
