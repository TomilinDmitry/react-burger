import { createSlice, PayloadAction } from "@reduxjs/toolkit"
//@ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { RootTypes } from "../../utils/Types/RootTypes";

type IngredientsState = RootTypes["container"];
const initialState: IngredientsState = {
  bun: null,
  draggedElements:[],
}

export const constructorSlice = createSlice ({
    name:"container",
    initialState,
    reducers: {
        setBun(state, action: PayloadAction<RootTypes["container"]["bun"]>) {
          state.bun = action.payload;
        },
        setDraggedElements: {
          reducer: (state, action: PayloadAction<RootTypes["container"]["draggedElements"][0]>) => {
              state.draggedElements.push(action.payload);
          },
          prepare: (ingredient: RootTypes["container"]["draggedElements"][0]) => ({
              payload: { ...ingredient, unId: uuidv4() }
          })
        },
        moveIngredient(state, action: PayloadAction<{ hoverIndex: number; dragIndex: number }>) {
          const { hoverIndex, dragIndex } = action.payload;
          const draggedElement = state.draggedElements[dragIndex];
          const newDraggedElements = [...state.draggedElements];
          newDraggedElements.splice(dragIndex, 1);
          newDraggedElements.splice(hoverIndex, 0, draggedElement);
          state.draggedElements = newDraggedElements;
        },
        deleteIngredient(state, action: PayloadAction<string>) {
          state.draggedElements = state.draggedElements.filter(el => el.unId !== action.payload);
        },
        clearElements(state) {
          state.draggedElements = []
          state.bun = null
        }
      },
    });
    
export default constructorSlice.reducer;
export const {setDraggedElements, setBun, moveIngredient, deleteIngredient, clearElements } = constructorSlice.actions;
