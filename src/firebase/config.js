// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Opcional: Inicializar Analytics si es necesario
try {
  getAnalytics(app);
} catch (e) {
  // Opcional: manejar el error o ignorar en desarrollo
}