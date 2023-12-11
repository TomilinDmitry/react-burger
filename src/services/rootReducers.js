import { combineReducers } from 'redux';
import { burgerReducer } from './burger-ingredients/reducer';
import { selectedReducer } from './burger-ingredients/ingredient-details/reducer';
import { modalReducer } from './burger-constructor/reducer';
export const rootReducer = combineReducers({
   burger:burgerReducer,
   selected:selectedReducer,
   modal:modalReducer,
});