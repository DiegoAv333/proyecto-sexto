import form from "../styles/Form.module.css";
import anim from "../styles/animations.module.css";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [err, setErr] = useState("");
  const [role, setRole] = useState("alumno"); // 👈 Rol por defecto
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setErr("");

    const d = new FormData(evt.currentTarget);
    const name = d.get("name")?.toString().trim();
    const email = d.get("email")?.toString().trim();
    const password = d.get("password")?.toString();
    const confirm = d.get("confirm")?.toString();

    // Validaciones básicas
    if (!name || !email || !password || !confirm) return setErr("Completá todos los campos.");
    if (name.length < 3) return setErr("El nombre debe tener al menos 3 caracteres.");
    if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email)) return setErr("El email no tiene un formato válido.");
    if (password.length < 6) return setErr("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirm) return setErr("Las contraseñas no coinciden.");

    try {
      setSubmitting(true);
      await register(name, email, password, role); // 👈 Pasa el rol seleccionado
    } catch (errObj) {
      console.error("Auth error (register):", errObj.code, errObj.message);
      setErr(
        errObj.code === "auth/email-already-in-use"
          ? "Ya existe una cuenta con este email."
          : "Error al registrarse. Intentá nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`${anim.fadeIn} px-4`} aria-labelledby="register-title">
      <div className="min-h-[80vh] grid place-items-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 id="register-title" className="text-3xl font-bold text-dark-gray text-center mb-6">
            Crear cuenta
          </h1>

          <form onSubmit={onSubmit} noValidate aria-describedby={err ? "register-error" : undefined}>
            <div className="space-y-4">
              <div className={form.field}>
                <label htmlFor="register-name" className={form.label}>
                  Nombre completo
                </label>
                <input id="register-name" name="name" type="text" required className={form.input} placeholder="Juan Pérez" />
              </div>

              <div className={form.field}>
                <label htmlFor="register-email" className={form.label}>
                  Email
                </label>
                <input id="register-email" name="email" type="email" required className={form.input} placeholder="tu@email.com" />
              </div>

              <div className={form.field}>
                <label htmlFor="register-password" className={form.label}>
                  Contraseña
                </label>
                <input id="register-password" name="password" type="password" required className={form.input} placeholder="Contraseña" />
              </div>

              <div className={form.field}>
                <label htmlFor="register-confirm" className={form.label}>
                  Confirmar contraseña
                </label>
                <input id="register-confirm" name="confirm" type="password" required className={form.input} placeholder="Confirmar contraseña" />
              </div>
            </div>

            {err && (
              <div role="alert" id="register-error" className={`${form.error} mt-4`}>
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-6 bg-strong-blue text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Registrando..." : "Registrarme"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tenés cuenta?{" "}
              <button onClick={() => navigate("/login")} className="text-strong-blue hover:underline font-medium">
                Iniciá sesión
              </button>
            </p>
            <button onClick={() => navigate("/")} className="mt-2 text-gray-500 hover:text-dark-gray">
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
