import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedRoute from "./routes/Admin.route";
import AnalysisPage from "./pages/Admin/AnalysisPage";
import MenuPage from "./pages/Admin/MenuPage";
import TablePage from "./pages/Admin/TablePage";
import OrderPage from "./pages/Admin/OrderPage";
import InventoryPage from "./pages/Admin/InventoryPage";
import ReportPage from "./pages/Admin/ReportPage";
import SettingPage from "./pages/Admin/SettingPage";
import MenuCustomer from "./pages/Customer/MenuCustomer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />

        {/* ROLE ROUTES */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/admin" element={
          <ProtectedRoute>
              <AdminPage />
          </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="analysis" />} />

          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="tables" element={<TablePage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>

        {/* DEFAULT */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="menu" element={<MenuCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
