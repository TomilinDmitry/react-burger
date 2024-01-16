import { createSlice } from "@reduxjs/toolkit";

const selectedIngSlice = createSlice({
name:'selected',
initialState:{
    selectedIngredient:null,
},
reducers:{
    setSelectedIngredient (state,action) {
        state.selectedIngredient = action.payload
    }
}
})

export default selectedIngSlice.reducer;
export const {setSelectedIngredient} = selectedIngSlice.actions;