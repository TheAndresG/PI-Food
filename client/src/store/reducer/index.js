import { PEDIDO_RECETAS, PEDIR_UNA_RECETA, CREAR_RECETA, PEDIR_DIETAS, CREAR_MENSAJE_STATE } from "../acctions";

const initialState = {
    recetas: [],
    detailReceta: {},
    dietas: [],
    mensaje: ""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PEDIDO_RECETAS:
            return {
                ...state,
                recetas: action.payload.data
            }
        case PEDIR_UNA_RECETA:
            return {
                ...state,
                detailReceta: action.payload.data
            }
        case CREAR_RECETA:
            return {
                ...state,
                mensaje: action.payload
            };

        case PEDIR_DIETAS:
            return {
                ...state,
                dietas: action.payload.data
            }
        case CREAR_MENSAJE_STATE:
            return {
                ...state,
                mensaje: action.payload
            }


        default:
            return state
    }
} 