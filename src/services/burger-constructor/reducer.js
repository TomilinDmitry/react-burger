import { SET_ACTIVE_TAB, SET_OPEN_MODAL } from "./action"

const initialState ={
    isOpen:false,
    activeTab:'buns',
}

export const modalReducer = (state=initialState,action) => {
    switch(action.type){
        case SET_OPEN_MODAL:
            return{
                ...state,
                isOpen:true
            }
        case SET_ACTIVE_TAB:
            return{
                ...state,
                activeTab:action.payload
            }
            default:
            return state
    }
}