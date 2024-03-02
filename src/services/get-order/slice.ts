import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TElements } from '../../utils/Types/TElements';

export interface Order {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number|string|undefined;
}
export interface OrdersPayload {
  orders: Order[];
  total: number;
  totalToday: number;
}
interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  connectingError: string | null;
  wsConnected: boolean;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
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
    wsMessage: (state, action: PayloadAction<OrdersPayload>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.connectingError = null;
    },
    wsDisconnect: (state) => {
      state.wsConnected = false;
    },
  },
});
export const getOrderListReducer = getOrderSlice.reducer;
export const {
  wsConnectionError,
  wsMessage,
  wsConnect,
  wsDisconnect,
} = getOrderSlice.actions;
type TGetOrderListActionCreators = typeof getOrderSlice.actions;
export type TGetOrderListActions = ReturnType<
  TGetOrderListActionCreators[keyof TGetOrderListActionCreators]
>;
