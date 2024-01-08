import { orderBurger } from '../../utils/Api/api-ingredients';
import {
  orderFailed,
  orderLoading,
  orderSuccess,
} from '../burger-constructor/order-details/action';

export const asyncOrder = (data) => (dispatch) => {
  dispatch(orderLoading());
  orderBurger(data)
    .then((data) => dispatch(orderSuccess(data)))
    .catch((error) => {
      dispatch(orderFailed(`${error}`));
    });
};
