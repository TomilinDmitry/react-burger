import apiUrl from "../../utils/Api/api-ingrediens"
import { ingredientFailed, ingredientLoading, ingredientSuccess } from "../burger-ingredients/action"
export const asyncIngredient =() => (dispatch) =>{
    dispatch(ingredientLoading())
        fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => dispatch(ingredientSuccess(data.data)))
        .catch ((error)=>{
        dispatch(ingredientFailed (`Error : ${error}`))
        })
    }