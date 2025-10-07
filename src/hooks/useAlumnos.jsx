import React from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const col = collection(db,"alumnos");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
console.log(data);

//ordenar por:

col = collection(db, "alumnos");
const q = query(col, orderBy("nombre", "asc"));
snap = await getDocs(q);

