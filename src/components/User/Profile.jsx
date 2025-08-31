import form from "../styles/Form.module.css";
import anim from "../styles/animations.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  // modo: "view" | "edit"
  const [mode, setMode] = useState("view");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const d = new FormData(e.currentTarget);

    // Seguridad: contraseña actual obligatoria para guardar
    const currentPassword = d.get("currentPassword")?.toString() || "";
    if (currentPassword !== (user?.password || "")) {
      setErr("La contraseña actual no es correcta.");
      return;
    }

    const next = {
      name: d.get("name")?.toString().trim(),
      email: d.get("email")?.toString().trim(),
      dni: d.get("dni")?.toString().trim(),
      address: d.get("address")?.toString().trim(),
      phone: d.get("phone")?.toString().trim(),
    };

    const newPasswordRaw = d.get("newPassword")?.toString() || "";
    const confirmRaw = d.get("confirmPassword")?.toString() || "";
    if (newPasswordRaw || confirmRaw) {
      if (newPasswordRaw.length < 6) {
        setErr("La nueva contraseña debe tener al menos 6 caracteres.");
        return;
      }
      if (newPasswordRaw !== confirmRaw) {
        setErr("La confirmación de contraseña no coincide.");
        return;
      }
      next.password = newPasswordRaw;
    }

    updateProfile(next);
    setOk(true);
    setMode("view");
    setTimeout(() => setOk(false), 2500);
  };

  return (
    <section className={`max-w-3xl mx-auto px-4 py-8 ${anim.fadeIn}`} aria-labelledby="profile-title">
      <header className="mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-strong-blue hover:underline mb-4"
        >
          ← Volver al Dashboard
        </button>
        <h1 id="profile-title" className="text-3xl font-bold text-dark-gray mb-2">
          Mi Perfil
        </h1>
        <p className="text-gray-600">Datos personales y configuración de cuenta</p>
      </header>

      {/* Card de vista (modo lectura) */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-dark-gray mb-1">Información personal</h2>
            <p className="text-gray-600">Revisá tus datos. Para modificarlos, usá “Editar perfil”.</p>
          </div>
          {mode === "view" && (
            <button
              type="button"
              onClick={() => setMode("edit")}
              className="border-2 border-strong-blue text-strong-blue px-4 py-2 rounded-xl font-medium hover:bg-strong-blue hover:text-white"
            >
              Editar perfil
            </button>
          )}
        </div>

        {/* Datos en formato de tabla simple */}
        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt className="text-gray-500">Nombre completo</dt>
            <dd className="text-dark-gray font-medium">{user?.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="text-dark-gray font-medium break-all">{user?.email || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">DNI</dt>
            <dd className="text-dark-gray font-medium">{user?.dni || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Teléfono</dt>
            <dd className="text-dark-gray font-medium">{user?.phone || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500">Dirección</dt>
            <dd className="text-dark-gray font-medium">{user?.address || "—"}</dd>
          </div>
        </dl>
      </div>

      {/* Aviso de éxito */}
      <div
        role="status"
        aria-live="polite"
        className={`${ok ? "block" : "hidden"} mb-6 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl text-sm`}
      >
        Perfil actualizado exitosamente
      </div>

      {/* Formulario de edición (solo si mode === "edit") */}
      {mode === "edit" && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={onSubmit} noValidate aria-describedby={err ? "profile-error" : undefined}>
            <fieldset className="space-y-6">
              <legend className="sr-only">Editar perfil</legend>

              {/* Seguridad: contraseña actual requerida */}
              <div className={form.field}>
                <label htmlFor="currentPassword" className={form.label}>
                  Contraseña actual (obligatoria para guardar)
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  className={form.input}
                  placeholder="••••••••"
                />
                <p className={form.help}>Por seguridad, necesitás ingresar tu contraseña actual.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className={form.field}>
                  <label htmlFor="name" className={form.label}>Nombre completo</label>
                  <input id="name" name="name" defaultValue={user?.name || ""} required className={form.input} />
                </div>

                <div className={form.field}>
                  <label htmlFor="dni" className={form.label}>DNI</label>
                  <input id="dni" name="dni" defaultValue={user?.dni || ""} className={form.input} placeholder="Ej: 40.123.456" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className={form.field}>
                  <label htmlFor="email" className={form.label}>Email</label>
                  <input id="email" name="email" type="email" defaultValue={user?.email || ""} required className={form.input} />
                </div>

                <div className={form.field}>
                  <label htmlFor="phone" className={form.label}>Teléfono</label>
                  <input id="phone" name="phone" defaultValue={user?.phone || ""} className={form.input} placeholder="Ej: +54 9 11 5555-5555" />
                </div>
              </div>

              <div className={form.field}>
                <label htmlFor="address" className={form.label}>Dirección</label>
                <input id="address" name="address" defaultValue={user?.address || ""} className={form.input} placeholder="Calle 123, Piso, Depto, Ciudad" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className={form.field}>
                  <label htmlFor="newPassword" className={form.label}>Nueva contraseña (opcional)</label>
                  <input id="newPassword" name="newPassword" type="password" className={form.input} placeholder="••••••••" />
                  <p className={form.help}>Dejar vacío para mantener la actual.</p>
                </div>

                <div className={form.field}>
                  <label htmlFor="confirmPassword" className={form.label}>Confirmar nueva contraseña</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" className={form.input} placeholder="••••••••" />
                </div>
              </div>
            </fieldset>

            {/* Errores */}
            <div
              role="alert"
              id="profile-error"
              aria-live="assertive"
              className={`${form.error} ${err ? "" : "hidden"}`}
            >
              {err}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => { setMode("view"); setErr(""); }}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-strong-blue text-white font-medium hover:bg-blue-700"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
