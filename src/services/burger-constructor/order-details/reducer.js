import { ORDER_CLOSE, ORDER_FAILED, ORDER_LOADING, ORDER_SUCCESS } from "./action"
 
const initialState = {
    data:[],
    loading:false,
    failed:null,
    orderName: null,
    orderNumber: null,
}
export const orderReducer = (state=initialState,action) =>{
    switch(action.type){
        case ORDER_LOADING:
        return{
            ...state,
            loading:true,
            failed:false,

        }
        case ORDER_SUCCESS:
        return{
            ...state,
            loading:false,
			failed:false,
            orderName: action.payload.name,
            orderNumber: action.payload.name.order.number,
        }
        case ORDER_FAILED:
        return{
                ...state,
                loading:false,
                failed:action.payload,

            }
        case ORDER_CLOSE:
        return{
                ...state,
                orderName:null,
            }
      default:
        return state;

    }
}
