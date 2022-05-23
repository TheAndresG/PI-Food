import React from 'react';
import "../css/raceta.css";
import { Link } from 'react-router-dom';

const Receta = ({ title, spoonacularScore, id, image, healthScore, diets }) => {
    return (
        <Link className='card' id={id} key={id} to={`/receta/${id}`}>
            <b href={"/receta/" + id} >{title}</b>
            <img href={"/receta/" + id} src={image} alt="Foto!"></img>
            <div><b>HealthScore: </b> {healthScore}</div>

            <div><b>Score: </b> {spoonacularScore}</div>

            <div className='contDinetas'><b>Diets:</b> {diets.map((e) => <span key={e}> {e} </span>)}</div>

        </Link>

    );
}

export default Receta;