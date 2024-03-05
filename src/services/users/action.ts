import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthChecked } from './user';
import {
  api,
  getEmailForgotPassword,
  getUserProfile,
  setNewPassword,
  updateInfo,
} from '../../utils/Api/api-ingredients';
import { AppDispatch } from '../..';
import { TUser } from '../../utils/Types/TUser';
export const getUser = () => {
  
  return (dispatch: AppDispatch) => {
    return getUserProfile().then((res) => {
      dispatch(setUser(res));
    });
  };
};

export const setNewInfoUser = createAsyncThunk(
  'user/updateInfo',
  async ({ name, email, password }: TUser) => {
    const response = await updateInfo(email, name!, password!);
    return response;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TUser) => {
    const res = await api.register(email, password!, name!);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  },
);
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TUser) => {
    const res = await api.login(email, password!);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  },
);
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: TUser) => {
    const res = await getEmailForgotPassword(email);
    return res;
  },
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) => {
    const res = await setNewPassword(password, token);
    return res;
  },
);

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = createAsyncThunk('user/logout', async () => {
  await api.logout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});
