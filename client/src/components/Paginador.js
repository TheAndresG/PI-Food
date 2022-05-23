import React from 'react';
import "../css/paginador.css"

const Paginador = ({ maxPagina, totalRecetas, pagina, paginaActual }) => {
    const numeroPaginas = []




    for (let i = 1; i <= Math.ceil(totalRecetas / maxPagina); i++) {
        numeroPaginas.push(i)
    }
    if (numeroPaginas.length === 1 || numeroPaginas.length === 0) { return null }

    return (
        <div>
            <ul className='pagination'>
                {paginaActual !== 1 ? <div className='lista' onClick={() => pagina(paginaActual - 1)}> Back</div> : null}
                {numeroPaginas.map(numero => (
                    <li className='lista' key={numero}><div onClick={() => pagina(numero)} href=''>{numero}</div></li>
                ))}
                {paginaActual !== maxPagina ? <div className='lista' onClick={() => pagina(paginaActual + 1)}>Next</div> : null}
            </ul>
        </div >



    );
}


export default Paginador;