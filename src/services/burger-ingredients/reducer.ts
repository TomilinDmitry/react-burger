import {createSlice } from "@reduxjs/toolkit"
import { getIngredient } from "../../utils/Api/api-ingredients";
import { RootTypes } from "../../utils/Types/RootTypes";
type IngredientsState = RootTypes["ingredients"];
const initialState: IngredientsState = {
    data: [], 
    loading: false,
    error: null,
    activeTab: 'buns',
};

const ingredientsSlice= createSlice ({
    name:'ingredients',
    initialState,
    reducers:{
        setActiveTab (state,action){
            state.activeTab = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase (getIngredient.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase (getIngredient.fulfilled,(state,action) => {
            state.data = action.payload;
            state.error = null;
            state.loading = false
        })
        .addCase (getIngredient.rejected, (state,action)=>{
            state.error = action.error.message
        })

    }
})

export default ingredientsSlice.reducer
export const {setActiveTab} = ingredientsSlice.actions