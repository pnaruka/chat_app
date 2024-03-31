import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducer/user';
import chatReducer from './reducer/chats';
import msgReducer from './reducer/messages';

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatReducer,
        msg: msgReducer
    }
})

export default store;