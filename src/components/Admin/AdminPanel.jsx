import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar todos los usuarios desde Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "usuarios"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(list);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // 🔹 Cambiar rol
  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "usuarios", id), { role: newRole });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  // 🔹 Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este usuario?")) return;
    await deleteDoc(doc(db, "usuarios", id));
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading)
    return <p className="text-center text-gray-500">Cargando usuarios...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-dark-gray mb-4">Gestión de Usuarios</h2>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3">Nombre</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{u.name || "—"}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="alumno">Alumno</option>
                  <option value="preceptor">Preceptor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
