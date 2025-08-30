export default function SubjectCard({ subject, disabled, checked, onToggle }) {
  return (
    <div
      className={`border-2 rounded-xl p-4 transition-all ${disabled ? "border-gray-300 bg-gray-50 opacity-60" : "border-gray-200 hover:border-strong-blue"}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-dark-gray">{subject.name}</h4>
        <input
          aria-label={`Seleccionar ${subject.name}`}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onToggle}
          className="w-5 h-5 text-strong-blue rounded focus:ring-strong-blue"
        />
      </div>
      <p className="text-sm text-gray-600 mb-1">{subject.schedule}</p>
      <p className="text-sm text-gray-500">{subject.credits} créditos</p>
      {disabled && <p className="text-xs text-green-600 mt-2 font-medium">Ya inscripto</p>}
    </div>
  );
}