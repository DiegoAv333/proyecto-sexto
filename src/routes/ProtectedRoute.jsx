import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function ProtectedRoute({ roles }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;

  // Si se especifican roles, validar
    if (roles && roles.length && !roles.includes(user.role || "frontend")) {
    return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
