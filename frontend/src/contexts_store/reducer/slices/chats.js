import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name:'chats',
    initialState:{
        value: []
    },
    reducers: {
        assignChats: state => {
            state.value = state
        }
    }
})

export const {assignChats} = chatSlice.actions;
export const getChats = (state)=>state.chats.value;
export default chatSlice.reducer;