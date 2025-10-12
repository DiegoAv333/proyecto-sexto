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

    //funcion del login
    const login = (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Email o contraseña incorrectos");
    
    setUser(found);
    setCurrentUser(found);

    //Redirigir al home o dashboard según necesidad
    navigate("/dashboard");
    return found;
    };

    //funcion del register
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

    //redirigir después de registrar
    navigate("/dashboard");
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

    //cerrar sesión
    const logout = () => {
    setUser(null);
    clearCurrentUser();
    navigate("/login");//redirige al login al cerrar sesión
    };

    const enrolledCount = useMemo(
    () => (user ? getEnrolled(user.email).length : 0),
    [user]
    );

    const value = { user, loading, login, register, updateProfile, logout, enrolledCount };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
//hook
export const useAuth = () => useContext(AuthContext);