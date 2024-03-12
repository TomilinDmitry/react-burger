import {
  getOrderProfileListReducer,
  wsConnectProfile,
  wsConnectionProfileError,
  wsDisconnectProfile,
  wsMessageProfile,
} from '../../services/get-order/sliceProfile';

describe('orderProfile test', () => {
  it('wsConnectProfile', () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      connectingError: null,
      wsConnected: false,
    };
    const newState = getOrderProfileListReducer(
      initialState,
      wsConnectProfile(),
    );
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
    const newState = getOrderProfileListReducer(
      initialState,
      wsConnectionProfileError(error),
    );
    expect(newState.connectingError).toEqual(error);
    expect(newState.wsConnected).toEqual(false);
  });
  it('wsMessageProfile', () => {
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
    const newState = getOrderProfileListReducer(
      initialState,
      wsMessageProfile(payload),
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
    const newState = getOrderProfileListReducer(
      initialState,
      wsDisconnectProfile(),
    );
    expect(newState.wsConnected).toBe(false);
  });
});
