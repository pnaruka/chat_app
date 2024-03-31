import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";

export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();

    const login = async (user)=>{
        setIsLoading(true);
        setError(null);
        //console.log("Use login:", user);
        console.log(user);
        var response= await axios.post('/user/login',user)
        .then((res)=>{
            setIsLoading(false);
            return res.data;
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error);
            console.log(error);
        });
        //localStorage.setItem('user',JSON.stringify(response));

        console.log(response);
        //dispatch({type:'LOGIN', payload: response});
        setIsLoading(false);
    }
    return {login, isLoading, error};
};