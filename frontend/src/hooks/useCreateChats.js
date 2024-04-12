import { useState} from "react";
import axios from 'axios';


export const useCreateChat = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const createChat = async (user, userId)=>{
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.post('http://localhost:5000/chat/create',{userId}, {
            headers: headers
          })
        .then(()=>{
            setIsLoading(false);
            console.log('Created');
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data.message);
        });

        setIsLoading(false);
    }

    const createGroupChat = async (user, groupUsers, groupName)=>{
        setIsLoading(true);
        setError(null);
        
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.post('http://localhost:5000/chat/group/create',{users: groupUsers, groupName}, {
            headers: headers
          })
        .then(()=>{
            setIsLoading(false);
            console.log('Created');
        })
        .catch((error)=>{
            setIsLoading(false);
            console.log(error.response);
            setError(error.response.data.message);
        });
        
        setIsLoading(false);
    }
    
    return {createChat, createGroupChat, isLoading, error};
};