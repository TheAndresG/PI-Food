import { PEDIDO_RECETAS, PEDIDO_RECETAS_FILTRADAS, PEDIR_UNA_RECETA, CREAR_RECETA, PEDIR_DIETAS, CREAR_MENSAJE_STATE } from "../acctions";

const initialState = {
    recetas: [],
    detailReceta: {},
    dietas: [],
    mensaje: "",
    filtroName: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PEDIDO_RECETAS:
            return {
                ...state,
                recetas: action.payload.data
            }

        case PEDIDO_RECETAS_FILTRADAS:
            if (action.payload.data.length <= 0) {
                return {
                    ...state,
                    mensaje: "There are no recipes with that name"
                }
            }
            return {
                ...state,
                filtroName: action.payload.data
            }
        case "RESET":
            return {
                ...state,
                filtroName: []
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
            console.log("mensaje llego como:" + action.payload);
            return {
                ...state,
                mensaje: action.payload
            }


        default:
            return state
    }
} 