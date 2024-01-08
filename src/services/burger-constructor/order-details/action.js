export const ORDER_FAILED = 'ORDER_FAILED'
export const ORDER_SUCCESS = 'ORDER_SUCCESS'
export const ORDER_LOADING = 'ORDER_LOADING'
export const ORDER_CLOSE = 'ORDER_CLOSE'

export const orderLoading = () =>({
    type:ORDER_LOADING,
})
export const orderSuccess = (name,orderNumber) =>({
    type:ORDER_SUCCESS,
    payload:{name,orderNumber},
})
export const orderFailed = (error) =>({
    type:ORDER_FAILED,
    payload:error,
})
export const orderClose = () => ({
    type:ORDER_CLOSE,
})