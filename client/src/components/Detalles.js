import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { pedirUnaReceta } from '../store/acctions';
import "../css/detalles.css"
import gif from "../components/assets/cargaPNG.gif"
import nocarga from "../components/assets/NOcarga.png"
const Detalles = () => {
    const params = useParams()
    const dispatch = useDispatch()
    let receta = useSelector((state) => state.detailReceta)
    const [carga, setCarga] = useState(true)
    console.log(receta);
    useEffect(() => {

        dispatch(pedirUnaReceta(params.id))

        setTimeout(() => { setCarga(false) }, 1000)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    if (carga === false && Object.keys(receta).length === 0) {
        return <Fragment>
            <div className='contenedorDetalles'>Don't exist that recipe.</div>
            <img alt='' src={nocarga} />
        </Fragment>
    }
    return (

        <Fragment>
            {carga ? <div className='contenedorDetalles temporalcont'> <div className='temporal'>LOADING...</div>   <img alt='' src={gif} /> </div> : <div className='contenedorDetalles'>
                <h1>{receta.title}</h1>
                <img className='image' src={receta.image} alt="Imagen"></img>
                <div className='bordes'>
                    <h3>Summary:</h3> <p dangerouslySetInnerHTML={{ __html: receta.summary }} />
                </div>
                <div className='contenedores'>
                    <h3>healthScore:</h3> <b>{receta.healthScore}</b>
                    <p></p>

                    <h3>spoonacularScore:</h3> <b>{receta.spoonacularScore}</b>
                    <p></p>
                </div>
                <b>Diets: </b>{receta.diets.length !== 0 ? receta.diets.map((e) => <p key={e}>-{e.toUpperCase()}-</p>) : <p>Sin Dietas</p>}

                <div className='contenedores'>
                    <h3>Instruciones:</h3> <p dangerouslySetInnerHTML={{ __html: receta.instructions }} />
                </div>
                {/* <h3>dishTypes: </h3>{receta.dishTypes.map((e) => <p key={e}>-{e.toUpperCase()}-</p>)} */}
            </div>
            }</Fragment>
    );
}

export default Detalles;