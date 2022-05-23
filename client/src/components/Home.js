import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { pedirDietas, pedirRecetas } from "../store/acctions"
import Recetas from './Recetas';
import Paginador from './Paginador';
import Modal from './Modal';
import { crearMensajeState, resetPedido } from '../store/acctions';
import '../css/home.css';



const Homes = () => {
    // El scroll hecho funcion
    function scrollWin() {
        window.scrollTo(0, 0);
    }


    const [carga, setCarga] = useState(true)
    const [filtro, setfiltro] = useState({
        tipo: "title",
        orden: "A-Z",
        dietafiltro: ""
    })
    const [busqueda, setBusqueda] = useState("")

    //El paginado
    const [paginaActual, setPaginaActual] = useState(1)
    const [maxPagina] = useState(9)

    const indexFinal = paginaActual * maxPagina;
    const indexInicial = indexFinal - maxPagina;
    const pagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
        scrollWin()
    }
    //




    const dispatch = useDispatch()
    const recetas = useSelector((state) => state.recetas)
    const dietas = useSelector((state) => state.dietas)
    const mensaje = useSelector((state) => state.mensaje)
    const filtroName = useSelector((state) => state.filtroName)



    //La mitad del codigo es esta funcion para ordenar todo~
    let recetasAEnviar = recetas
    let base = recetas
    let ordenaminamiento = () => {
        if (filtroName.length !== 0) base = filtroName

        if (filtro.dietafiltro === "") { recetasAEnviar = base }
        else if (filtro.dietafiltro === "sin-dieta") { recetasAEnviar = recetas.filter(e => e.diets.length === 0) }
        else { recetasAEnviar = base.filter((e) => e.diets.includes(filtro.dietafiltro.toLocaleLowerCase())) }
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


    useEffect(() => {
        setCarga(true)
        if (recetas.length === 0) {
            dispatch(pedirRecetas());
        }
        if (dietas.length === 0) { dispatch(pedirDietas()) }
        setTimeout(() => { setCarga(false) }, 1800)

        return (
            dispatch(resetPedido())
        )
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    //capturar el valor de la busqueda
    const handleInputChange = function (e) {
        setBusqueda(e.target.value)
    }


    //Ejecutar la busqueda
    const onSubmitForm = function (e) {
        e.preventDefault();
        setPaginaActual(1)
        setCarga(true)
        if (busqueda === "") {
            setCarga(false);
            return dispatch(resetPedido())
        }
        dispatch(pedirRecetas(busqueda))
        setTimeout(() => {
            setCarga(false);

        }, 1500)
    }


    //Actualizar el state de filtros
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

        }, 1400)

    };

    //Cartel si los Parametros no dan resultado
    // const [ok, setOk] = useState(false)
    // useEffect(() => {
    //     if (carga === false && recetasAEnviar.length === 0) {
    //         dispatch(crearMensajeState("There are no recipes with those parameters!"))
    //     }

    // }, [obtenerInformacion])





    ordenaminamiento()
    return (
        <Fragment>
            {/* <FormularioFiltro busqueda={busqueda} dietas={dietas} filtro={filtro} filtroreceta={filtroreceta} obtenerInformacion={obtenerInformacion} onSubmitForm={onSubmitForm} filtrarDietasChange={filtrarDietasChange} handleInputChange={handleInputChange} /> */}
            <div className='fondo'>
                <div className='form'>
                    <form onSubmit={onSubmitForm}>
                        <label>Select Diets</label>
                        <select name='dietafiltro'
                            className='search'
                            value={filtro.dietafiltro}
                            onChange={obtenerInformacion}>
                            <option className='options' value="">All</option>
                            <option className='options' value="sin-dieta">Whitout Diets</option>
                            {dietas.map((e) => <option value={e.name}>{e.name}</option>)}
                        </select>
                    </form>
                    <form onSubmit={onSubmitForm} className="form-wrapper">
                        <input type='search' className='search ' placeholder="Search for..." name="searchTerm" value={busqueda} onChange={handleInputChange} pattern=".*\S.*" /> <input type="submit" value="GO" className="boton" />
                    </form>
                    <form>
                        <label>Order By:</label>
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