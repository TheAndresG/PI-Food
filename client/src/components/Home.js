import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { pedirDietas, pedirRecetas } from "../store/acctions"
import Recetas from './Recetas';
import Paginador from './Paginador';
import Modal from './Modal';
import { crearMensajeState } from '../store/acctions';


// import FormularioFiltro from './FormularioFiltro';
import '../css/home.css';



const Homes = () => {
    const [carga, setCarga] = useState(true)
    const [error, setError] = useState(false)
    const [filtro, setfiltro] = useState({
        tipo: "title",
        orden: "A-Z",
        dietafiltro: ""
    })

    const [busqueda, setBusqueda] = useState("")
    const dispatch = useDispatch()
    const recetas = useSelector((state) => state.recetas)
    const dietas = useSelector((state) => state.dietas)
    const mensaje = useSelector((state) => state.mensaje)
    let recetasAEnviar = recetas
    const [paginaActual, setPaginaActual] = useState(1)
    const [maxPagina] = useState(9)
    let ordenaminamiento = () => {
        if (filtro.dietafiltro === "") { recetasAEnviar = recetas }
        else if (filtro.dietafiltro === "sin-dieta") { recetasAEnviar = recetas.filter(e => e.length === 0) }

        else { recetasAEnviar = recetas.filter((e) => e.diets.includes(filtro.dietafiltro.toLocaleLowerCase())) }
        console.log(recetas);
        console.log(recetasAEnviar);
        if (filtro.orden === "A-Z") {
            if (filtro.tipo === "title") {
                recetasAEnviar.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return -1
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return 1
                    return 0
                })
            }
            if (filtro.tipo === "spoonacularScore") {
                recetasAEnviar.sort((a, b) => {
                    return b.spoonacularScore - a.spoonacularScore

                })
            }
            if (filtro.tipo === "healthScore") {
                recetasAEnviar.sort((a, b) => {
                    return b.healthScore - a.healthScore

                })
            }
        }
        if (filtro.orden === "Z-A") {

            if (filtro.tipo === "title") {
                recetasAEnviar.sort((a, b) => {

                    if (a.title.toLowerCase() < b.title.toLowerCase())
                        return 1
                    if (a.title.toLowerCase() > b.title.toLowerCase())
                        return -1

                    return 0
                }
                )
            }
            if (filtro.tipo === "spoonacularScore") {
                recetasAEnviar.sort((a, b) => {
                    return a.spoonacularScore - b.spoonacularScore

                })
            }
            if (filtro.tipo === "healthScore") {
                recetasAEnviar.sort((a, b) => {
                    return a.healthScore - b.healthScore
                })
            }
        }

    }
    function scrollWin() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setCarga(true)
        if (recetas.length === 0) {
            dispatch(pedirRecetas())
        }
        if (dietas.length === 0) { dispatch(pedirDietas()) }
        setTimeout(() => { setCarga(false) }, 1800)
    }, [])
    // useEffect(() => {
    //     if (carga === false && recetasAEnviar.length === 0) { dispatch(crearMensajeState("No existen recetas con esos parametros!")) }
    //     setCarga(true)
    // }, [ordenaminamiento])

    const handleInputChange = function (e) {
        setBusqueda(e.target.value)
    }

    const onSubmitForm = function (e) {
        e.preventDefault();
        setPaginaActual(1)
        setCarga(true)
        // if (busqueda == "") { return pedirRecetas() }
        dispatch(pedirRecetas(busqueda))
        setTimeout(() => {
            setCarga(false);
            if (carga === false && recetasAEnviar.length === 0) {
                dispatch(crearMensajeState("No existen recetas con ese nombre!"))
            }
        }, 1400)

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

        setCarga(true)
        ordenaminamiento()
        setPaginaActual(1)
        setTimeout(() => {
            setCarga(false);
            if (carga === false && recetasAEnviar.length === 0) {
                dispatch(crearMensajeState("No existen recetas con esos parametros!"))
            }
        }, 800)

    };

    ordenaminamiento()


    console.log(dietas);
    const indexFinal = paginaActual * maxPagina;
    const indexInicial = indexFinal - maxPagina;
    const pagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
        scrollWin()
    }


    return (
        <Fragment>
            {/* <FormularioFiltro busqueda={busqueda} dietas={dietas} filtro={filtro} filtroreceta={filtroreceta} obtenerInformacion={obtenerInformacion} onSubmitForm={onSubmitForm} filtrarDietasChange={filtrarDietasChange} handleInputChange={handleInputChange} /> */}
            <div className='fondo'>
                <div className='form'>
                    <form onSubmit={onSubmitForm}>
                        <label>Elegir dietas:</label>
                        <select name='dietafiltro'
                            className='search'
                            value={filtro.dietafiltro}
                            onChange={obtenerInformacion}>
                            <option className='options' value="">Todas</option>
                            <option className='options' value="sin-dieta">sin dietas</option>

                            {dietas.map((e) => <option value={e.name}>{e.name}</option>)}

                        </select>
                    </form>
                    <form onSubmit={onSubmitForm} className="form-wrapper">
                        <input type='search' className='search ' placeholder="Search for..." name="searchTerm" value={busqueda} onChange={handleInputChange} pattern=".*\S.*" /> <input type="submit" value="GO" className="boton" />
                    </form>
                    <form>
                        <label>Ordenar por:</label>
                        <select name='tipo'
                            className='search'
                            value={filtro.tipo}
                            onChange={obtenerInformacion}>
                            <option value="title">name</option>
                            <option value="spoonacularScore">score</option>
                            <option value="healthScore">healthScore</option>

                        </select>
                        <select name='orden'
                            className='search'
                            value={filtro.orden}
                            onChange={obtenerInformacion}>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </form>
                </div>
                <Recetas recetas={recetasAEnviar} carga={carga} indexInicial={indexInicial} indexFinal={indexFinal} />
                {mensaje && mensaje !== "" ? <Modal /> : null}
                {carga ? null : <Paginador maxPagina={maxPagina} paginaActual={paginaActual} totalRecetas={recetasAEnviar.length} pagina={pagina} />}
            </div>
        </Fragment>
    );
}

export default Homes;