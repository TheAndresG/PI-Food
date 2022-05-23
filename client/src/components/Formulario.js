import React, { useEffect, useState } from 'react';
import { crearMensajeState, crearReceta, pedirDietas, pedirRecetas } from '../store/acctions';
import { useDispatch, useSelector } from 'react-redux'
import Error from './Error';
import Modal from './Modal';
import "../css/formulario.css"

const Formulario = () => {
    const dietas = useSelector((state) => state.dietas)
    const mensaje = useSelector((state) => state.mensaje)

    const dispatch = useDispatch()

    let validate = function (input) {
        let errors = {};
        if (!input.title) {
            errors.title = 'Title is obligatory';
        } else if (input.title.length > 40) {
            errors.title = 'Title cannot be longer than 40 characters!';
        }
        else if (!/^[a-zA-Z0-9 ]*$/.test(input.title)) {
            errors.title = 'Special characters are not allowed!';
        }

        if (input.healthScore <= 0 || input.healthScore > 100) {
            errors.healthScore = 'HealthScore must be between 1 and 100';
        }
        if (input.spoonacularScore <= 0 || input.healthScore > 100) {
            errors.spoonacularScore = 'SpoonacularScore must be between 1 and 100';
        }
        if (!input.summary) {
            errors.summary = 'Summary is obligatory';
        } else if (input.summary.length > 200) {
            errors.summary = 'Summary cannot be longer than 200 characters!';
        }
        if (input.image) {
            if (!/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/.test(input.image)) {
                errors.image = "The image must be a link"
            }
            else if (!/.*(png|jpg|jpeg|gif)$/.test(input.image)) {
                errors.image = "The format must be PNG, JPG, JPEG or GIF"
            }
        }

        if (input.instructions.length > 200) {
            errors.instructions = 'Instructions cannot be longer than 200 characters!';
        }
        return errors;
    };



    const [input, setInput] = useState({
        title: '',
        image: "",
        summary: '',
        healthScore: 1,
        spoonacularScore: 1,
        instructions: "",
        dietsID: [],
        dishTypes: []

    });
    const [errors, setError] = useState({

        title: 'Title is obligatory',
        summary: 'Summary is obligatory',
        image: "",
        healthScore: "",
        instructions: "",
        spoonacularScore: ""

    });

    useEffect(() => {
        if (dietas.length === 0) {
            dispatch(pedirDietas())

        }

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        })
        )
    }


    const handleCheckChange = function (e) {

        if (e.target.checked === true) {
            setInput({
                ...input, [e.target.name]: [...input[e.target.name], e.target.value]

            });
        }
        else {
            setInput({
                ...input, [e.target.name]:
                    input[e.target.name].filter((b) => b !== e.target.value)
            });
        }

    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(crearReceta(input))
        dispatch(pedirRecetas())
        setInput({
            title: '',
            image: "",
            summary: '',
            healthScore: 1,
            spoonacularScore: 1,
            instructions: "",
            dietsID: [],
            dishTypes: []

        })
        setError({
            ...errors,
            title: 'Title is obligatory',
            summary: 'Summary is obligatory'
        })
        window.scrollTo(0, 0);

    }

    function noSubmit(e) {
        e.preventDefault()
        window.scrollTo(0, 0);

        dispatch(crearMensajeState("There are errors in the form! Recipe NOT created!"))

    }

    // let dishTypesLista = [
    //     "Lunch",
    //     "Main Course",
    //     "Main Dish",
    //     "Dinner"
    // ]
    return (
        <div className='fondoForm' >
            {mensaje && mensaje !== "" ? <Modal /> : null}
            <form className='formulario1' onSubmit={Object.keys(errors).length === 0 ? handleSubmit : noSubmit}>
                <div className='cont'>
                    <label >Title: </label>
                    <input type="text" name="title" value={input.title} onChange={handleInputChange} />

                    {errors.title ? <Error mensaje={errors.title} /> : <p> </p>}
                </div>
                <div className='cont'>
                    <label >Summary: </label>
                    <textarea name='summary' value={input.summary} onChange={handleInputChange}>

                    </textarea>
                    <div>{errors.summary ? <Error mensaje={errors.summary} /> : <p> </p>}
                    </div>

                </div>
                <div className='cont'>
                    <label >Image: </label>
                    <input type="text" name='image' value={input.image} onChange={handleInputChange} />
                    {errors.image ? <Error mensaje={errors.image} /> : <p></p>}

                </div>

                <div className='cont'>
                    <label >Instructions: </label>
                    <textarea name='instructions' value={input.instructions} onChange={handleInputChange}>

                    </textarea>
                    <div>{errors.instructions ? <Error mensaje={errors.instructions} /> : <div></div>}
                    </div>
                </div>
                <div className='cont' id='cajas'>
                    Diets:
                    <div className='dietas'>

                        {dietas ? dietas.map(dieta => (<p key={dieta.name} name={dieta.name}>
                            <label>{dieta.name}</label>
                            <input className='checkbox' type="checkbox" name="dietsID" value={dieta.id} onChange={handleCheckChange} />
                        </p>)) : <div>Dietas</div>}
                    </div>
                </div>
                <div className='cont'>
                    <label >HealthScore: </label>
                    <input type="range" step="1" min="1" max="100" name="healthScore" value={input.healthScore} onChange={handleInputChange} />
                    <div>{input.healthScore}</div>


                    {errors.healthScore ? <Error mensaje={errors.healthScore} /> : <div></div>}


                    <label >SpoonacularScore: </label>
                    <input type="range" step="1" min="1" max="100" name="spoonacularScore" value={input.spoonacularScore} onChange={handleInputChange} />
                    <div>{input.spoonacularScore}</div>

                    {errors.spoonacularScore ? <Error mensaje={errors.spoonacularScore} /> : <div></div>}

                    {/* dishTypes:
                    <div className='cenas'>
                        {dishTypesLista.map(e => (<p key={e} name={e}>
                            <input type="checkbox" name="dishTypes" value={e.toLowerCase()} onChange={handleCheckChange} />
                            <label>{e}</label>
                        </p>))}
                    </div> */}

                </div>
                <button className='botonForm' type="submit">Create Product</button>

            </form>
        </div>
    );
};

export default Formulario;