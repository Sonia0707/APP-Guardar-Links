import React from 'react';
// Este componente es para todos los textos de errores que se produzcan, y será utilizado en todas las páginas de autotentificación.

// Aquí cambiare todas las veces el mensaje que me llegue:
export interface IErrorTextProps {
    error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = props => {
    const { error } = props;

    //Verificación rápida => Si mi error viene vacio que sea igual a null que no se pinte
    if (error === '') return null;

    // Agrego mis accesorios para que sea pequeño y aparezca en rojo
    return (
        <small className="text-danger">
            {error}
        </small>
    );
}

export default ErrorText;