import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {api, getEmailForgotPassword, getUserProfile, setNewPassword, updateInfo} from "../../utils/Api/api-ingredients";

export const getUser = () => {
    return (dispatch) => {
        return getUserProfile().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const setNewInfoUser = createAsyncThunk(
    "user/updateInfo",
    async ({ name, email }) => {
        const response = await updateInfo( email,name );
        return response;
    }
)

export const register = createAsyncThunk(
    "user/register",
    async ({email,password,name}) =>{
        const res = await api.register(email,password,name)
        localStorage.setItem("accessToken", res.accessToken);
        return res.user
    }
)
export const login = createAsyncThunk(
    "user/login",
    async ({email,password}) => {
        const res = await api.login(email,password);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }   
);
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async({email})=>{
        const res = await getEmailForgotPassword(email);
        return res;
    }
)
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async({password,token})=>{
        const res = await setNewPassword(password,token);
        return res;
    }
)

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await api.logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);
