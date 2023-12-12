import { INGREDIENT_FAILED, INGREDIENT_LOADING, INGREDIENT_SUCCESS, SET_ACTIVE_TAB} from "./action"

const initialState = {
    data:[],
    loading:false,
    failed:null,
    activeTab:'buns',
}
export const burgerReducer = (state=initialState,action) =>{
    switch(action.type){
        case INGREDIENT_LOADING:
        return{
            ...state,
            loading:true,
            failed:null,
        }
        case INGREDIENT_SUCCESS:
        return{
            ...state,
            loading:false,
            failed:null,
            data:action.payload
        }
        case INGREDIENT_FAILED:
            return{
                ...state,
                loading:false,
                failed:action.payload,

            }
        case SET_ACTIVE_TAB:
            return{
                ...state,
                activeTab:action.payload,

            }
        default:
            return state
    }
}