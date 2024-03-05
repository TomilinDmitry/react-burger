import { createAsyncThunk } from '@reduxjs/toolkit';
import { TElements } from '../Types/TElements';
import { TUser } from '../Types/TUser';
import { TOrderInfo } from '../Types/TOrderInfo';
import { TToken } from '../Types/TToken';
import { TFecth } from '../Types/TFetch';
import { TPayload } from '../../services/currentOrder/sliceCurrentOrder';

export const baseUrl = 'https://norma.nomoreparties.space/api';

type TServerResponse<T> = {
  success: boolean;
  data: T;
  order: T;
} & T;

export interface LoginResponse {
  user: TUser;
  accessToken: string;
  refreshToken: string;
}
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

export const getIngredient = createAsyncThunk(
  'asyncIngredient',
  async () => {
    const response = await fetch(`${baseUrl}/ingredients`);
    const data = await checkResponse<TServerResponse<TElements[]>>(
      response,
    );
    return data.data;
  },
);

export const getOrderBurgerInfo = (
  data: TElements[],
): Promise<TOrderInfo> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return Promise.reject('No accessToken available');
  }
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
    .then(checkResponse<TServerResponse<TOrderInfo>>)
    .then((data) => {
      if (data?.success) return data.order;
      return Promise.reject(data);
    });
};

export const refreshToken = (): Promise<TToken> => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse<TToken>);
};

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit,
): Promise<TFecth> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken!);
      localStorage.setItem('accessToken', refreshData.accessToken!);
      if (options.headers) {
        if (refreshData.accessToken !== undefined) {
          (
            options.headers as { [key: string]: string }
          ).authorization = refreshData.accessToken;
        }
      } else {
        options.headers = {
          authorization: refreshData.accessToken || '',
        };
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getEmailForgotPassword = (
  email: string,
): Promise<TUser> => {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const setNewPassword = (
  password: string,
  token: string,
): Promise<TUser> => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const updateInfo = (
  email: string,
  name: string,
  password: string,
): Promise<TUser> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return Promise.reject('No accessToken available');
  }

  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const register = (
  email: string,
  name: string,
  password: string,
): Promise<TUser & TToken> => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(checkResponse<TServerResponse<TUser & TToken>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const login = (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(checkResponse<TServerResponse<LoginResponse>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const logout = (): Promise<TUser & TToken> => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(checkResponse<TServerResponse<TUser & TToken>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const getUserProfile = (): Promise<TUser> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return Promise.reject('No accessToken available');
  }

  return fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
  })
    .then(checkResponse<TServerResponse<TUser>>)
    .then((data) => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    });
};
export const getOrderByNumber = (
  number: number,
): Promise<TPayload> => {
  return fetch(`${baseUrl}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(checkResponse<TServerResponse<TPayload>>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
export const api = {
  register,
  login,
  logout,
};
