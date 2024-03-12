import {
  getOrderListReducer,
  wsConnect,
  wsConnectionError,
  wsDisconnect,
  wsMessage,
  initialState
} from '../../services/get-order/slice';

describe('order test', () => {
  it('wsConnect', () => {
    const newState = getOrderListReducer(initialState, wsConnect());
    expect(newState.connectingError).toBeNull();
    expect(newState.wsConnected).toBe(true);
  });
  it('wsConnectionError', () => {
    
    const error = 'Ошибка';
    const newState = getOrderListReducer(
      initialState,
      wsConnectionError(error),
    );
    expect(newState.connectingError).toEqual(error);
    expect(newState.wsConnected).toEqual(false);
  });
  it('wsMessage', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          ingredients: ['ing1', 'ing2'],
          status: 'success',
          name: 'Name',
          createdAt: '2024',
          updatedAt: '2024',
          number: 1234,
        },
      ],
      total: 1,
      totalToday: 1,
    };
    const newState = getOrderListReducer(
      initialState,
      wsMessage(payload),
    );
    expect(newState.orders).toEqual(payload.orders);
    expect(newState.total).toEqual(payload.total);
    expect(newState.totalToday).toEqual(payload.totalToday);
    expect(newState.connectingError).toBeNull();
  });
  it('wsDisconnect', () => {
    const newState = getOrderListReducer(
      initialState,
      wsDisconnect(),
    );
    expect(newState.wsConnected).toBe(false);
  });
});
