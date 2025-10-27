import { useState } from "react";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom"; // Agregar esta línea

export default function ComunicacionPreceptor() {
  const { mensajes, agregarMensaje, eliminarMensaje } = usePreceptor();
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const navigate = useNavigate(); // Agregar esta línea

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;
    agregarMensaje({ id: Date.now(), remitente: "Preceptor", texto: nuevoMensaje });
    setNuevoMensaje("");
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
      </header>      <h2 className="text-2xl font-bold mb-4 text-dark-gray">Comunicación</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Enviar Mensaje
        </button>
      </form>

      <ul className="space-y-2">
        {mensajes.map((m) => (
          <li
            key={m.id}
            className="border p-3 rounded flex justify-between items-center bg-gray-50"
          >
            <span>
              <strong>{m.remitente}:</strong> {m.texto}
            </span>
            <button
              onClick={() => eliminarMensaje(m.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
