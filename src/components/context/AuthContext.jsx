// src/components/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Redirección según rol
  const redirectByRole = (role) => {
    if (role === "preceptor") navigate("/preceptor");
    else if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // 🔹 Crear usuarios semilla (admin + preceptor)
  const seedDefaultUsers = async () => {
    const defaultUsers = [
      {
        email: "admin@gmail.com",
        name: "Administrador",
        role: "admin",
        password: "123456",
      },
      {
        email: "preceptor@gmail.com",
        name: "Preceptor de Prueba",
        role: "preceptor",
        password: "123456",
      },
    ];

    for (const u of defaultUsers) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, u.email);
        let userAuth;

        // 🔸 Crear en Auth si no existe
        if (methods.length === 0) {
          const cred = await createUserWithEmailAndPassword(auth, u.email, u.password);
          userAuth = cred.user;
          console.log(`✅ Usuario Auth creado: ${u.email}`);
        } else {
          console.log(`ℹ️ Usuario Auth ya existente: ${u.email}`);
        }

        // 🔸 Crear en Firestore si no existe
        const uid = userAuth ? userAuth.uid : u.email;
        const userRef = doc(db, "usuarios", uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
            uid,
            email: u.email,
            name: u.name,
            role: u.role,
            createdAt: serverTimestamp(),
          });
          console.log(`✅ Usuario Firestore agregado: ${u.email}`);
        } else {
          console.log(`ℹ️ Usuario Firestore ya existente: ${u.email}`);
        }
      } catch (err) {
        console.error(`❌ Error creando seed ${u.email}:`, err.message);
      }
    }
  };

  // 🔹 Escucha global de sesión
  useEffect(() => {
    const init = async () => {
      await seedDefaultUsers(); // crea semillas antes de escuchar sesión

      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const ref = doc(db, "usuarios", firebaseUser.uid);
          const snap = await getDoc(ref);

          let userData;
          if (snap.exists()) {
            userData = { uid: firebaseUser.uid, ...snap.data() };
          } else {
            // crea por defecto si no existe
            userData = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
              email: firebaseUser.email,
              role: "alumno",
              createdAt: serverTimestamp(),
            };
            await setDoc(ref, userData);
          }

          setUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem("currentUser");
        }

        setLoading(false);
      });

      return unsubscribe;
    };

    init();
  }, []);

  // 🔹 Registro nuevo (alumno)
  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = {
      uid: cred.user.uid,
      name,
      email,
      role: "alumno",
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "usuarios", cred.user.uid), newUser);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    redirectByRole(newUser.role);
  };

  // 🔹 Login con email/contraseña
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const ref = doc(db, "usuarios", cred.user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const userData = { uid: cred.user.uid, ...snap.data() };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      redirectByRole(userData.role);
    } else {
      throw new Error("Usuario no encontrado en la base de datos.");
    }
  };

  // 🔹 Login con Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    const ref = doc(db, "usuarios", firebaseUser.uid);
    const snap = await getDoc(ref);

    let userData;
    if (!snap.exists()) {
      userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        role: "alumno",
        createdAt: serverTimestamp(),
      };
      await setDoc(ref, userData);
    } else {
      userData = { uid: firebaseUser.uid, ...snap.data() };
    }

    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    redirectByRole(userData.role);
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const value = { user, loading, register, login, loginWithGoogle, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
