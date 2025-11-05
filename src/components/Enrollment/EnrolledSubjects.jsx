import anim from "../../styles/animations.module.css";
import { useEnrollment } from "../context/EnrollmentContext";
import Toast from "../Toast";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EnrolledSubjects() {
  const { enrolled, cancel } = useEnrollment();
  const [toast, setToast] = useState("");
  const [subjectToCancel, setSubjectToCancel] = useState(null);
  const navigate = useNavigate();

  const openDialog = (subject) => setSubjectToCancel(subject);
  const closeDialog = () => setSubjectToCancel(null);

  const confirmCancel = () => {
    if (!subjectToCancel) return;
    cancel(subjectToCancel.id);
    setToast(`Inscripción a "${subjectToCancel.name}" cancelada exitosamente`);
  };

  return (
    <section className={`max-w-4xl mx-auto px-4 py-8 ${anim.fadeIn}`} aria-labelledby="mysubj-title">
      {/* Header con botón SIEMPRE visible */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-strong-blue hover:underline mb-4"
            >
              ← Volver al inicio
            </button>
            <h1 id="mysubj-title" className="text-3xl font-bold text-dark-gray mb-2">
              Mis Materias
            </h1>
            <p className="text-gray-600">Materias en las que estás inscripto</p>
          </div>

          <div className="mt-1">
            <button
              type="button"
              onClick={() => navigate("/enrollment")}
              className="border-2 border-strong-blue text-strong-blue px-5 py-2 rounded-xl font-medium hover:bg-strong-blue hover:text-white"
              aria-label="Ir a inscripción de materias"
            >
              Inscribirme a materias
            </button>
          </div>
        </div>
      </header>

      {/* Banner si NO hay materias inscriptas */}
      {enrolled.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-100 grid place-items-center shrink-0">
              <span aria-hidden>ℹ️</span>
            </div>
            <div>
              <p className="font-semibold">Todavía no estás inscripto en ninguna materia.</p>
              <p className="text-yellow-700">Podés inscribirte ahora mismo desde la sección de Inscripción a Materias.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/enrollment")}
            className="self-start md:self-auto border-2 border-strong-blue text-strong-blue px-5 py-2 rounded-xl font-medium hover:bg-strong-blue hover:text-white"
          >
            Inscribirme ahora
          </button>
        </div>
      )}

      {/* Lista de materias inscriptas */}
      {enrolled.length > 0 && (
        <ul className="space-y-4">
          {enrolled.map((s) => (
            <li key={s.id} className={`bg-white rounded-2xl shadow-lg p-6 ${anim.slideIn}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-2">{s.name}</h3>
                  <p className="text-gray-600">Día(s): {s.day}</p>
                  <p className="text-gray-600 mb-1">⏰ Hora: {s.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Inscripto
                  </span>
                  <button
                    type="button"
                    onClick={() => openDialog(s)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Botón flotante fijo (solo móvil) para ir a Inscribirme */}
      <button
        type="button"
        onClick={() => navigate("/enrollment")}
        className="md:hidden fixed bottom-4 right-4 z-40 px-5 py-3 rounded-full shadow-lg bg-strong-blue text-white font-medium"
        aria-label="Ir a inscripción de materias"
      >
        Inscribirme
      </button>

      {/* Toast de éxito */}
      {toast && <Toast message={toast} onDone={() => setToast("")} />}

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={!!subjectToCancel}
        title="Cancelar inscripción"
        message={
          subjectToCancel
            ? `¿Querés cancelar la inscripción a “${subjectToCancel.name}”?`
            : ""
        }
        confirmText="Sí, cancelar"
        cancelText="Volver"
        onConfirm={confirmCancel}
        onClose={closeDialog}
      />
    </section>
  );
}