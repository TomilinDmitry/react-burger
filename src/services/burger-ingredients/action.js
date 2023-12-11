export const INGREDIENT_FAILED = 'INGREDIENT_FAILED'
export const INGREDIENT_SUCCESS = 'INGREDIENT_SUCCESS'
export const INGREDIENT_LOADING = 'INGREDIENT_LOADING'



export const ingredientLoading = () =>({
    type:INGREDIENT_LOADING,
})
export const ingredientSuccess = (ingridients) =>({
    type:INGREDIENT_SUCCESS,
    payload:ingridients,
})
export const ingredientFailed = (error) =>({
    type:INGREDIENT_FAILED,
    payload:error,
})