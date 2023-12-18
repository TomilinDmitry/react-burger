import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
    export const consturctorSlice = createSlice ({
        name:"container",
        initialState:{
            bun:null,
            draggedElement:null,
            draggedElements:[],
            id:null,
        },
        reducers:{
            addConstructorItem (state,action){
                if (action.payload.type === "bun") {
                    state.bun = action.payload;
                  } else {
                    state.draggableIngredients.push(action.payload);
                    state.id = uuidv4()
                  }
            },
            
        }
    })
    export default consturctorSlice.reducer;
    export const {addConstructorItem,setDraggedElement,deleteConstructorItem,setDraggedElements} = consturctorSlice.actions;