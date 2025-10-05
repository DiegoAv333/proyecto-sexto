import form from "../styles/Form.module.css";
import anim from "../styles/animations.module.css";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const d = new FormData(e.currentTarget);
    const name = d.get("name")?.toString().trim();
    const email = d.get("email")?.toString().trim();
    const password = d.get("password")?.toString();
    const confirm = d.get("confirm")?.toString();

    // Validaciones del Registro
    if (!name || !email || !password || !confirm) {
      setErr("Por favor completá todos los campos");
      return;
    }
    if (name.length < 3) {
      setErr("El nombre debe tener al menos 3 caracteres");
      return;
    }
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    if (!emailRegex.test(email)) {
      setErr("El email no tiene un formato válido");
      return;
    }
    if (password.length < 6) {
      setErr("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      setErr("Las contraseñas no coinciden");
      return;
    }

    try {
      register(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message || "No se pudo crear la cuenta");
    }
  };

  return (
    <section className={`${anim.fadeIn} px-4`} aria-labelledby="register-title">
      <div className="min-h-[80vh] grid place-items-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-strong-blue rounded-xl grid place-items-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1
              id="register-title"
              className="text-3xl font-bold text-dark-gray"
            >
              Registro
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form
              onSubmit={onSubmit}
              noValidate
              aria-describedby={err ? "register-error" : undefined}
            >
              <div className="space-y-4">

                <div className={form.field}>
                  <label htmlFor="register-name" className={form.label} >
                    Nombre completo
                  </label>
                  <input id="register-name" name="name" type="text" 
                    required className={form.input} placeholder="Juan Pérez" />

                </div>
                <div className={form.field}>
                  <label htmlFor="register-email"className={form.label} >
                    Email
                  </label>
                  <input id="register-email" name="email" type="email" autoComplete="email"
                    required className={form.input} placeholder="tu@email.com" />

                </div>
                <div className={form.field}>
                  <label htmlFor="register-password" className={form.label} >
                    Contraseña
                  </label>
                  <input id="register-password" name="password" type="password" autoComplete="new-password"
                    required className={form.input} placeholder="Contraseña" />
                    
                </div>
                <div className={form.field}>
                  <label htmlFor="register-confirm" className={form.label}  >
                    Confirmar contraseña
                  </label>
                  <input
                    id="register-confirm" name="confirm" type="password" autoComplete="new-password"
                    required className={form.input} placeholder="Confirmar contraseña" />
                </div>

              </div>

              <div role="alert" id="register-error" aria-live="assertive" 
              className={`${form.error} ${err ? "" : "hidden"}`} > {err}
              </div>

              <button type="submit"
                className="w-full mt-6 bg-strong-blue text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700"
              >
                Registrarme
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tenés cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-strong-blue hover:underline font-medium"
                >
                  Iniciá sesión
                </button>
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 text-gray-500 hover:text-dark-gray"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
