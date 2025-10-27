import { useState } from "react";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom";

export default function CalendarioPreceptor() {
  const { mensajes, agregarMensaje } = usePreceptor();
  const [nuevoEvento, setNuevoEvento] = useState({ fecha: "", texto: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento({ ...nuevoEvento, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoEvento.fecha || !nuevoEvento.texto)
      return alert("Completa todos los campos");

    agregarMensaje({
      id: Date.now(),
      remitente: "Preceptor",
      texto: `${nuevoEvento.fecha}: ${nuevoEvento.texto}`,
    });
    setNuevoEvento({ fecha: "", texto: "" });
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
      <h2 className="text-2xl font-bold mb-4 text-dark-gray">Calendario Escolar</h2>

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            name="fecha"
            value={nuevoEvento.fecha}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="texto"
            placeholder="Descripción del evento"
            value={nuevoEvento.texto}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Agregar Evento
        </button>
      </form>

      {mensajes.length === 0 && (
        <p className="mt-4 text-gray-500">No hay eventos programados.</p>
      )}
    </section>
  );
}

