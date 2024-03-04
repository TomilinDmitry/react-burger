import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Order {
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TPayload = {
  order: Order;
};

type OrdersState = {
  order: Order | null;
};

const initialState: OrdersState = {
  order: null,
};

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    currentOrder: (state, action: PayloadAction<TPayload>) => {
      state.order = action.payload.order;
    },
  },
});

export const currentOrderReducer = currentOrderSlice.reducer;
export const { currentOrder } = currentOrderSlice.actions;
