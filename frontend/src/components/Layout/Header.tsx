import { Search, Bell, Settings, LogOut } from "lucide-react";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
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
        <button 
        onClick={()=>logout(navigate)}
        className="flex items-center gap-2 text-red-500">
          <LogOut size={18} />
          Logout
        </button>
        <Settings />
        <div className="w-8 h-8 bg-orange-400 rounded-full text-white flex items-center justify-center">
          AU
        </div>
      </div>
    </header>
  );
};

export default Header;
