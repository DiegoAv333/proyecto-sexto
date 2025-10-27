import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/Register";
import Dashboard from "./components/User/Dashboard";
import Enrollment from "./components/Enrollment/Enrollment";
import EnrolledSubjects from "./components/Enrollment/EnrolledSubjects";
import Detalle from "./components/Enrollment/Detalle";
import Profile from "./components/User/Profile";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { EnrollmentProvider } from "./components/context/EnrollmentContext";
import ProtectedRoute from "./routes/ProtectedRoute"; 

/** Shell privado: provee EnrollmentProvider una sola vez para todas las privadas */
function PrivateShell() {
  return (
    <EnrollmentProvider>
      <Outlet />
    </EnrollmentProvider>
  );
}

/** Envoltorio principal: muestra Navbar solo con sesión */
function Shell() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;

  return (
    <>
      {user && <Navbar />}
      <Routes>
        {/* Públicas */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Home />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Privadas (protegidas + provider único) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/enrolled" element={<EnrolledSubjects />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Privada por rol: solo backend */}
        <Route element={<ProtectedRoute roles={["backend"]} />}>
          <Route
            path="/admin"
            element={<div className="p-8">Panel Backend (solo rol backend)</div>}
          />
        </Route>

        {/* No autorizado */}
        <Route
          path="/unauthorized"
          element={<div className="p-8">No autorizado</div>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </BrowserRouter>
  );
}
