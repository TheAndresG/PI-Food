import { PEDIDO_RECETAS } from "../acctions";

const initialState = {
    recetas: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PEDIDO_RECETAS:
            return {
                ...state,
                recetas: action.payload
            }


        default:
            return state
    }
} 