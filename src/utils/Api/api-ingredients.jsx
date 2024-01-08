import { createAsyncThunk } from "@reduxjs/toolkit";

export const baseUrl ='https://norma.nomoreparties.space/api'

const checkResponse = (res) =>{
    return res.ok ? res.json() : res.json().then((err)=>Promise.reject(err));
};

export const getIngredient = createAsyncThunk('asyncIngredient',async()=>{
    const response = await fetch (`${baseUrl}/ingredients`);
    if (response.ok){
        const data = await checkResponse(response)
        return data.data
    }else{
        console.error (`Произошла ошибка: ${response.status}`)
    }
})

export const orderBurger = (data) => {
    return fetch (`${baseUrl}/orders`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ingredients:data,
        }),
        }).then(checkResponse)
        .then((data)=>{
            if (data?.success) return data;
            return Promise.reject(data)
        })
    }
