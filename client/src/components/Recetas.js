import React from 'react';
import Receta from './Receta';


const Recetas = ({ recetas, carga, indexInicial, indexFinal }) => {

    let recetasAMostrar = recetas.slice(indexInicial, indexFinal)
    recetasAMostrar.map((e) => e.diets.length > 0 ? null : e.diets.push("sin dieta"))
    return (carga === true ? (<h1>Cargando...</h1>) :
        <ul>{recetasAMostrar.map(receta => (<Receta key={receta.id} id={receta.id} title={receta.title} image={receta.image} spoonacularScore={receta.spoonacularScore} healthScore={receta.healthScore} diets={receta.diets} />))} </ul>)
}



export default Recetas;