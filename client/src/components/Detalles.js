import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { pedirUnaReceta } from '../store/acctions';
const Detalles = () => {
    const params = useParams()
    const dispatch = useDispatch()
    let receta = useSelector((state) => state.detailReceta)
    const [carga, setCarga] = useState(true)

    useEffect(() => {
        dispatch(pedirUnaReceta(params.id))
        setTimeout(() => { setCarga(false) }, 1000)
    }, [dispatch, params])
    return (
        <Fragment>
            {carga ? <div>CARGANDO...</div> : <div>
                <p>{receta.title}</p>
                <img src={receta.image} alt="Imagen"></img>
                <div>
                    <label>Resumen:</label> <p>{receta.summary}</p>
                </div>
                <div>
                    <label>healthScore:</label> <b>{receta.healthScore}</b>
                    <p></p>

                    <label>spoonacularScore:</label> <b>{receta.spoonacularScore}</b>
                    <p></p>
                </div>
                <label>Dietas: </label>{receta.diets.map((e) => <b key={e}>-{e.toUpperCase()}-</b>)}

                <div>
                    <label>Instruciones:</label> <p>{receta.instructions}</p>
                </div>
            </div>
            }</Fragment>
    );
}

export default Detalles;