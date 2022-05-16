import React from 'react';

const Paginador = ({ maxPagina, totalRecetas, pagina }) => {
    const numeroPaginas = []

    for (let i = 1; i <= Math.ceil(totalRecetas / maxPagina); i++) {
        numeroPaginas.push(i)
    }
    return (
        <div>
            <ul>
                {numeroPaginas.map(numero => (
                    <li key={numero}><p onClick={() => pagina(numero)} href=''>{numero}</p></li>
                ))}
            </ul>
        </div>
    );
}

export default Paginador;