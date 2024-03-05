import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OrderProfile {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
export interface OrdersPayload {
  orders: OrderProfile[];
  total: number;
  totalToday: number;
}
interface OrdersProfileState {
  orders: OrderProfile[];
  total: number;
  totalToday: number;
  connectingError: string | null;
  wsConnected: boolean;
}

const initialState: OrdersProfileState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: null,
  wsConnected: false,
};
export const getOrderProfileSlice = createSlice({
  name: 'getOrderProfileList',
  initialState,
  reducers: {
    wsConnectProfile: (state) => {
      state.connectingError = null;
      state.wsConnected = true;
    },
    wsConnectionProfileError: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.connectingError = action.payload;
    },
    wsMessageProfile: (
      state,
      action: PayloadAction<OrdersPayload>,
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.connectingError = null;
    },
    wsDisconnectProfile: (state) => {
      state.wsConnected = false;
    },
  },
});
export const getOrderProfileListReducer =
  getOrderProfileSlice.reducer;

export const {
  wsConnectionProfileError,
  wsMessageProfile,
  wsConnectProfile,
  wsDisconnectProfile,
} = getOrderProfileSlice.actions;

type TGetOrderProfileListActionCreators =
  typeof getOrderProfileSlice.actions;
export type TGetOrderProfileListActions = ReturnType<
  TGetOrderProfileListActionCreators[keyof TGetOrderProfileListActionCreators]
>;
