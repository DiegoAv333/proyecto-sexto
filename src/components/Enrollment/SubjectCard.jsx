import { useNavigate } from "react-router-dom";

export default function SubjectCard({ subject, disabled, checked, onToggle }) {
  const navigate = useNavigate();

  return (
    <div
      className={`p-4 rounded-2xl shadow-lg bg-white flex flex-col justify-between ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold mb-1">{subject.name}</h3>
        <p className="text-gray-600 mb-2">{subject.schedule}</p>
        <p className="text-gray-600">Día(s): {subject.day}</p>
        <p className="text-gray-600">Hora: {subject.time}</p>
        <p className="text-gray-600">{subject.credits} créditos</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate(`/materia/${subject.id}`)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ver detalle
        </button>

        {!disabled && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={onToggle}
              className="w-4 h-4 accent-strong-blue"
            />
            <span className="text-sm">Seleccionar</span>
          </label>
        )}

        {disabled && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Inscripto
          </span>
        )}
      </div>
    </div>
  );
}