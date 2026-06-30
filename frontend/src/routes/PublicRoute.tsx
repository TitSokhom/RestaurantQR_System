import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "CHEF") return <Navigate to="/chef" replace />;
    if (role === "CASHIER") return <Navigate to="/cashier" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
}