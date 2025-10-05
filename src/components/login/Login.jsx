import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");


    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim();
    const password = data.get("password")?.toString();

  /*validacion de email*/
  
    if (!email || !password){
      return setErr("Completá email y contraseña");
    } 

    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    if (!emailRegex.test(email)) {
      return setErr("El email no tiene un formato válido");
    }
    
    if(password.length < 6){
      return setErr("La contraseña debe tener al menos 6 caracteres");
    }
    
    try {
      login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <section className="px-4">
      <div className="min-h-[80vh] grid place-items-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-dark-gray mb-6 text-center">Iniciar sesión</h1>

          <form onSubmit={onSubmit} noValidate aria-describedby={err ? "login-error" : undefined}>
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-dark-gray font-medium mb-1">Email</label>
                <input id="login-email" name="email" type="email" autoComplete="email"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-strong-blue border-gray-300"
                        placeholder="tu@email.com" required />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-dark-gray font-medium mb-1">Contraseña</label>
                <input id="login-password" name="password" type="password" autoComplete="current-password"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-strong-blue border-gray-300"
                          placeholder="••••••••" required />
              </div>
            </div>

            {err && (
              <div role="alert" id="login-error"
                    className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                {err}
              </div>
            )}

            <button type="submit"
                    className="w-full mt-6 bg-strong-blue text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700">
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tenés cuenta?
              <button onClick={() => navigate("/register")}
                      className="ml-1 text-strong-blue hover:underline font-medium">
                Registrate
              </button>
            </p>
            <button onClick={() => navigate("/")}
                    className="mt-2 text-gray-500 hover:text-dark-gray">
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
