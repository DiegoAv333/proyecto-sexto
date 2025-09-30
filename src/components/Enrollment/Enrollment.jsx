import anim from "../../styles/animations.module.css";
import { useEnrollment } from "../context/EnrollmentContext";
import Toast from "../Toast";
import SubjectCard from "../SubjectCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Enrollment() {
  const { subjects, selected, toggleSelect, confirm, isEnrolled } = useEnrollment();
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const selectedCount = selected.length;

  const onConfirm = () => {
    const added = confirm();
    if (added.length) setToast("¡Inscripción confirmada exitosamente!");
  };

  return (
    <section
      className={`max-w-4xl mx-auto px-4 py-8 ${anim.fadeIn}`}
      aria-labelledby="enrollment-title"
    >
      <header className="mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-strong-blue hover:underline mb-4"
        >
          ← Volver al inicio
        </button>
        <h1
          id="enrollment-title"
          className="text-3xl font-bold text-dark-gray mb-2"
        >
          Inscripción a Materias
        </h1>
        <p className="text-gray-600">
          Seleccioná las materias en las que deseas inscribirte
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => (
            <SubjectCard
              key={s.id}
              subject={s}
              disabled={isEnrolled(s.id)}
              checked={selected.includes(s.id)}
              onToggle={() => toggleSelect(s.id)}
            />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-3 md:gap-4 md:items-center md:justify-between">
          <p className="text-dark-gray">
            Materias seleccionadas:{" "}
            <span className="font-bold text-strong-blue">{selectedCount}</span>
          </p>

          <div className="flex gap-3 md:gap-4">
            {/* Nuevo botón: ir a Mis Materias */}
            <button
              type="button"
              onClick={() => navigate("/enrolled")}
              className="border-2 border-strong-blue text-strong-blue px-5 py-2 rounded-xl font-medium hover:bg-strong-blue hover:text-white"
              aria-label="Ver mis materias inscriptas"
            >
              Ver mis materias
            </button>

            <button
              onClick={onConfirm}
              disabled={selectedCount === 0}
              className="bg-strong-blue disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700"
            >
              Confirmar inscripción
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast("")} />}
    </section>
  );
}
