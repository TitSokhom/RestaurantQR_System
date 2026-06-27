import { Outlet } from "react-router-dom";
import CashierSidebar from "./CashierSidebar";

export default function CashierPage() {
  return (
    <div className="flex h-screen">
      <CashierSidebar />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}