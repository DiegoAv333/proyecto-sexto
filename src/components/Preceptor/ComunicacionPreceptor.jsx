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
