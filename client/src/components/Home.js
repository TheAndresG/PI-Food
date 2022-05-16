import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { pedirRecetas } from "../store/acctions"
import Recetas from './Recetas';
import Paginador from './Paginador';




const Homes = () => {
    const [carga, setCarga] = useState(true)
    const [filtro, setfiltro] = useState({
        tipo: "title",
        orden: "A-Z"
    })
    const [busqueda, setBusqueda] = useState("")

    const [paginaActual, setPaginaActual] = useState(1)
    const [maxPagina] = useState(6)




    let recetas = useSelector((state) => state.recetas)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(pedirRecetas())
        setTimeout(() => { setCarga(false) }, 1000)
    }, [dispatch])

    const handleInputChange = function (e) {
        setBusqueda(e.target.value)
    }

    const onSubmit = function (e) {
        e.preventDefault();
        setCarga(true)
        if (busqueda === "") {

            dispatch(pedirRecetas())
            setTimeout(() => { setCarga(false) }, 1200)
            return
        }
        dispatch(pedirRecetas(busqueda))
        setTimeout(() => { setCarga(false) }, 1200)
        setBusqueda("")
    }
    // const pedirOrden = function (e) {
    //     e.preventDefault();
    //     setOrdenado(e.target.value)

    // }
    const obtenerInformacion = (e) => {
        setfiltro({
            ...filtro,
            [e.target.name]: e.target.value
        })
    };

    let ordenaminamiento = () => {
        if (filtro.orden === "A-Z") {

            if (filtro.tipo === "title") {
                recetas.sort((a, b) => {

                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1

                    return 0
                }
                )
            }
            if (filtro.tipo === "spoonacularScore") {
                recetas.sort((a, b) => {
                    return b.spoonacularScore - a.spoonacularScore

                })
            }
            if (filtro.tipo === "healthScore") {
                recetas.sort((a, b) => {
                    return b.healthScore - a.healthScore

                })
            }
        }
        if (filtro.orden === "Z-A") {

            if (filtro.tipo === "title") {
                recetas.sort((a, b) => {

                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return 1
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return -1

                    return 0
                }
                )
            }
            if (filtro.tipo === "spoonacularScore") {
                recetas.sort((a, b) => {
                    return a.spoonacularScore - b.spoonacularScore

                })
            }
            if (filtro.tipo === "healthScore") {
                recetas.sort((a, b) => {
                    return a.healthScore - b.healthScore
                })
            }
        }
    }
    ordenaminamiento()
    useEffect(() => {
        ordenaminamiento()
    }, [filtro.orden, filtro.tipo])


    const indexFinal = paginaActual * maxPagina;
    const indexInicial = indexFinal - maxPagina;
    const pagina = (numeroPagina) => setPaginaActual(numeroPagina)
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <input type='search' name="busquedaInp" value={busqueda} onChange={handleInputChange} /> <button type="submit"></button>
            </form>
            <form>
                <label>Ordenar por:</label>
                <select name='tipo'
                    value={filtro.tipo}
                    onChange={obtenerInformacion}>
                    <option value="title">name</option>
                    <option value="spoonacularScore">score</option>
                    <option value="healthScore">healthScore</option>

                </select>
                <select name='orden'
                    value={filtro.orden}
                    onChange={obtenerInformacion}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </form>
            <Recetas recetas={recetas} carga={carga} indexInicial={indexInicial} indexFinal={indexFinal} />
            {carga ? null : <Paginador maxPagina={maxPagina} totalRecetas={recetas.length} pagina={pagina} />}
        </Fragment>
    );
}

export default Homes;