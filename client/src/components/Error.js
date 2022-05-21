import React from 'react';

const Error = ({ mensaje }) => {
    return (
        <p className='Error'>
            {mensaje}
        </p>
    );
}

export default Error;