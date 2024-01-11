import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

    export const consturctorSlice = createSlice ({
        name:"container",
        initialState:{
            bun:null,
            draggedElement:null,
            draggedElements:[],
        },
        reducers: {
            setDraggedElement(state, action) {
              if (action.payload.type !== 'bun') {
                state.draggedElement = action.payload
              } else {
                state.bun = action.payload;
              }
            },
            setDraggedElements:{
            reducer: (state, action) => {
                state.draggedElements.push(action.payload);
            },
            prepare: (ingredient) => ({
                payload: { ...ingredient, unId: uuidv4() }
            })
        },
            setBun(state) {
              state.bun = null;
            },
          },
        });
        
    export default consturctorSlice.reducer;
    export const {setDraggedElement,setDraggedElements,setBun,addIngredient} = consturctorSlice.actions;