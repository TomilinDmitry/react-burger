import userReducer, {
  setAuthChecked,
  setUser,
} from '../../services/users/user';

describe('Users test', () => {
  it('setAuthChecked', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
    };
    const newState = userReducer(initialState, setAuthChecked(true));
    expect(newState.isAuthChecked).toBe(true);
  });
  it('setUser', () => {
    const user = { email: 'email', name: 'name' };
    const action = setUser(user);

    expect(action).toEqual({
      type: 'user/setUser',
      payload: user,
    });
  });
  it('should handle login.fulfilled', () => {
    const user = { email: 'email', name: 'name' };
    const action = setUser(user);

    expect(action).toEqual({
      type: 'user/setUser',
      payload: user,
    });
  });

  it('should handle logout.fulfilled', () => {
    const user = {};
    const action = setUser(user);

    expect(action).toEqual({
      type: 'user/setUser',
      payload: user,
    });
  });
});
