import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearMensajeState } from '../store/acctions';
import "../css/modal.css"

const Modal = () => {
    const dispatch = useDispatch()
    let mensajeState = useSelector((state) => state.mensaje)
    console.log(mensajeState);
    let onClickButton = (e) => {
        e.preventDefault();
        dispatch(crearMensajeState(""))
    }
    return (
        <div className='modal'>

            <div className='modal-contenido'>
                <h1>Server Message</h1>
                <p>{mensajeState}</p>

                <button onClick={onClickButton}>OK!</button>
            </div>
        </div>
    );
}

export default Modal;