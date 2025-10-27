import { useNavigate } from "react-router-dom";
import { usePreceptor } from "../context/PreceptorContext";

export default function AlumnosPreceptor() {
  const { alumnos, eliminarAlumno } = usePreceptor();
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

    <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="border px-4 py-2">{a.nombre}</td>
              <td className="border px-4 py-2">{a.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => eliminarAlumno(a.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}