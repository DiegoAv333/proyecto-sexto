1  import { useState } from "react";
2  import { usePreceptor } from "../context/PreceptorContext";
3  import { useNavigate } from "react-router-dom"; // Agregar esta línea
4
5  export default function ComunicacionPreceptor() {
6    const { mensajes, agregarMensaje, eliminarMensaje } = usePreceptor();
7    const [nuevoMensaje, setNuevoMensaje] = useState("");
8    const navigate = useNavigate(); // Agregar esta línea
9
10   const handleSubmit = (e) => {
11     e.preventDefault();
12     if (!nuevoMensaje.trim()) return;
13     agregarMensaje({ id: Date.now(), remitente: "Preceptor", texto: nuevoMensaje });
14     setNuevoMensaje("");
15   };
16   return (
17   <section className="max-w-4xl mx-auto px-4 py-8" aria-labelledby="mysubj-title">
18         <header className="mb-8 flex items-center justify-between">
19           <button
20             type="button"
21             onClick={() => navigate("/dashboard")}
22             className="text-strong-blue hover:underline"
23           >
24             ← Volver al inicio
25           </button>
26         </header>      <h2 className="text-2xl font-bold mb-4 text-dark-gray">Comunicación</h2>
27
28         <form onSubmit={handleSubmit} className="mb-4">
29           <textarea
30             value={nuevoMensaje}
31             onChange={(e) => setNuevoMensaje(e.target.value)}
32             placeholder="Escribe un mensaje..."
33             className="w-full p-2 border rounded"
34           ></textarea>
35           <button
36             type="submit"
37             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
38           >
39             Enviar Mensaje
40           </button>
41         </form>
42         <ul className="space-y-2">
43           {mensajes.map((m) => (
44             <li
45               key={m.id}
46               className="border p-3 rounded flex justify-between items-center bg-gray-50"
47             >
48               <span>
49                 <strong>{m.remitente}:</strong> {m.texto}
50               </span>
51               <button
52                 onClick={() => eliminarMensaje(m.id)}
53                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
54               >
55                 Eliminar
56               </button>
57             </li>
58           ))}
59         </ul>
60       </section>
61     );
62   }

