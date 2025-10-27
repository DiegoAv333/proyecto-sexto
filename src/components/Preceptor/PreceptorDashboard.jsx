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
    </section>
    );
}