import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subjects } = useEnrollment();
  const [materia, setMateria] = useState(null);

  useEffect(() => {
    if (subjects && subjects.length > 0) {
      const encontrada = subjects.find((s) => String(s.id) === String(id));
      setMateria(encontrada);
    }
  }, [id, subjects]);

  if (!materia) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Materia no encontrada.</p>
        <button
          onClick={() => navigate("/enrollment")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver a Inscripción
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{materia.name}</h1>
      <p className="mb-2">📅 Horario: {materia.schedule}</p>
      <p className="mb-2">📚 Créditos: {materia.credits}</p>
      {materia.capacity && <p className="mb-2">Cupo máximo: {materia.capacity}</p>}
      {materia.enrolled && (
        <p className="mb-4">Inscritos: {materia.enrolled.length}</p>
      )}

      <button
        onClick={() => navigate("/enrollment")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
      >
        Volver a Inscripción
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      >
        Ir al Dashboard
      </button>
    </div>
  );
}