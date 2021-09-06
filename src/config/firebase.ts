import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import config from "./config";

// Creamos el objeto Firebase y le pasamos a la configuracion inicial:
const Firebase = firebase.initializeApp(config.firebase);

// Exportamos nuestros proveedores para cualquier inicio de sesión en las redes sociales:
// - En este caso solo usaremos la de google 
export const Providers = {
    //Clave y eso sera == A (firebase.auth) => El proveedor de Autentificación de Google y para otras redes sociales
    // se aria lo mismo pero en este caso solo estamos uilizando Google
    google: new firebase.auth.GoogleAuthProvider()
}

// Por ultimo exportara obejeto de autotencicación que es igual a la funcion firebase off, vamos a usar esta variable en concreto,
// en todos nuestros comandos de base de firebase.
export const auth = firebase.auth();

// Por ultimo exportamos el objeto:
export default Firebase;

