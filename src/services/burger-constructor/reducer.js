import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
    export const consturctorSlice = createSlice ({
        name:"container",
        initialState:{
            bun:null,
            ingredients:[],
            id:null,
        },
        reducers:{
            addConstructorItem (state,action){
                if (action.payload.type === "bun") {
                    state.bun = action.payload;
                  } else {
                    state.ingredients.push(action.payload);
                    state.id = uuidv4()
                  }
            },
            deleteConstructorItem (state,action){
                state.ingredients = state.ingredients.filter ((ingredient)=>ingredient.id !== action.payload)
            }
        }
    })
    export default consturctorSlice.reducer;
    export const {addConstructorItem} = consturctorSlice.actions;