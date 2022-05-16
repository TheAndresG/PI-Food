import React, { Fragment, useEffect, useState } from 'react';
import { crearMensajeState, crearReceta, pedirDietas } from '../store/acctions';
import { useDispatch, useSelector } from 'react-redux'
import Error from './Error';
import Modal from './Modal';


const Formulario = () => {
    const dietas = useSelector((state) => state.dietas)
    const mensaje = useSelector((state) => state.mensaje)

    const dispatch = useDispatch()

    let validate = function (input) {
        let errors = {};
        if (!input.title) {
            errors.title = 'El titulo es obligatorio!';
        } else if (input.title.length > 40) {
            errors.title = 'El titulo no puede ser mayor a 40 caracteres!';
        }
        else if (/^ [a - z A - Z ñÑáéíóúÁÉÍÓÚ] + $/.test(input.title)) {
            errors.title = 'El titulo solo admite letras!';
        }

        if (input.healthScore <= 0 || input.healthScore > 100) {
            errors.healthScore = 'El healthScore debe ser entre 1 y 100';
        }
        if (input.spoonacularScore <= 0 || input.healthScore > 100) {
            errors.healthScore = 'El spoonacularScore debe ser entre 1 y 100';
        }
        if (!input.summary) {
            errors.summary = 'El resumen es obligatorio!';
        } else if (input.summary.length > 200) {
            errors.summary = 'El resumen no puede ser mayor a 200 caracteres!';
        }

        if (input.instructions.length > 200) {
            errors.instructions = 'Las intrucciones no puede ser mayor a 200 caracteres!';
        }
        return errors;
    };

    // if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(input.image)) {
    //     errors.image = "La imagen debe ser un link"
    // }


    const [input, setInput] = useState({
        title: '',
        image: "",
        summary: '',
        healthScore: 1,
        spoonacularScore: 1,
        instructions: "",
        dietsID: []
    });
    const [errors, setError] = useState({

        title: "Campo obligatorio!",
        summary: "Campo obligatorio!",
        image: "",
        healthScore: "",
        instructions: "",
        spoonacularScore: ""

    });

    useEffect(() => {
        dispatch(pedirDietas())
    }, [dispatch])


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
                ...input, dietsID: [...input.dietsID, e.target.value]

            });


        }
        else {
            setInput({
                ...input, dietsID:
                    input.dietsID.filter((b) => b !== e.target.value)
            });
        }

    }

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(crearReceta(input))
        setInput({
            title: '',
            image: "",
            summary: '',
            healthScore: 1,
            spoonacularScore: 1,
            instructions: "",
            dietsID: []
        })
        setError({
            ...errors,
            title: "Campo obligatorio!",
            summary: "Campo obligatorio!"
        })
    }

    function noSubmit(e) {
        e.preventDefault()
        dispatch(crearMensajeState("Hay errores en el Formulario! Receta NO creada!"))
        console.log(mensaje);

    }
    return (
        <Fragment>
            {mensaje && mensaje !== "" ? <Modal /> : null}
            <form onSubmit={Object.keys(errors).length === 0 ? handleSubmit : noSubmit}>
                <div>
                    <label >Title: </label>
                    <input type="text" name="title" value={input.title} onChange={handleInputChange} />

                    {errors.title ? <Error mensaje={errors.title} /> : null}
                </div>

                <div>
                    <label >Image: </label>
                    <input type="text" name='image' value={input.image} onChange={handleInputChange} />
                    {errors.image ? <Error mensaje={errors.image} /> : null}

                </div>
                <div>
                    <label >Summary: </label>
                    <textarea name='summary' value={input.summary} onChange={handleInputChange}>

                    </textarea>
                    <div>{errors.summary ? <Error mensaje={errors.summary} /> : null}
                    </div>
                </div>

                <div>
                    <label >healthScore: </label>
                    <input type="range" step="1" min="1" max="100" name="healthScore" value={input.healthScore} onChange={handleInputChange} />
                    <div>{input.healthScore}</div>

                </div>
                {errors.healthScore ? <Error mensaje={errors.healthScore} /> : null}

                <div>
                    <label >spoonacularScore: </label>
                    <input type="range" step="1" min="1" max="100" name="spoonacularScore" value={input.spoonacularScore} onChange={handleInputChange} />
                    <div>{input.spoonacularScore}</div>

                </div>
                {errors.spoonacularScore ? <Error mensaje={errors.spoonacularScore} /> : null}
                <div>
                    <label >Instructions: </label>
                    <textarea name='instructions' value={input.instructions} onChange={handleInputChange}>

                    </textarea>
                    <div>{errors.instructions ? <Error mensaje={errors.instructions} /> : null}
                    </div>
                </div>

                <div>

                    <div> ACA VAN A ESTAR LAS DIETAS    </div>



                    {dietas ? dietas.map(dieta => (<p key={dieta.name} name={dieta.name}>
                        <label>{dieta.name}</label>
                        <input type="checkbox" name={dieta.name} value={dieta.id} onChange={handleCheckChange} />
                    </p>)) : <div>Dietas</div>}

                </div>

                <button type="submit">Create Product</button>
            </form>
        </Fragment>
    );
};

export default Formulario;