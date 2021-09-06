import React, { useEffect, useState } from "react";
import LinksForm from "./LinkForm";

import Firebase  from "../../config/firebase";
//Importamos toast para mensajes dinamicos (instalamos librería => npm install --save react-toastify)
import { toast } from "react-toastify";

const Links = () => {
//Creamos el useState con su estado inicial de los (links) y su cambio posterior (setLinks):
  const [links, setLinks] = useState([]);
  //Creamos el useState con su estado inicial de los (currentId) y su cambio posterior (setCurrentId):
  const [currentId, setCurrentId] = useState("");

  //Hacemos la consulta para traernos todos los links de firebase. Es de manera asincrona asi que tenemos que usar async.
  //Con onSnapshot hacemos que al renderizar aparaezca al instate.
  const getLinks = async () => {
    Firebase.firestore.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  //Borramos los datos facilmente con el delete() Mandamos un mensaje de si esta seguro de borrar los datos.
  // Y creamos un toast para mandar un mensaje dimamico diciendo que lo hemos borrado
  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await Firebase.firestore.collection("links").doc(id).delete();
      toast("Link Removed Successfully", {
        type: "error", // error => color rojo
        autoClose: 2000 // El mensaje se autocierra pasado 2 segundos 
      });
    }
  };

  //Con el useEffect cada vez que renderice la página llamará al getLinks() y este traerá los datos.
  useEffect(() => {
    getLinks();
  }, []);

  // 2 OPCIONES:
  // 1. Añadimos los datos a la colección de firbase seteando el linkObject y creamos otro mensaje dimamico para que se vea.
  // 2. Actualizamos los datos a la colección de firbase haciendo un update el linkObject y creamos otro mensaje dimamico para que se vea.
  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await Firebase.firestore.collection("links").doc().set(linkObject);
        toast("New Link Added", {
          type: "success", // success => color verde
          autoClose: 2000 // El mensaje se autocierra pasado 2 segundos 
        });
      } else {
        await Firebase.firestore.collection("links").doc(currentId).update(linkObject);
        toast("Link Updated Successfully", {
          type: "info", // info => color azul
          autoClose: 2000 // El mensaje se autocierra pasado 2 segundos 
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
      <LinksForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger" style={{ cursor: "pointer" }}
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons " style={{ cursor: "pointer" }}
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Website</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;