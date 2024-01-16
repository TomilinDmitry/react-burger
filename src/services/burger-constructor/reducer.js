import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

    export const consturctorSlice = createSlice ({
        name:"container",
        initialState:{
            bun: null,
            draggedElements:[],
        },
        reducers: {
            setBun(state, action) {
              state.bun = action.payload;
            },
            setDraggedElements: {
              reducer: (state, action) => {
                  state.draggedElements.push(action.payload);
              },
              prepare: (ingredient) => ({
                  payload: { ...ingredient, unId: uuidv4() }
              })
            },
            moveIngredient(state, action) {
              const { hoverIndex, dragIndex } = action.payload;
              const draggedElement = state.draggedElements[dragIndex];
              const newDraggedElements = [...state.draggedElements];
              newDraggedElements.splice(dragIndex, 1);
              newDraggedElements.splice(hoverIndex, 0, draggedElement);
              state.draggedElements = newDraggedElements;
            },
            deleteIngredient(state, action) {
              state.draggedElements = state.draggedElements.filter(el => el.unId !== action.payload);
            }
          },
        });
        
    export default consturctorSlice.reducer;
    export const {setDraggedElements,setBun,moveIngredient, deleteIngredient } = consturctorSlice.actions;