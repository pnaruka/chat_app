import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user';
import chatReducer from './slices/chats';
import msgReducer from './slices/messages';

const rootReducer = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        msg: msgReducer
    }
})

export default rootReducer;