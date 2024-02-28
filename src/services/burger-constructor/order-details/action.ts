import { TOrderInfo } from "../../../utils/Types/TOrderInfo"

export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_LOADING = 'ORDER_LOADING'
export const ORDER_CLOSE = 'ORDER_CLOSE'

export const orderLoading = () =>({
    type:ORDER_LOADING,
})
export const orderSuccess = (order:TOrderInfo) =>({
    type:ORDER_SUCCESS,
    payload:order
})
export const orderFailed = (error:string) =>({
    type:ORDER_FAILED,
    payload:error,
})
export const orderClose = () => ({
    type:ORDER_CLOSE,
})