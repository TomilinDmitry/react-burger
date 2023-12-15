import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getIngredient = createAsyncThunk('asyncIngredient',async()=>{
    const response = await fetch ('https://norma.nomoreparties.space/api/ingredients');
    if (response.ok){
        const data =await response.json()
        return data.data
    }
})

const ingredientsSlice = createSlice ({
    name:'ingredients',
    initialState:{
        data:[],
        loading:false,
        error:null,
        activeTab:'buns',
    },
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