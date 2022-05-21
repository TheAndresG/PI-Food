import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { pedirUnaReceta } from '../store/acctions';
import "../css/detalles.css"
const Detalles = () => {
    const params = useParams()
    const dispatch = useDispatch()
    let receta = useSelector((state) => state.detailReceta)
    const [carga, setCarga] = useState(true)

    useEffect(() => {

        dispatch(pedirUnaReceta(params.id))

        setTimeout(() => { setCarga(false) }, 1000)
    }, [])
    return (
        <Fragment>
            {carga ? <div>CARGANDO...</div> : <div className='contenedorDetalles'>
                <h1>{receta.title}</h1>
                <img className='image' src={receta.image} alt="Imagen"></img>
                <div className='bordes'>
                    <h3>Resumen:</h3> <p dangerouslySetInnerHTML={{ __html: receta.summary }} />
                </div>
                <div className='contenedores'>
                    <h3>healthScore:</h3> <b>{receta.healthScore}</b>
                    <p></p>

                    <h3>spoonacularScore:</h3> <b>{receta.spoonacularScore}</b>
                    <p></p>
                </div>
                <b>Dietas: </b>{receta.diets.length !== 0 ? receta.diets.map((e) => <p key={e}>-{e.toUpperCase()}-</p>) : <p>Sin Dietas</p>}

                <div className='contenedores'>
                    <h3>Instruciones:</h3> <p dangerouslySetInnerHTML={{ __html: receta.instructions }} />
                </div>
                {/* <h3>dishTypes: </h3>{receta.dishTypes.map((e) => <p key={e}>-{e.toUpperCase()}-</p>)} */}
            </div>
            }</Fragment>
    );
}

export default Detalles;