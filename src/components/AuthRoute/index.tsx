import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';

export interface IAuthRouteProps { }

//Definimos ruta de autotenticación: 
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        //Llamamos al componente definido en Firebase de autotentificación y vamos a llamar al  auth.currentUser pero con la negación si el usuario,
        // no ha iniciado sesión en eeste momento dentro del objeto de la base, 
        //vamos a seguir adelante y simplemente redirigir a la página de inicio de sesión usando el componente de redireccion de (react-router-dom)
        return <Redirect to="/login" />;
    }

    //Todas las props
    return (
        <div>{children}</div>
    );
}

export default AuthRoute;