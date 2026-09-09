import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthorized = sessionStorage.getItem("acesso_liberado") === "true";
  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
}