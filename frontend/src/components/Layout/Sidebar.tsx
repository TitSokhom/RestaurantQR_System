import {
  UtensilsCrossed,
  BarChart3,
  QrCode,
  ClipboardList,
  Package,
  Settings,
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive ? "bg-green-700 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-[#F2F8F4] border-r flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Header */}
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-green-700 p-2 rounded-lg text-white">
            <UtensilsCrossed size={20} />
          </div>

          <div>
            <h1 className="font-bold">GastroAdmin</h1>
            <p className="text-xs text-gray-500">Kitchen Central</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          <NavLink to="/admin/analysis" className={linkClass}>
            <BarChart3 size={18} />
            Analytics
          </NavLink>

          <NavLink to="/admin/menu" className={linkClass}>
            <UtensilsCrossed size={18} />
            Menu
          </NavLink>

          <NavLink to="/admin/tables" className={linkClass}>
            <QrCode size={18} />
            Tables
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            <ClipboardList size={18} />
            Orders
          </NavLink>

          <NavLink to="/admin/inventory" className={linkClass}>
            <Package size={18} />
            Inventory
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass}>
            <FileText size={18} />
            Reports
          </NavLink>

          <NavLink to="/admin/settings" className={linkClass}>
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Bottom user section */}
      <div className="p-4 m-4 bg-gray-100 rounded-xl text-sm">Admin User</div>
    </aside>
  );
};

export default Sidebar;
