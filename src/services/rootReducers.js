import { combineReducers } from "redux"
import { burgerReducer } from "./burger-ingredients/reducer"
import { selectedIngReducer } from "./burger-ingredients/ingredient-details/reducer"
import { orderReducer } from "./burger-constructor/order-details/reducer"
export const rootReducer = combineReducers({
	burger: burgerReducer,
	selected: selectedIngReducer,
	order: orderReducer,
})
