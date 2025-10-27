import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreceptor } from "../context/PreceptorContext";

export default function AlumnosPreceptor() {
  const { alumnos, eliminarAlumno } = usePreceptor();
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlumno({ ...nuevoAlumno, [name]: value });
  };
   const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoAlumno.nombre || !nuevoAlumno.email)
      return alert("Completa todos los campos");

    agregarAlumno({ id: Date.now(), ...nuevoAlumno });
    setNuevoAlumno({ nombre: "", email: "" });
  };

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

<form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del alumno"
            value={nuevoAlumno.nombre}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email del alumno"
            value={nuevoAlumno.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Agregar Alumno
        </button>
</form>

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

      {alumnos.length === 0 && (
        <p className="mt-4 text-gray-500">No hay alumnos registrados.</p>
      )}

    </section>
  );
}