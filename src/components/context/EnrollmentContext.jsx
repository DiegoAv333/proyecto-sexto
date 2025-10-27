import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getEnrolled as storageGet, setEnrolled as storageSet } from "../../utils/storage";

const EnrollmentContext = createContext();

// Clave para guardar materias en localStorage
const SUBJECTS_KEY = "global_subjects";

const INITIAL_SUBJECTS = [
  { id: 1, name: "Matemática Avanzada", schedule: "Lunes y Miércoles 14:00-16:00", credits: 4 },
  { id: 2, name: "Historia Argentina", schedule: "Martes y Jueves 10:00-12:00", credits: 3 },
  { id: 3, name: "Física General", schedule: "Lunes y Viernes 08:00-10:00", credits: 5 },
  { id: 4, name: "Literatura Contemporánea", schedule: "Miércoles y Viernes 16:00-18:00", credits: 3 },
  { id: 5, name: "Química Orgánica", schedule: "Martes y Jueves 14:00-16:00", credits: 4 },
  { id: 6, name: "Inglés Intermedio", schedule: "Miércoles y Viernes 12:00-13:00", credits: 2 },
  { id: 7, name: "Programación I", schedule: "Martes y Jueves 18:00-20:00", credits: 4 },
  { id: 8, name: "Filosofía", schedule: "Viernes 14:00-18:00", credits: 3 },
];

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();

  // ✅ Cargar materias desde localStorage (o usar las iniciales si no hay nada)
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(SUBJECTS_KEY);
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  // ✅ Guardar automáticamente en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (user) setEnrolled(storageGet(user.email));
    else setEnrolled([]);
  }, [user]);

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

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    if (!user || selected.length === 0) return [];
    const additions = subjects.filter(
      (s) => selected.includes(s.id) && !isEnrolled(s.id)
    );
    if (additions.length === 0) {
      setSelected([]);
      return [];
    }
    const updated = [...enrolled, ...additions];
    storageSet(user.email, updated);
    setEnrolled(updated);
    setSelected([]);
    return additions;
  };

  const cancel = (id) => {
    if (!user) return;
    const updated = enrolled.filter((s) => s.id !== id);
    storageSet(user.email, updated);
    setEnrolled(updated);
  };

  const value = {
    subjects,
    setSubjects,
    enrolled,
    isEnrolled,
    selected,
    toggleSelect,
    confirm,
    cancel,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export const useEnrollment = () => useContext(EnrollmentContext);
