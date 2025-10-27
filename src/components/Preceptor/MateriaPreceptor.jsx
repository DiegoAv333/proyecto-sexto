import { useState } from "react";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom";

export default function MateriasPreceptor() {
  const navigate = useNavigate();
  const { materias, agregarMateria, eliminarMateria, setMaterias } = usePreceptor();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, nombre: "", dia: "", horario: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const horariosDisponibles = [
    "8:00 a 9:20", "9:20 a 10:40", "10:40 a 12:20",
    "13:30 a 14:50", "14:50 a 16:10", "16:10 a 17:50",
    "18:00 a 19:20", "19:20 a 20:40", "20:40 a 22:20"
  ];

  const validateTime = (time) => horariosDisponibles.includes(time);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.dia || !formData.horario) {
      setError("Completa todos los campos");
      return;
    }
    if (!validateTime(formData.horario)) {
      setError("Horario no válido. Seleccione un horario de la lista.");
      return;
    }

    setError("");

    if (isEditing) {
      const updated = materias.map((m) => (m.id === formData.id ? formData : m));
      setMaterias(updated);
      setSuccessMessage("Materia actualizada exitosamente");
    } else {
      agregarMateria({ ...formData, id: Date.now() });
      setSuccessMessage("Materia agregada exitosamente");
    }

    setFormData({ id: null, nombre: "", dia: "", horario: "" });
    setShowForm(false);
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (materia) => {
    setFormData(materia);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar esta materia?")) eliminarMateria(id);
  };

  return (
    <section className="max-w-5xl mx-auto p-6">
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

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
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setFormData({ id: null, nombre: "", dia: "", horario: "" });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showForm ? "Cancelar" : "Agregar Materia"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
          {error && <div className="text-red-500 mb-3">{error}</div>}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la materia"
              value={formData.nombre}
              onChange={handleChange}
              className="p-2 rounded border w-full"
            />
            <input
              type="text"
              name="dia"
              placeholder="Día (Lunes, Martes...)"
              value={formData.dia}
              onChange={handleChange}
              className="p-2 rounded border w-full"
            />
            <select
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className="p-2 rounded border w-full"
            >
              <option value="">Seleccionar horario</option>
              {horariosDisponibles.map((horario) => (
                <option key={horario} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {isEditing ? "Guardar cambios" : "Agregar Materia"}
          </button>
        </form>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Día</th>
            <th className="border px-4 py-2">Horario</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => {
            const nombre = m.nombre || m.name;
            const dia =
              m.dia ||
              (m.schedule?.match(/^[A-Za-zÁÉÍÓÚáéíóúñ\s,]+(?=\s\d)/)?.[0]?.trim() ?? "—");
            const horario =
              m.horario ||
              (m.schedule?.match(/\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/)?.[0] ?? "—");

            return (
              <tr key={m.id} className="text-center">
                <td className="border px-4 py-2">{nombre}</td>
                <td className="border px-4 py-2">{dia}</td>
                <td className="border px-4 py-2">{horario}</td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {materias.length === 0 && (
        <p className="mt-4 text-gray-500">No hay materias registradas.</p>
      )}
    </section>
  );
}
