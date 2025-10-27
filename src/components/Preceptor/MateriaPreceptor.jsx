import { useState } from "react";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom";

export default function MateriasPreceptor() {
  const navigate = useNavigate();
  const { materias } = usePreceptor();
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="text-strong-blue hover:underline"
      >
        ← Volver al inicio
      </button>

      <div className="flex justify-between items-center mb-4 mt-6">
        <h2 className="text-2xl font-bold text-dark-gray">Gestión de Materias</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showForm ? "Cancelar" : "Agregar Materia"}
        </button>
      </div>

      {materias.length === 0 && (
        <p className="mt-4 text-gray-500">No hay materias registradas.</p>
      )}
    </section>
  );
}
