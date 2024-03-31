import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState:{
        value: {}
    },
    reducers: {
        assignUSer: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {assignUSer} = userSlice.actions;
export const getUser = (state)=>state.user.value;
export default userSlice.reducer;