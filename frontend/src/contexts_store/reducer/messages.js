import { createSlice } from '@reduxjs/toolkit'

export const msgSlice = createSlice({
    name:'msg',
    initialState:{
        value: []
    },
    reducers: {
        assignMsg: (state, action) => {
            state.value = action.payload
        }
    }
})

export const assignMsg = msgSlice.actions.assignMsg;
export const getMsg = (state)=>state.msg.value;
export default msgSlice.reducer;