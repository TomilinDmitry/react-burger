import { SET_SELECTED_INGREDIENT } from "./action"

const initialState = {
    selectedIngredient:null,
}

export const selectedIngReducer = (state=initialState,action) =>{
    switch(action.type){
        case SET_SELECTED_INGREDIENT :
            return {
                ...state,
                selectedIngredient: action.payload
            }
            default :
            return state;
    }
}