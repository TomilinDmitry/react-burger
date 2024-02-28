import { AppDispatch } from '../..';
import { getOrderBurgerInfo } from '../../utils/Api/api-ingredients';
import { TElements } from '../../utils/Types/TElements';
import {
  orderFailed,
  orderLoading,
  orderSuccess,
} from '../burger-constructor/order-details/action';

export const asyncOrder =
  (data: TElements[]) => (dispatch: AppDispatch) => {
    dispatch(orderLoading());
    getOrderBurgerInfo(data)
      .then((data) =>
        dispatch(
          orderSuccess(data),
        ),
      )
      .catch((error: string) => {
        dispatch(orderFailed(`${error}`));
      });
  };
