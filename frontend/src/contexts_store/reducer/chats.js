import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name:'chats',
    initialState:{
        value: []
    },
    reducers: {
        assignChats: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {assignChats} = chatSlice.actions;
export const getChats = (state)=>state.chats.value;
export default chatSlice.reducer;