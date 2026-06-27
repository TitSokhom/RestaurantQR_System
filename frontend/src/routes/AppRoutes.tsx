import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import AdminRoute from "./AdminRoute";
import KitchenRoute from "./KitchenRoute";
import CustomerRoute from "./CustomerRoute";
import UnauthorizedPage from "./UnauthorizedPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        {/* ROLE ROUTES */}
        <Route path="/admin/*" element={<AdminRoute />} />
        
        <Route path="/chef/*" element={<KitchenRoute />} />
        <Route path="/cashier/*" element={<div>Cashier</div>} />

        {/* CUSTOMER */}
        <Route path="/menu/:tableId" element={<CustomerRoute />} />

        {/* ERROR */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
