import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumber } from '../../utils/Api/api-ingredients';

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (order: number) => {
    const response = await getOrderByNumber(order);
    return response;
  },
);
