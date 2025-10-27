import { createContext, useContext } from "react";
import { useEnrollment } from "./EnrollmentContext";

const PreceptorContext = createContext();
export const usePreceptor = () => useContext(PreceptorContext);

export function PreceptorProvider({ children }) {
  // ✅ Enlazamos con las materias globales del EnrollmentContext
  const { subjects, setSubjects } = useEnrollment();

  // Alumnos (solo visible para preceptor)
  const alumnos = [
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 2, nombre: "María López", email: "maria@mail.com" },
  ];