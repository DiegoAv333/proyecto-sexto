import { useNavigate } from "react-router-dom";
import anim from "../../styles/animations.module.css";
import { usePreceptor } from "../context/PreceptorContext";


export default function PreceptorDashboard() {
  const navigate = useNavigate();
  const { materias = [], alumnos = [], mensajes = [] } = usePreceptor();
    return(
    <section className={`max-w-6xl mx-auto px-4 py-8 ${anim.fadeIn}`}>
        <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark-gray mb-2">Panel del Preceptor</h1>
        <p className="text-gray-600 text-lg">Bienvenido/a</p>
      </header>

      {/* Materias */}
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
        
    </section>
    );
}