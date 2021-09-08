import React, {useState, useEffect} from 'react';
//import  Firebase  from "../../config/firebase";
import IPageProps from '../../interfaces/page';
import db  from "../../config/firestore";


//Importamos toast para mensajes dinamicos (instalamos librería => npm install --save react-toastify)
import { toast } from "react-toastify";


const LinkForm: React.FunctionComponent<IPageProps> = props =>{

  //Constantes iniciales 
  const initialStateValues = {
      url:"",
      name:"",
      description:"",
  }
  //Creamos el useState con su estado inicial y su cambio posterior:
 const [values, setValues ] = useState(initialStateValues);

 //Funcion que maneja el cambio de cada input setea las initialStateValues: la propiedad e.target de cada onchange={} de los input
 const handleInputChange = (e: { target: { name: string; value: string; }; }) =>{
  const {name, value} = e.target;
  setValues({...values, [name]: value });
 } 

 //Para validar la URL por ejemplo: Buscar en google => validate url regex javascript
 const validURL = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
 


 //Evento que escucha al enviar el formulario, simplemente para ver que en consola esta funcionando:
  const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      //Utilizamos el validador de de la URL para que la gente ponga bien la URL:
      if (!validURL(values.url)) {
          return toast("invalid url", { 
                      type: "warning", // warning => Color amarillo
                      autoClose: 1000  // Duración un segundo
                  });
 
        }

      // Le pasamos las props al addOrEditLink que esta en el component Links y este lo guardara en la base de datos (FIN DEL ASUNTO....)
     props.addOrEditLink(values);

      //Una vez guardados los datos procedemos a setearlos y de esta manera dejamos limpios los intput:
      setValues({...initialStateValues})
  }

  const getLinkById = async (id: any, ) => {

    const doc = await db.collection("links").doc(id).get();
    
    if (doc.exists) {
     // console.log(doc.id, " => ", doc.data());
      var nomb = [doc.data()?.name];
      var pagina = [doc.data()?.url];
      var descripcion = [doc.data()?.description];
  

    /*  console.log("Nombre del sitio: ",nomb.toString());

      console.log("URL del sito: ",pagina.toString());
      console.log("Breve descripción: ",descripcion.toString());*/

      setValues({ 
        url: pagina.toString(),  
        name: nomb.toString(), 
        description: descripcion.toString(),
  
       });


    }else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  
   
}  

  useEffect(() => {
      if (props.currentId === "") {
        setValues({ ...initialStateValues });
      } else {
        getLinkById(props.currentId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId]);

  return(
      <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input style={{ color: "white" }} type="text" className="form-control" placeholder="https://someurl.xyz" value={values.url} name="url" onChange={handleInputChange}/>
      </div>
      <br/>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input style={{ color: "white" }} type="text" value={values.name} name="name" placeholder="Website Name" className="form-control" onChange={handleInputChange}/>
      </div>
      <br/>
      <div className="form-group">
        <textarea style={{ color: "white" }}  className="form-control" placeholder="Write a Description" name="description" value={values.description} onChange={handleInputChange}/>
      </div>
      <br/>
      <button className="btn btn-primary btn-block">
      {props.currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  )
}

export default LinkForm;

