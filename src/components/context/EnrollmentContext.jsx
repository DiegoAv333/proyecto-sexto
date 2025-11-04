import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getEnrolled as storageGet, setEnrolled as storageSet } from "../../utils/storage";

const EnrollmentContext = createContext();

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [selected, setSelected] = useState([]);

  // 🔹 Escuchar cambios en Firestore en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "materias"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubjects(data);
    });
    return unsub;
  }, []);

  // 🔹 Cargar materias inscriptas (localStorage por usuario)
  useEffect(() => {
    if (user?.email) setEnrolled(storageGet(user.email));
    else setEnrolled([]);
  }, [user?.email]);

  const isEnrolled = (id) => enrolled.some((s) => s.id === id);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    if (!user?.email || selected.length === 0) return [];
    const additions = subjects.filter(
      (s) => selected.includes(s.id) && !isEnrolled(s.id)
    );
    const updated = [...enrolled, ...additions];
    storageSet(user.email, updated);
    setEnrolled(updated);
    setSelected([]);
    return additions;
  };

  const cancel = (id) => {
    if (!user?.email) return;
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
