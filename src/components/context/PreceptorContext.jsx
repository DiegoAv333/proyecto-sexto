import { createContext, useContext, useState, useEffect } from "react";
import { useEnrollment } from "./EnrollmentContext";
import { db } from "../../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

const PreceptorContext = createContext();
export const usePreceptor = () => useContext(PreceptorContext);

export function PreceptorProvider({ children }) {
  const { subjects, setSubjects } = useEnrollment();
  const [mensajes, setMensajes] = useState([]);
  const alumnos = [
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 2, nombre: "María López", email: "maria@mail.com" },
  ];

  useEffect(() => {
    const q = query(collection(db, "mensajesPreceptor"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mensajesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(mensajesData);
    });

    return () => unsubscribe();
  }, []);

  const agregarMateria = (materia) => {
    setSubjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: materia.nombre,
        schedule: `${materia.dia} ${materia.horario}`,
        credits: 3,
      },
    ]);
  };

  const eliminarMateria = (id) => {
    setSubjects((prev) => prev.filter((m) => m.id !== id));
  };

  const agregarMensaje = async (mensaje) => {
    try {
      await addDoc(collection(db, "mensajesPreceptor"), {
        ...mensaje,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al agregar mensaje: ", error);
    }
  };

  const eliminarMensaje = async (id) => {
    try {
      await deleteDoc(doc(db, "mensajesPreceptor", id));
    } catch (error) {
      console.error("Error al eliminar mensaje: ", error);
    }
  };

  return (
    <PreceptorContext.Provider
      value={{
        materias: subjects,
        setMaterias: setSubjects,
        alumnos,
        mensajes,
        agregarMateria,
        eliminarMateria,
        agregarMensaje,
        eliminarMensaje,
      }}
    >
      {children}
    </PreceptorContext.Provider>
  );
}
