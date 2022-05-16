import axios from "axios";
export const PEDIDO_RECETAS = "PEDIDO_RECETAS";
export const PEDIR_UNA_RECETA = "PEDIR_UNA_RECETA";
export const CREAR_RECETA = "CREAR_RECETA"
export const PEDIR_DIETAS = "PEDIR_DIETAS"
// export const BORRAR_MENSAJE_STATE = "BORRAR_MENSAJE_STATE"
export const CREAR_MENSAJE_STATE = "CREAR_MENSAJE_STATE"
export function pedirRecetas(name) {
    return function (dispatch) {
        if (name && name !== "") {
            axios.get(`http://localhost:3001/recipes?name=${name}`)
                .then((recetas) => {
                    dispatch({
                        type: PEDIDO_RECETAS,
                        payload: recetas
                    })
                })
                .catch((error) => { console.log(error); })
        }

        axios.get("http://localhost:3001/recipes/")
            .then((recetas) => {
                dispatch({
                    type: PEDIDO_RECETAS,
                    payload: recetas
                })
            })
            .catch((error) => { console.log(error); })
    }
}
export function pedirUnaReceta(id) {
    return function (dispatch) {

        axios.get(`http://localhost:3001/recipes/${id}`)
            .then((receta) => {
                dispatch({
                    type: PEDIR_UNA_RECETA,
                    payload: receta
                })
            })
            .catch((error) => { console.log(error); })
    }

}

export function crearReceta(input) {
    console.log(input);
    return function (dispatch) {
        axios.post(`http://localhost:3001/recipe`, input)
            .then(() => {
                dispatch({
                    type: CREAR_RECETA,
                    payload: "Receta Creada"
                })
            })
            .catch((error) => { console.log(error); })
    }
}

export function pedirDietas() {
    return function (dispatch) {

        axios.get(`http://localhost:3001/types`)
            .then((dieta) => {
                dispatch({
                    type: PEDIR_DIETAS,
                    payload: dieta
                })
            })
            .catch((error) => { console.log(error); })
    }
}
export function crearMensajeState(mensaje) {
    console.log(`Llegue con ${mensaje}`);
    return function (dispatch) {
        dispatch({
            type: CREAR_MENSAJE_STATE,
            payload: mensaje
        })
    }
}


