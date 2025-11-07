import { createContext, useContext, useState, useEffect } from "react";
import { useEnrollment } from "./EnrollmentContext";
import { db } from "../../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, where } from "firebase/firestore";

const PreceptorContext = createContext();
export const usePreceptor = () => useContext(PreceptorContext);

export function PreceptorProvider({ children }) {
  const { subjects, setSubjects } = useEnrollment();
  const [mensajes, setMensajes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const qMensajes = query(collection(db, "mensajesPreceptor"), orderBy("timestamp", "asc"));
    const unsubscribeMensajes = onSnapshot(qMensajes, (snapshot) => {
      const mensajesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(mensajesData);
    });

    const qAlumnos = query(collection(db, "usuarios"), where("role", "==", "alumno"), orderBy("name", "asc"));
    const unsubscribeAlumnos = onSnapshot(qAlumnos, (snapshot) => {
      const alumnosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlumnos(alumnosData);
    });

    return () => {
      unsubscribeMensajes();
      unsubscribeAlumnos();
    };
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
    await updateDoc(doc(db, "mensajesPreceptor", id), {
      eliminado: true, 
    });
    console.log("Mensaje eliminado.");
  } catch (error) {
    console.error("Error al eliminar mensaje: ", error);
  }
};

  const agregarAlumno = async (alumno) => {
    try {
      await addDoc(collection(db, "usuarios"), {
        ...alumno,
        role: "alumno", // Ensure the role is set to alumno
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al agregar alumno: ", error);
    }
  };

const eliminarAlumno = async (id) => {
  try {
    await updateDoc(doc(db, "usuarios", id), {
      eliminado: true, 
    });
    console.log("Alumno eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar alumno: ", error);
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
        agregarAlumno,
        eliminarAlumno,
      }}
    >
      {children}
    </PreceptorContext.Provider>
  );
}
