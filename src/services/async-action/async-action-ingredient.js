import { ingredientBurger } from "../../utils/Api/api-ingredients"
import {
	ingredientFailed,
	ingredientLoading,
	ingredientSuccess,
} from "../burger-ingredients/action"
import { orderBurger } from "../../utils/Api/api-ingredients"
import {
	orderFailed,
	orderLoading,
	orderSuccess,
} from "../burger-constructor/order-details/action"


export const asyncIngredient = (data) => (dispatch) => {
	dispatch(ingredientLoading())
	ingredientBurger(data)
		.then((data) => dispatch(ingredientSuccess(data.data)))
		.catch((error) => {
			dispatch(ingredientFailed(`${error}`))
		})
}

export const asyncOrder = (data) => (dispatch) => {
	dispatch(orderLoading())
	orderBurger(data)
	.then((data) => dispatch(orderSuccess(data)))
	.catch((error) => {
		dispatch(orderFailed(`${error}`))
	})
}
