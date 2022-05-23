import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';
import '../css/nav.css';

const Nav = () => {
    return (
        <Fragment>

            <div className='fondonav'>
                <div className='xxxx'>
                    <img src={logo} alt='' />
                    <b className="divTitulo">PI FOOD</b>
                </div>

                {/* <p> Bienvenido {nombre}</p> */}
                <div className='divBotones'>

                    <Link className='boton' to="/home">Home</Link>


                    <Link className='boton' to="/crear">Create</Link>
                </div>
            </div>
            <div className='borde'></div>
        </Fragment>


    );
}

export default Nav;