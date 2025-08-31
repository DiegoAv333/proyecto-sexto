import { useEffect } from "react";

export default function ConfirmDialog({
  open,
  title = "¿Confirmar acción?",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape" && open) onClose?.(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
        />

      {/* dialog */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 id="confirm-title" className="text-xl font-semibold text-dark-gray mb-2">
            {title}
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
            <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
            {cancelText}
            </button>
            <button
            onClick={() => { onConfirm?.(); onClose?.(); }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
            {confirmText}
            </button>
        </div>
        </div>
    </div>
    );
}
