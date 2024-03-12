import {
  ORDER_CLOSE,
  ORDER_FAILED,
  ORDER_LOADING,
  ORDER_SUCCESS,
} from '../../../services/burger-constructor/order-details/action';
import { orderReducer } from '../../../services/burger-constructor/order-details/reducer';

describe('orderReducer', () => {
  const initialState = {
    loading: false,
    failed: false,
    orderName: null,
    orderNumber: null,
  };
  it('should handle ORDER_LOADING', () => {
    const action = { type: ORDER_LOADING };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
      ...newState,
      loading: true,
      failed: false,
    });
  });
  it('should handle ORDER_SUCCESS', () => {
    const action = {
      type: ORDER_SUCCESS,
      payload: { name: 'Name', number: 1234 },
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
      ...newState,
      loading: false,
      failed: false,
      orderName: 'Name',
      orderNumber: 1234,
    });
  });
  it('should handle ORDER_FAILED', () => {
    const action = {
      type: ORDER_FAILED,
      payload: 'Ошибка:123',
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
      loading: false,
      failed: 'Ошибка:123',
      orderName: null,
      orderNumber: null,
    });
  });
  it('should handle ORDER_CLOSE', () => {
    const action = {
      type: ORDER_CLOSE,
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
    });
  });
});
