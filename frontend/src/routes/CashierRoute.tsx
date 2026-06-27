import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import OrderPage from "../pages/Admin/orders/OrderPage";
import CashierPage from "../pages/Admin/Cashier/CashierPage";

export default function CashierRoute() {
  return (
    <ProtectedRoute allowedRoles={["CASHIER"]}>
      <Routes>
        <Route path="/" element={<CashierPage />}>
          <Route
            index
            element={<Navigate to="orders" replace />}
          />

          <Route
            path="orders"
            element={<OrderPage />}
          />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}