import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../interfaces/page';
import Links from './auth/Links';

//Página de inicio protegida:
const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <Container>
            <Card>
                <CardBody>
             
                    <p>
                        Welcome to this page that is protected by Friebase auth!
                    </p>
                    <p>
                        Change your password <Link to="/change">here</Link>.
                    </p>
                    <p>
                        {/**Creamos pequeño enlace para cambiar contraseña si queremos una vez dentro de home nos redirige a la page de cambio*/}
                        Click <Link to='/logout'>here</Link> to logout.
                    </p>
                    <p>Prueba de concepto:</p>
                    <div>
                        <Links/> 
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;