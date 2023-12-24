import { createSlice } from "@reduxjs/toolkit"

    export const consturctorSlice = createSlice ({
        name:"container",
        initialState:{
            bun:null,
            draggedElement:null,
            draggedElements:[],
            id:null,
            count:0
        },
        reducers:{
            setDraggedElement (state,action){
                if (action.payload.type !== 'bun'){
                    state.draggedElement = action.payload
                }else{
                    state.bun = action.payload
                }
            },
            setDraggedElements (state,action){
                state.draggedElements = action.payload
            },
            setBun (state){
                state.bun = null
            }
        }
    })
    export default consturctorSlice.reducer;
    export const {setDraggedElement,setDraggedElements,setBun} = consturctorSlice.actions;