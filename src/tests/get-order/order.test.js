import {
  getOrderListReducer,
  wsConnect,
  wsConnectionError,
  wsDisconnect,
  wsMessage,
} from '../../services/get-order/slice';

describe('order test', () => {
  it('wsConnect', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      connectingError: null,
      wsConnected: false,
    };
    const newState = getOrderListReducer(initialState, wsConnect());
    expect(newState.connectingError).toBeNull();
    expect(newState.wsConnected).toBe(true);
  });
  it('wsConnectionError', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      connectingError: null,
      wsConnected: false,
    };
    const error = 'Ошибка';
    const newState = getOrderListReducer(
      initialState,
      wsConnectionError(error),
    );
    expect(newState.connectingError).toEqual(error);
    expect(newState.wsConnected).toEqual(false);
  });
  it('wsMessage', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      connectingError: 'Ошибка',
      wsConnected: true,
    };
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
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      connectingError: null,
      wsConnected: true,
    };
    const newState = getOrderListReducer(
      initialState,
      wsDisconnect(),
    );
    expect(newState.wsConnected).toBe(false);
  });
});
