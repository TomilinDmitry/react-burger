import { createSlice } from '@reduxjs/toolkit';
import { RootTypes } from '../../../utils/Types/RootTypes';
type IngredientsState = RootTypes['selected'];
export const initialState: IngredientsState = {
  selectedIngredient: null,
};
const selectedIngSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedIngredient(state, action) {
      state.selectedIngredient = action.payload;
    },
  },
});

export default selectedIngSlice.reducer;
export const { setSelectedIngredient } = selectedIngSlice.actions;
