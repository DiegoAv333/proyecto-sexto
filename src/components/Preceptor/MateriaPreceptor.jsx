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
    </section>
  );
}
