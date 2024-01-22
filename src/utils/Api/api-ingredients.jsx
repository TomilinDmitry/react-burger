import { createAsyncThunk } from '@reduxjs/toolkit';

export const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

export const getIngredient = createAsyncThunk(
  'asyncIngredient',
  async () => {
    const response = await fetch(`${baseUrl}/ingredients`);
    if (response.ok) {
      const data = await checkResponse(response);
      return data.data;
    } else {
      console.error(`Произошла ошибка: ${response.status}`);
    }
  },
);

export const getOrderBurgerInfo = (data) => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
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

export const refreshToken = () => {
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
  export const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };
export const getEmailForgotPassword = (email) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email:email,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
export const setNewPassword = (password,token) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      password:password,
      token:token,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
 export const updateInfo = (email,name) => {
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
      }),
  })
  .then(checkResponse)
  .then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
};

const register = (email,password,name) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
    email: email,
    password:password,
    name: name,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
const login = (email,password) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
    email: email,
    password:password,
    token:localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
const logout = () => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
    token:localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
  export const getUserProfile = () => {
    const accessToken = localStorage.getItem('accessToken');
    
      if (!accessToken) {
        return Promise.reject('No accessToken available');
      }
    
      return fetch(`${baseUrl}/auth/user`, {
        method: 'GET',
        headers: {
          Authorization:accessToken,
        },
      })
        .then(checkResponse)
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