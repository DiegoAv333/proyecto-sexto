import { useState, useEffect } from 'react';
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export const useEvents = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Eventos"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventos(eventosData);
    });

    return () => unsubscribe();
  }, []);

  const agregarEvento = async (evento) => {
    try {
      await addDoc(collection(db, "Eventos"), {
        ...evento,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al agregar evento: ", error);
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await deleteDoc(doc(db, "Eventos", id));
    } catch (error) {
      console.error("Error al eliminar evento: ", error);
    }
  };

  return { eventos, agregarEvento, eliminarEvento };
};