import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignChats } from "../contexts_store/reducer/chats";


export const useFetchChats = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const fetchChats = async (user)=>{
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.get('http://localhost:5000/chat/show', {
            headers: headers
          })
        .then((res)=>{
            setIsLoading(false);
            dispatch(assignChats(res.data.map((chat) => {
                if (chat.isGroupChat)
                  return {
                    _id: chat._id,
                    chatName: chat.chatName,
                    users: chat.users
                  }
                else
                  return {
                    _id: chat._id,
                    chatName: chat.users.find(u => u.email !== user.email).name,
                    users: chat.users
                  }
              })))
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data);
        });

        setIsLoading(false);
    }
    return {fetchChats, isLoading, error};
};