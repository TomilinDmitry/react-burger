import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TElements } from '../../utils/Types/TElements';

export interface IOrder {
  id: string;
  createdAt: string;
  ingredients: TElements[];
  number: string|undefined;
  status: string;
  updatedAt: string;
}
export interface IOrderList{
success:boolean
order:IOrder
total:number,
totalToday:number
}

type TState = {
  wsConnected: boolean;
  orderList:IOrderList[] ;
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
    wsMessage: (state, action: PayloadAction<IOrder>) => {
      state.orderList = [...state.orderList, { success: true, order: action.payload, total: 0, totalToday: 0 }];
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
