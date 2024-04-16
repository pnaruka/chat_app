import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { assignMsg } from '../contexts_store/reducer/messages'


export const useFetchMsgs = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const fetchMsgs = async (user,chatId)=>{
        //console.log(user);
        //console.log(chatId);
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        //console.log(headers);
        await axios.get(`http://localhost:5000/message/fetch?chatId=${chatId}`, {
            headers: headers
          })
        .then((res)=>{
            setIsLoading(false);
            //console.log(res.data);
            dispatch(assignMsg(res.data))
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data);
        });

        setIsLoading(false);
    }
    return {fetchMsgs, isLoading, error};
};