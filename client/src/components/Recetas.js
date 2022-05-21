import React from 'react';
import Receta from './Receta';
import "../css/recetas.css"
import gif from "../components/assets/cargaPNG.gif"
import nocarga from "../components/assets/NOcarga.png"


const Recetas = ({ recetas, carga, indexInicial, indexFinal }) => {

    let recetasAMostrar = recetas.slice(indexInicial, indexFinal)
    recetasAMostrar.map((e) => e.diets.length !== 0 ? null : e.diets.push("Sin Dietas"))

    if (carga === false && recetasAMostrar.length === 0) return (<div className='temporalcont'><h3 className='temporal'>No Hay Recetas</h3><img src={nocarga} /> </div>)
    return (carga === true ? (<div className='temporalcont'><h3 className='temporal'>Cargando...</h3>   <img src={gif} /> </div>) :
        <ul className='cards'>{recetasAMostrar.map(receta => (<Receta key={receta.id} id={receta.id} title={receta.title} image={receta.image} spoonacularScore={receta.spoonacularScore} healthScore={receta.healthScore} diets={receta.diets} />))} </ul>)
}



export default Recetas;