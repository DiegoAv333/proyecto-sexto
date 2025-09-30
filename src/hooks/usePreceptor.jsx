import {collection, addDoc, setDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, where, limit,
startAfter, getDocs, serverTimestamp, arrayUnion, arrayRemove, writeBatch, runTransaction,increment } 
from "firebase/firestore";

const col = collection (db, "preceptores");
const snap = await getDocs(col);
const data = snap.docs.map(d=> ({id: d.id, ... d.data()}));

const q = query (col, orderBy("nombre","asc"));
snap = await getDocs(q);

const n = query (col, orderBy("create","2025"));
snap = await getDocs(n);

const a = query (col, orderBy("apellido","desc"));
snap = await getDocs(a);
console.log(data); 

//SUSCRIBIRSE A UN DOC
function listenById(id, cb, errCb){
    const ref= doc(db, "profesores", id);
    return onSnapshot(ref, (d) => {
        cb(d.exists() ? { id: d.id, ...d.data()}:null);
    }, errCb);
}