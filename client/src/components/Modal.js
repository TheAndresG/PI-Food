import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearMensajeState } from '../store/acctions';
import "../css/modal.css"

const Modal = () => {
    const dispatch = useDispatch()
    let mensajeState = useSelector((state) => state.mensaje)
    let onClickButton = (e) => {
        e.preventDefault();
        dispatch(crearMensajeState(""))
    }
    return (
        <div className='modal'>

            <div className='modal-contenido'>
                <h1>Mensaje del Servidor</h1>
                <p>{mensajeState}</p>
                <p></p>
                <button onClick={onClickButton}>OK!</button>
            </div>
        </div>
    );
}

export default Modal;