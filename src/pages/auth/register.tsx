import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    // Variables:
    // registering == será booleana y su estado por defeto sera false:
    const [registering, setRegistering] = useState<boolean>(false);
    // Las demás serán string y son las que necesitaremos para el registro:
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    // history = A la devolución de la llamada del historial de uso de (react-router-dom), esto nos permitirá cambiar a la página con el comando en lugar
    // de devolver una redirección:
    const history = useHistory();

    // Función de registro: (Constante con correo electronico y contraseña) No es asincrónica
    const signUpWithEmailAndPassword = () => {

        // Las contraseñas no coinciden:
        if (password !== confirm)
        {
            setError('Please make sure your passwords match.');
            return;
        }

        // Establecer el error en vacío para que no aparezcan de nuevo 
        if (error !== '') setError('');

        // Registro igual a verdadero ( si email y contraseña estan bien).
        setRegistering(true);

        // Importamos auth y hacemos una autentificación con el email y la password
        auth.createUserWithEmailAndPassword(email, password)
        // Devolvemos un bloque de then 
        .then(result => {
            // En el login le añadimos al history el resultado para iniciar la sesion 
            // (Si hay exito esto nos redirigira a la página de inicio directamente)
            logging.info(result);
            history.push('/login');
        })
        .catch(error => {
            // Error si no nos redirige
            logging.error(error);

            //Miramos los tipos de errores:
            if (error.code.includes('auth/weak-password'))
            {
                //Contraseña debil:
                setError('Please enter a stronger password.');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                // El correo ya esta en uso:
                setError('Email already in use.');
            }
            else
            {
                // Error del sistema (base de datos, etc...)
                setError('Unable to register.  Please try again later.')
            }

            // Si da false nos devolverá directamente a la página de inicio:
            setRegistering(false);
        });
    }

    return (
        // LLamamos al contenedor creado para los diferentes componentes y le pasamo el header de registro:
        // Cremaos FormGroup, Input, Button de => reactstrap. Y le añadimos el evento onChange a cada uno para que lo guarde si cambie el estado
        // en cada useState
        <AuthContainer header="Register">
            <FormGroup>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                 {/** El autocompletado es para que coincidan contrseñas*/}
                <Input 
               
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
             {/**Boton de registro que llama a la función signUpWithEmailAndPassword */}
            <Button
                disabled={registering}
                color="success"
                block
                onClick={() => signUpWithEmailAndPassword()}
            >
                Sign Up
            </Button>
             {/**Enlace al login*/}
            <small>
                <p className='m-1 text-center'>Already have an account? <Link to="/login">Login.</Link></p>
            </small>
             {/** Mostrar cualquier texto de error en orden Componente => Error  */}
            <ErrorText error={error} />
        </AuthContainer>
    );
}

export default RegisterPage;