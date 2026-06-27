import { ClipboardList, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../utils/logout";

export default function CashierSidebar() {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg ${
      isActive
        ? "bg-green-700 text-white"
        : "hover:bg-gray-100"
    }`;

    const navigate = useNavigate();

  return (
    <aside className="w-64 border-r bg-white p-5">
      <h2 className="text-xl font-bold mb-8">
        Cashier
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/cashier/orders"
          className={linkClass}
        >
          <ClipboardList size={18} />
          Orders
        </NavLink>
      </nav>

      <div className="mt-auto pt-8">
        <button 
        onClick={()=>logout(navigate)}
        className="flex items-center gap-2 text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}