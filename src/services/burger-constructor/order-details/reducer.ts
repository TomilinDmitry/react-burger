import {
  ORDER_CLOSE,
  ORDER_FAILED,
  ORDER_LOADING,
  ORDER_SUCCESS,
} from './action';
import { PayloadAction } from '@reduxjs/toolkit';
import { TOrderInfo } from '../../../utils/Types/TOrderInfo';
type TOrderState = {
  loading: boolean;
  failed: boolean;
  orderName: string | null;
  orderNumber: number | null;
};

const initialState: TOrderState = {
  loading: false,
  failed: false,
  orderName: null,
  orderNumber: null,
};
export const orderReducer = (
  state = initialState,
  action: PayloadAction<TOrderInfo>,
) => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        failed: false,
        orderName: action.payload.name,
        orderNumber: action.payload.number,
      };
    case ORDER_FAILED:
      return {
        ...state,
        loading: false,
        failed: action.payload,
      };
    case ORDER_CLOSE:
      return {
        ...state,
        orderName: null,
      };
    default:
      return state;
  }
};
