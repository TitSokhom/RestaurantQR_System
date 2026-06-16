import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";

import { Outlet } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F7FAF8] text-gray-800">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;