import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber } from '../../utils/Api/api-ingredients';
import { fetchOrderById } from '../get-order/action';

export interface Order {
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TPayload = {
  orders: Order[];
  error:string | null
};

type OrdersState = {
  order: Order | null;
  loading:boolean,
  error:string|null
};

const initialState: OrdersState = {
  order: null,
  loading:false,
  error:null
};

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    currentOrder: (state, action: PayloadAction<TPayload>) => {
      state.order = action.payload.orders[0];
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase (fetchOrderById.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase (fetchOrderById.fulfilled,(state,action) => {
        state.order = action.payload.orders[0];
        state.error = null;
        state.loading = false
    })
    .addCase (fetchOrderById.rejected, (state,action)=>{
        state.error = String(action.error.message)
    })

}
});

export const currentOrderReducer = currentOrderSlice.reducer;
export const { currentOrder } = currentOrderSlice.actions;
