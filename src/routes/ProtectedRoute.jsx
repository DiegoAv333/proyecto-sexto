import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-6 text-center">Cargando...</p>;

  // Si no hay sesión
  if (!user) return <Navigate to="/login" replace />;

  // Si hay restricción por rol
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
