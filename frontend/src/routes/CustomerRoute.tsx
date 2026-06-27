import { Routes, Route } from "react-router-dom";
import MenuCustomer from "../pages/Customer/MenuCustomer";

export default function CustomerRoute() {
  return (
    <Routes>
      <Route path="/" element={<MenuCustomer />} />
    </Routes>
  );
}