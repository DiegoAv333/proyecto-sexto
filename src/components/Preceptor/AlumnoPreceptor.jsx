import { useNavigate } from "react-router-dom";

export default function AlumnosPreceptor() {
  const navigate = useNavigate();

return (
    <section className="max-w-4xl mx-auto px-4 py-8" aria-labelledby="mysubj-title">
      <header className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="text-strong-blue hover:underline"
        >
          ← Volver al inicio
        </button>
      </header>
      <h2 className="text-2xl font-bold text-dark-gray">Lista de Alumnos</h2>

    </section>
  );
}