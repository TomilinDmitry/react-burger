import { createAsyncThunk } from '@reduxjs/toolkit';
import { TElements } from '../Types/TElements';
import { TUser } from '../Types/TUser';

export const baseUrl = 'https://norma.nomoreparties.space/api';

type TApiResponse<T> = {
  success: boolean;
  data?: T;
  refreshToken?: string;
  accessToken?: string;
};

const checkResponse = <T>(res: Response): Promise<TApiResponse<T>> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

export const getIngredient = createAsyncThunk(
  'asyncIngredient',
  async () => {
    const response = await fetch(`${baseUrl}/ingredients`);
    if (response.ok) {
      const data = await checkResponse<TElements[]>(response);
      return data.data;
    } else {
      console.error(`Произошла ошибка: ${response.status}`);
    }
  },
);

export const getOrderBurgerInfo = (data: TElements[]): Promise<TApiResponse<any>> => {
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
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const refreshToken = (): Promise<TApiResponse<any>> => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<TApiResponse<any>> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err:any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken!);
      localStorage.setItem("accessToken", refreshData.accessToken!);
      if (options.headers) {
        if (refreshData.accessToken !== undefined) {
          (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
        }
      } else {
        options.headers = { authorization: refreshData.accessToken || '' };
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getEmailForgotPassword = (email: string): Promise<TApiResponse<any>> => {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const setNewPassword = (password: string, token: string): Promise<TApiResponse<any>> => {
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
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const updateInfo = (email: string, name: string, password: string): Promise<TApiResponse<any>> => {
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
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const register = (email: string, name: string, password: string): Promise<TApiResponse<any>> => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      token: localStorage.getItem("refreshToken")
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const login = (email: string, password: string): Promise<TApiResponse<TUser>> => {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse<TUser>)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const logout = (): Promise<TApiResponse<any>> => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const getUserProfile = (): Promise<TApiResponse<TUser>> => {
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
    .then(checkResponse<TUser>)
    .then((data) => {
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    });
};

export const api = {
  register,
  login,
  logout
};
