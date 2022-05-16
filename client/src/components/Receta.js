import React from 'react';

const Receta = ({ title, spoonacularScore, id, image, healthScore, diets }) => {
    return (
        <div id={id} key={id}>
            <a href={"/receta/" + id} >{title}</a>
            <img src={image} alt="Foto!"></img>
            <div><b>Puntaje Saludable: </b> {healthScore}</div>

            <div><b>Puntaje: </b> {spoonacularScore}</div>

            <div><b>Dietas:</b> {diets.map((e) => <>{e}</>)}</div>
            <p></p>
            <a href={"/receta/" + id}> Mas Detalles!</a>
        </div>
    );
}

export default Receta;