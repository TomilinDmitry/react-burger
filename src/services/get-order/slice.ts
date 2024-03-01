import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TElements } from '../../utils/Types/TElements';

export interface IGetOrder {
  id: string;
  status: string;
  ingredients: TElements;
  number: number;
  total: number;
  totalToday: number;
}

type TState = {
  wsConnected: boolean;
  orderList: IGetOrder[];
  connectingError: string | null;
};
const initialState: TState = {
  orderList: [],
  connectingError: null,
  wsConnected: false,
};
export const getOrderSlice = createSlice({
  name: 'getOrderList',
  initialState,
  reducers: {
    wsConnect: (state) => {
      state.connectingError = null;
      state.wsConnected = true;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.connectingError = action.payload;
    },
    wsMessage: (state, action) => {
      state.orderList = [...state.orderList, action.payload];
      state.connectingError = null;
    },
    wsDisconnect:(state)=>{
      state.wsConnected = false
    },
  },
});
export const getOrderListReducer = getOrderSlice.reducer;
export const { wsConnectionError, wsMessage, wsConnect,wsDisconnect } =
  getOrderSlice.actions;
type TGetOrderListActionCreators = typeof getOrderSlice.actions;
export type TGetOrderListActions = ReturnType<
  TGetOrderListActionCreators[keyof TGetOrderListActionCreators]
>;
