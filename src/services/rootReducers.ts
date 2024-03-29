import { combineReducers } from 'redux';
import ingredientsReducer from './burger-ingredients/reducer';
import selectedIngReducer from './burger-ingredients/ingredient-details/reducer';
import { orderReducer } from './burger-constructor/order-details/reducer';
import constructorReducer from './burger-constructor/reducer';
import userReducer from './users/user';
import { getOrderListReducer } from './get-order/slice';
import { currentOrderReducer } from './currentOrder/sliceCurrentOrder';
import { getOrderProfileListReducer } from './get-order/sliceProfile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selected: selectedIngReducer,
  order: orderReducer,
  container: constructorReducer,
  user: userReducer,
  getOrderList: getOrderListReducer,
  currentOrderSlice: currentOrderReducer,
  getOrderProfileList: getOrderProfileListReducer,
});
