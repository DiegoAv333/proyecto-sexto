import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate(); //redirecciones automaticas

  // (Opcional) sembrar usuarios de prueba si no hay ninguno
    useEffect(() => {
    const users = getUsers();
    if (users.length === 0) {
        const seed = [
        { name: "Admin", email: "admin@gmail.com", password: "123456", role: "backend" },
        ];
        setUsers(seed);
    }
    setLoading(false);
    }, []);
