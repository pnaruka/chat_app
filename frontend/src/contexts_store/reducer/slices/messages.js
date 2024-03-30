import { createSlice } from '@reduxjs/toolkit'

export const msgSlice = createSlice({
    name:'msg',
    initialState:{
        value: []
    },
    reducers: {
        assignMsg: state => {
            state.value = state
        }
    }
})

export const {assignMsg} = msgSlice.actions;
export const getMsg = (state)=>state.msg.value;
export default msgSlice.reducer;