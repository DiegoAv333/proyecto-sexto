import { useState } from "react";
import { usePreceptor } from "../context/PreceptorContext";
import { useNavigate } from "react-router-dom";

export default function CalendarioPreceptor() {
  const { mensajes } = usePreceptor();
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
      <h2 className="text-2xl font-bold mb-4 text-dark-gray">Calendario Escolar</h2>

      {mensajes.length === 0 && (
        <p className="mt-4 text-gray-500">No hay eventos programados.</p>
      )}
    </section>
  );
}
