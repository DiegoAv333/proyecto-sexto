import { useState } from 'react';

// Hook para manejar la lógica de los preceptores
export const usePreceptor = () => {
  const [mensajes, setMensajes] = useState([
    { id: 1, remitente: 'Admin', texto: 'Recordatorio de reunión.' },
  ]);

  const agregarMensaje = (mensaje) => {
    setMensajes((prev) => [...prev, mensaje]);
  };

  const eliminarMensaje = (id) => {
    setMensajes((prev) => prev.filter((m) => m.id !== id));
  };

  return { mensajes, agregarMensaje, eliminarMensaje };
};