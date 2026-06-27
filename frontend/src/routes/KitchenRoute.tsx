import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KitchenPage from "../pages/kitchen/KitchenPage";

export default function KitchenRoute() {
  return (
    <ProtectedRoute allowedRoles={["CHEF"]}>
      <Routes>
        <Route path="/" element={<KitchenPage />} />
      </Routes>
    </ProtectedRoute>
  );
}