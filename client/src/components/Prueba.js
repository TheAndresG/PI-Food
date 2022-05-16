import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { pedirRecetas } from "../store/acctions"

const Prueba = () => {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(pedirRecetas())
    }, [dispatch])

    let recetas = useSelector((state) => state.recetas)
    return (<div>
        {recetas.map((receta) => <div>{receta.title}</div>)}
    </div>
    );
}

export default Prueba;