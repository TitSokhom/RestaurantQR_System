import { Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import InventoryPage from "../pages/Admin/inventory/InventoryPage";
import ReportPage from "../pages/Admin/reports/ReportPage";
import SettingPage from "../pages/Admin/settings/SettingPage";
import ProtectedRoute from "./ProtectedRoute";
import MenuPage from "../pages/Admin/menu/MenuPage";
import TablePage from "../pages/Admin/tables/TablePage";
import OrderPage from "../pages/Admin/orders/OrderPage";
import AnalysisPage from "../pages/Admin/analysis/AnalysisPage";

export default function AdminRoute() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Routes>
        <Route path="/" element={<AdminPage />}>
          <Route index element={<Navigate to="analysis" replace />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="tables" element={<TablePage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}
