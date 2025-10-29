// src/components/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  getUsers,
  setUsers,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getEnrolled,
} from "../../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Seed de usuarios de prueba: siempre asegura que existan
  useEffect(() => {
    const users = getUsers() || [];
    const seed = [
      { name: "Admin", email: "admin@gmail.com", password: "123456", role: "backend" },
      { name: "Alumno", email: "alumno1@gmail.com", password: "alumno123", role: "frontend" },
      { name: "Preceptor", email: "preceptor1@gmail.com", password: "prece123", role: "preceptor" },
    ];

    seed.forEach((u) => {
      if (!users.find((x) => x.email === u.email)) users.push(u);
    });

    setUsers(users);
    setLoading(false);
  }, []);

  // Función de login
  const login = (email, password) => {
    const users = getUsers() || [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Email o contraseña incorrectos");

    setUser(found);
    setCurrentUser(found);
    navigate("/dashboard");
    return found;
  };

  // Función de registro
  const register = (name, email, password) => {
    const users = getUsers() || [];
    if (users.find((u) => u.email === email)) throw new Error("Ya existe una cuenta con este email");

    const newUser = {
      name,
      email,
      password,
      role: "frontend",
      dni: "",
      address: "",
      phone: "",
    };

    users.push(newUser);
    setUsers(users);
    setUser(newUser);
    setCurrentUser(newUser);
    navigate("/dashboard");
    return newUser;
  };

  // Función para actualizar perfil
  const updateProfile = ({ name, email, password, dni, address, phone }) => {
    const users = getUsers() || [];
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx === -1) return;

    const updated = {
      ...users[idx],
      name,
      email,
      dni,
      address,
      phone,
      ...(password ? { password } : {}),
    };

    users[idx] = updated;
    setUsers(users);
    setUser(updated);
    setCurrentUser(updated);
  };

  // Logout
  const logout = () => {
    setUser(null);
    clearCurrentUser();
    navigate("/login");
  };

  // Cantidad de materias inscriptas
  const enrolledCount = useMemo(() => (user ? getEnrolled(user.email).length : 0), [user]);

  // Login con Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user: firebaseUser } = result;

    const users = getUsers() || [];
    let user = users.find((u) => u.email === firebaseUser.email);

    // Si el usuario no existe, lo creamos
    if (!user) {
      user = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        role: "frontend", // Rol por defecto
        // Otros campos que quieras inicializar
      };
      users.push(user);
      setUsers(users);
    }

    setUser(user);
    setCurrentUser(user);
    navigate("/dashboard");
    return user;
  };

  const value = { user, loading, login, register, updateProfile, logout, enrolledCount, loginWithGoogle };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para consumir contexto
export const useAuth = () => useContext(AuthContext);
