import { useEffect, useState } from "react";

export default function Toast({ message, onDone, duration = 3000 }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); onDone?.(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl shadow-lg"
    >
      {message}
    </div>
  );
}
