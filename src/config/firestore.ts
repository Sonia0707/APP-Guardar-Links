import fb from './firebase';
import 'firebase/firestore';

export const db = fb.firestore();

//Exportamos el firestore para guardar colecciones, guardar datos.. etc
export default db;
