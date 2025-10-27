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

import PreceptorDashboard from "./components/Preceptor/PreceptorDashboard";
import MateriasPreceptor from "./components/Preceptor/MateriaPreceptor";
import CalendarioPreceptor from "./components/Preceptor/CalendarioPreceptor";
import AlumnosPreceptor from "./components/Preceptor/AlumnoPreceptor";
import ComunicacionPreceptor from "./components/Preceptor/ComunicacionPreceptor";
import { PreceptorProvider } from "./components/context/PreceptorContext";

// Shell para rutas privadas con EnrollmentProvider
function PrivateShell() {
  return (
    <EnrollmentProvider>
      <Outlet />
    </EnrollmentProvider>
  );
}

// Shell principal, muestra Navbar si hay usuario
function Shell() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;

  return (
    <PreceptorProvider>
      {user && <Navbar />}
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
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

        {/* --- RUTAS PRIVADAS (alumnos) --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/enrolled" element={<EnrolledSubjects />} />
            <Route path="/materia/:id" element={<Detalle />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* --- RUTAS PROTEGIDAS PARA PRECEPTORES Y ADMIN --- */}
        <Route element={<ProtectedRoute roles={["preceptor", "backend"]} />}>
          <Route
            element={
              <PreceptorProvider>
                <Outlet />
              </PreceptorProvider>
            }
          >
            <Route path="/preceptor" element={<PreceptorDashboard />} />
            <Route path="/preceptor/materias" element={<MateriasPreceptor />} />
            <Route path="/preceptor/calendario" element={<CalendarioPreceptor />} />
            <Route path="/preceptor/alumnos" element={<AlumnosPreceptor />} />
            <Route path="/preceptor/comunicacion" element={<ComunicacionPreceptor />} />
          </Route>
        </Route>

        {/* --- RUTA BACKEND (solo admin) --- */}
        <Route element={<ProtectedRoute roles={["backend"]} />}>
          <Route
            path="/admin"
            element={<div className="p-8">Panel Backend (solo rol backend)</div>}
          />
        </Route>

        {/* --- Fallback --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PreceptorProvider>
  );
}

// App principal
export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <EnrollmentProvider>
        <PreceptorProvider>
          <Shell />
        </PreceptorProvider>
      </EnrollmentProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}
