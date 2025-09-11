//Creando coleccion subjects  (materias)
import { query, orderBy, collection, getDocs } from "firebase/firestore";
    const col = collection(db, "profesores");
    const snap = await getDocs(col);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data()}));
    console.log(data);

    const q = query(col, orderBy("nombre", "asc")); //asc=ascendente - desc= descendente
    snap = await getDocs(q);

///suscribirse a un doc
function listenById(id, cb, errCb){ //escucho el id ,existe?
    const ref = doc(db, "profesores", id); 
    return onSnapshot(ref, (d)=>{
    cb(d.exists() ? {id: d.id, ...d.data()}:null);
}, errCb);
}