import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getEnrolled as storageGet, setEnrolled as storageSet } from "../../utils/storage";

const EnrollmentContext = createContext();


//Proximamente con firebase
const SUBJECTS = [
  { id: 1, name: 'Matemática Avanzada', schedule: 'Lun-Mié 14:00-16:00', credits: 4 },
  { id: 2, name: 'Historia Argentina', schedule: 'Mar-Jue 10:00-12:00', credits: 3 },
  { id: 3, name: 'Física General', schedule: 'Lun-Vie 08:00-10:00', credits: 5 },
  { id: 4, name: 'Literatura Contemporánea', schedule: 'Mié-Vie 16:00-18:00', credits: 3 },
  { id: 5, name: 'Química Orgánica', schedule: 'Mar-Jue 14:00-16:00', credits: 4 },
  { id: 6, name: 'Inglés Intermedio', schedule: 'Lun-Mié-Vie 12:00-13:00', credits: 2 },
  { id: 7, name: 'Programación I', schedule: 'Mar-Jue 18:00-20:00', credits: 4 },
  { id: 8, name: 'Filosofía', schedule: 'Vie 14:00-18:00', credits: 3 }
];

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();

  // Estado reactivo de materias inscriptas
  const [enrolled, setEnrolled] = useState([]);

  // Estado de selección temporal en la UI
  const [selected, setSelected] = useState([]);

  // Cargar desde storage cuando haya usuario o cambie
  useEffect(() => {
    if (user) setEnrolled(storageGet(user.email));
    else setEnrolled([]);
  }, [user]);

  // (Opcional) escuchar cambios de storage entre pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (!user) return;
      if (e.key === `enrolled_${user.email}`) {
        setEnrolled(storageGet(user.email));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  const isEnrolled = (id) => enrolled.some((s) => s.id === id);

  const toggleSelect = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const confirm = () => {
    if (!user || selected.length === 0) return [];
    const additions = SUBJECTS.filter((s) => selected.includes(s.id) && !isEnrolled(s.id));
    if (additions.length === 0) {
      setSelected([]);
      return [];
    }
    const updated = [...enrolled, ...additions];
    //  Persistir y actualizar estado reactivo
    storageSet(user.email, updated);
    setEnrolled(updated);
    setSelected([]);
    return additions;
  };

  const cancel = (id) => {
    if (!user) return;
    const updated = enrolled.filter((s) => s.id !== id);
    // Persistir y actualizar estado reactivo
    storageSet(user.email, updated);
    setEnrolled(updated);
  };

  const value = {
    subjects: SUBJECTS,
    enrolled,
    isEnrolled,
    selected,
    toggleSelect,
    confirm,
    cancel,
  };

  return <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>;
}

export const useEnrollment = () => useContext(EnrollmentContext);
