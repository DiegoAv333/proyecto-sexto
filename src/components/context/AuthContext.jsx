import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

    const login = (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Email o contraseña incorrectos");
    setUser(found);
    setCurrentUser(found);
    return found;
    };

    const register = (name, email, password) => {
        const users = getUsers();
        if (users.find(u => u.email === email)) throw new Error("Ya existe una cuenta con este email");

  // Nuevo usuario con rol y campos extra inicializados vacíos
        const newUser = { 
            name, 
            email, 
            password, 
            role: "frontend", 
            dni: "", 
            address: "", 
            phone: "" 
        };

    users.push(newUser);
    setUsers(users);
    setUser(newUser);
    setCurrentUser(newUser);
    return newUser;
};


    const updateProfile = ({ name, email, password, dni, address, phone }) => {
        const users = getUsers();
        const idx = users.findIndex(u => u.email === user.email);
        if (idx === -1) return;
        const updated = {
        ...users[idx],    // conserva role y otros
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

    const logout = () => {
    setUser(null);
    clearCurrentUser();
    };

    const enrolledCount = useMemo(
    () => (user ? getEnrolled(user.email).length : 0),
    [user]
    );

    const value = { user, loading, login, register, updateProfile, logout, enrolledCount };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
