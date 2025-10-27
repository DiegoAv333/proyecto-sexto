import { createContext, useContext } from "react";
import { useEnrollment } from "./EnrollmentContext";

const PreceptorContext = createContext();
export const usePreceptor = () => useContext(PreceptorContext);

export function PreceptorProvider({ children }) {
  //Enlazamos con las materias globales del EnrollmentContext
  const { subjects, setSubjects } = useEnrollment();

  // Alumnos (solo visible para preceptor)
  const alumnos = [
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 2, nombre: "María López", email: "maria@mail.com" },
  ];
  // Mensajes informativos o administrativos
  const mensajes = [
    { id: 1, remitente: "Admin", texto: "Recordatorio de reunión." },
  ];

  // --- Funciones para manejar materias ---
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

  return (
    <PreceptorContext.Provider
      value={{
        materias: subjects,     // sincronizado con Enrollment
        setMaterias: setSubjects,
        alumnos,
        mensajes,
        agregarMateria,
        eliminarMateria,
      }}
    >
      {children}
    </PreceptorContext.Provider>
  );
}
