import {
  currentOrder,
  currentOrderReducer,
  initialState
} from '../../services/currentOrder/sliceCurrentOrder';
import { fetchOrderById } from '../../services/get-order/action';

describe('CurrentOrderReducer test', () => {
  it('currentOrder test', () => {
    const action = currentOrder({
      orders: [
        {
          ingredients: ['ing1', 'ing2'],
          status: 'success',
          name: 'Name',
          createdAt: '2024',
          updatedAt: '2024',
          number: 1234,
        },
      ],
      error: null,
    });
    const newState = currentOrderReducer(initialState, action);
    expect(newState.order).toEqual({
      ingredients: ['ing1', 'ing2'],
      status: 'success',
      name: 'Name',
      createdAt: '2024',
      updatedAt: '2024',
      number: 1234,
    });
  });
});

describe('extraReducerTest', () => {
  it('should handle getIngredient.pending', () => {
    const action = { type: fetchOrderById.pending.type };
    const newState = currentOrderReducer(initialState, action);
    expect(newState.loading).toEqual(true);
    expect(newState.error).toBeNull();
  });
  it('should handle getIngredient.fulfilled', () => {
   
    const action = currentOrder({
      orders: [
        {
          ingredients: ['ing1', 'ing2'],
          status: 'success',
          name: 'Name',
          createdAt: '2024',
          updatedAt: '2024',
          number: 1234,
        },
      ],
      error: null,
    });
    const newState = currentOrderReducer(initialState, action);
    expect(newState.order).toEqual({
      ingredients: ['ing1', 'ing2'],
      status: 'success',
      name: 'Name',
      createdAt: '2024',
      updatedAt: '2024',
      number: 1234,
    });
    expect(newState.loading).toEqual(false);
    expect(newState.error).toBeNull();
  });
  it('should handle getIngredient.rejected', () => {
    const action = {
      type: fetchOrderById.rejected.type,
      error: { message: 'Ошибка' },
    };
    const newState = currentOrderReducer(initialState, action);
    expect(newState.error).toEqual('Ошибка');
  });
});
