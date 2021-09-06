import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from './components/AuthRoute';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';

export interface IApplicationProps { }

//Archivo para definir las rutas (Página INICIAL)
const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    //Comprobacion si el usuario pertenece a la base de datos con el auth de firebase:
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />

    return (
        <div>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            //(Hay que asegurarse de que las rutas protegidas tengan el componente de autotencicación)
                            //(Devuelvo mi componente raiz con la comprobación hecha pasandole mi componente AuthRoute )
                            if (route.protected)
                                return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                            return <route.component  {...routeProps} />;
                        }}
                    />)}
            </Switch>
        </div>
    );
}

export default Application;