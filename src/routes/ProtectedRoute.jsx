import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function ProtectedRoute({ roles }) {
    const { user, loading } = useAuth();

    // Mientras carga el estado del usuario
    if (loading) return <p>Cargando...</p>;
    // Si no hay usuario logueado, redirigir al login
    if (!user) return <Navigate to="/login" replace />;

  // Si se especifican roles, validar
    if (roles && roles.length && !roles.includes(user.role || "frontend")) {
    return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
