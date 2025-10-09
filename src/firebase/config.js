// src/components/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCTCu29so1IdO78La6H4D_hmOgvXk1O5Ws",
  authDomain: "proyecto-sexto-4047c.firebaseapp.com",
  projectId: "proyecto-sexto-4047c",
  storageBucket: "proyecto-sexto-4047c.firebasestorage.app",
  messagingSenderId: "796233521130",
  appId: "1:796233521130:web:4456397667c44cf7eb4493",
  measurementId: "G-BYHCKLRSV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

try {
  getAnalytics(app);
} catch (e) {
  // Ignorar si falla 
}

export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((e) => {
  console.warn("No se pudo habilitar persistencia:", e.code || e.message);
});