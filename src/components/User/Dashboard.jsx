import anim from "../../styles/animations.module.css";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enrolled } = useEnrollment();
  const { materias, alumnos, mensajes } = usePreceptor();

  const enrolledCount = user?.role === "frontend" || user?.role === "backend"
    ? enrolled.length
    : 0;

  return (
    <section className={`max-w-6xl mx-auto px-4 py-8 ${anim.fadeIn}`}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark-gray mb-2">Inicio</h1>
        <p className="text-gray-600 text-lg">
          ¡Bienvenido {user?.name}!
          {user?.role === "backend" && (
            <span className="ml-2 text-sm bg-yellow-200 px-2 py-1 rounded font-semibold text-yellow-800">
              Modo Administrador
            </span>
          )}
        </p>
      </header>

      {/* --- Vista Alumno --- */}
      {(user?.role === "frontend" || user?.role === "backend") && (
        <>
          <div className="grid md:grid-cols-3 gap-6" role="list">
            <button
              onClick={() => navigate("/enrollment")}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
              role="listitem"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl grid place-items-center mr-4">
                  <span className="text-green-700 text-xl">＋</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-gray">Inscripción a Materias</h3>
              </div>
              <p className="text-gray-600">Inscribite a las materias disponibles</p>
            </button>

            <button
              onClick={() => navigate("/enrolled")}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
              role="listitem"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl grid place-items-center mr-4">
                  <span className="text-blue-700 text-xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-gray">Mis Materias</h3>
              </div>
              <p className="text-gray-600">Ver materias en las que estás inscripto</p>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
              role="listitem"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl grid place-items-center mr-4">
                  <span className="text-purple-700 text-xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-gray">Mi Perfil</h3>
              </div>
              <p className="text-gray-600">Gestioná tu información personal</p>
            </button>
          </div>

          {/* Resumen rápido alumno */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-dark-gray mb-4">Resumen rápido</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-light-blue rounded-xl p-4">
                <h4 className="font-medium text-dark-gray mb-2">Materias inscriptas</h4>
                <p className="text-2xl font-bold text-strong-blue">{enrolledCount}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-dark-gray mb-2">Materias disponibles</h4>
                <p className="text-2xl font-bold text-green-700">8</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- Vista Preceptor --- */}
      {(user?.role === "preceptor" || user?.role === "backend") && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <button
            onClick={() => navigate("/preceptor/materias")}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl grid place-items-center mr-4">
                📚
              </div>
              <h3 className="text-xl font-semibold text-dark-gray">Materias</h3>
            </div>
            <p className="text-gray-600">{materias.length} materias registradas</p>
          </button>

          <button
            onClick={() => navigate("/preceptor/calendario")}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl grid place-items-center mr-4">
                📅
              </div>
              <h3 className="text-xl font-semibold text-dark-gray">Calendario</h3>
            </div>
            <p className="text-gray-600">Visualizá días y horarios de mesas</p>
          </button>

          <button
            onClick={() => navigate("/preceptor/alumnos")}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl grid place-items-center mr-4">
                👥
              </div>
              <h3 className="text-xl font-semibold text-dark-gray">Alumnos</h3>
            </div>
            <p className="text-gray-600">{alumnos.length} alumnos registrados</p>
          </button>

          <button
            onClick={() => navigate("/preceptor/comunicacion")}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl grid place-items-center mr-4">
                💬
              </div>
              <h3 className="text-xl font-semibold text-dark-gray">Mensajes</h3>
            </div>
            <p className="text-gray-600">{mensajes.length} mensajes nuevos</p>
          </button>
        </div>
      )}
    </section>
  );
}
