// src/components/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase/config";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile as fbUpdateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getEnrolled } from "../../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  // Escucha cambios de sesión (login/logout)
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (fbUser) => {
            if (!fbUser) {
                setUser(null);
                setLoading(false);
                return;
        }

      // Trae perfil desde Firestore
        const ref = doc(db, "users", fbUser.uid);
        const snap = await getDoc(ref);
        const profile = snap.exists() ? snap.data() : {};

    setUser({
        uid: fbUser.uid,
        email: fbUser.email,
        name: profile.name || fbUser.displayName || "",
        role: profile.role || "frontend",
        dni: profile.dni || "",
        address: profile.address || "",
        phone: profile.phone || "",
        photoURL: fbUser.photoURL || profile.photoURL || null,
    });

        setLoading(false);
    });

    return () => unsub();
    }, []);

  // Registro con Email/Password
    const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Crea documento en Firestore
    await setDoc(doc(db, "users", uid), {
        name,
        email,
        role: "frontend",
        dni: "",
        address: "",
        phone: "",
        createdAt: new Date(),
    });

    await fbUpdateProfile(cred.user, { displayName: name });
    return cred.user;
    };

  // Login con Email/Password
    const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    };

  // Login con Google
    const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Si es la primera vez, crea documento en Firestore
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        await setDoc(ref, {
        name: user.displayName || "",
        email: user.email,
        role: "frontend",
        dni: "",
        address: "",
        phone: "",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        });
    }
    };

  // Actualiza perfil (solo Firestore)
    const updateProfile = async (patch) => {
        if (!user?.uid) return;
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, patch);
        setUser((prev) => ({ ...prev, ...patch }));
    };

  //  Logout
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

  // Contador de materias (local temporalmente)
    const enrolledCount = useMemo(
    () => (user?.email ? getEnrolled(user.email).length : 0),
    [user]
    );

    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        enrolledCount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
