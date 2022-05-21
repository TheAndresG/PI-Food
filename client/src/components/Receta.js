import React from 'react';
import "../css/raceta.css";
import { Link } from 'react-router-dom';

const Receta = ({ title, spoonacularScore, id, image, healthScore, diets }) => {
    return (
        <Link className='card' id={id} key={id} to={`/receta/${id}`}>
            <a href={"/receta/" + id} >{title}</a>
            <img href={"/receta/" + id} src={image} alt="Foto!"></img>
            <div><b>Puntaje Saludable: </b> {healthScore}</div>

            <div><b>Puntaje: </b> {spoonacularScore}</div>

            <div className='contDinetas'><b>Dietas:</b> {diets.map((e) => <span> {e} </span>)}</div>

        </Link>

    );
}

export default Receta;