import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function MateriaPreceptor() {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ name: "", day: "", time: "" });
  const [editando, setEditando] = useState(null);

  // 🔹 Escucha en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "materias"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMaterias(data);
    });
    return unsub;
  }, []);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Agregar nueva materia
  const handleAdd = async () => {
    if (!form.name || !form.day || !form.time)
      return alert("Completa todos los campos antes de guardar.");

    await addDoc(collection(db, "materias"), {
      name: form.name,
      day: form.day,
      time: form.time,
      fechaCreacion: new Date().toLocaleDateString(),
      horaCreacion: new Date().toLocaleTimeString(),
    });

    setForm({ name: "", day: "", time: "" });
  };

  // 🔹 Guardar edición
  const handleSave = async (id) => {
    const ref = doc(db, "materias", id);
    await updateDoc(ref, {
      name: form.name,
      day: form.day,
      time: form.time,
    });
    setEditando(null);
    setForm({ name: "", day: "", time: "" });
  };

  // 🔹 Eliminar materia
  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta materia?")) {
      await deleteDoc(doc(db, "materias", id));
    }
  };

  // 🔹 Iniciar edición
  const handleEdit = (materia) => {
    setEditando(materia.id);
    setForm({
      name: materia.name,
      day: materia.day,
      time: materia.time,
    });
  };

  return (
    <section className="p-8 bg-light-blue min-h-screen">
      {/* 🔙 Botón Volver */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Volver al Inicio
      </button>

      <h1 className="text-3xl font-bold text-dark-gray mb-6">
        Gestión de Materias
      </h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editando ? "Editar Materia" : "Agregar Nueva Materia"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            name="name"
            placeholder="Nombre de la materia"
            className="border p-2 rounded-lg"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="day"
            placeholder="Días (Ej: Lunes y Miércoles)"
            className="border p-2 rounded-lg"
            value={form.day}
            onChange={handleChange}
          />
          <input
            name="time"
            placeholder="Horario (Ej: 14:00 a 16:00)"
            className="border p-2 rounded-lg"
            value={form.time}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={() => (editando ? handleSave(editando) : handleAdd())}
          className="text-white bg-strong-blue px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editando ? "Guardar cambios" : "Agregar materia"}
        </button>

        {editando && (
          <button
            onClick={() => {
              setEditando(null);
              setForm({ name: "", day: "", time: "" });
            }}
            className="ml-3 text-gray-600 hover:text-gray-900"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Tabla */}
      <table className="w-full bg-white rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-blue-50 text-left">
            <th className="p-3">Nombre</th>
            <th className="p-3">Días</th>
            <th className="p-3">Horario</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id} className="border-t hover:bg-blue-50">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.day}</td>
              <td className="p-3">{m.time}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-yellow-400 px-3 py-1 rounded-lg text-white hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600"
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
