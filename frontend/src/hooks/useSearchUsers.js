import { useState} from "react";
import axios from 'axios';


export const useSearchUsers = ()=>{
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const fetchUsers = async (searchKey, user)=>{
        setIsLoading(true);
        setError(null);
        const headers = { 'Authorization': `Bearer ${user.token}` };
        await axios.get(`http://localhost:5000/user/find?search=${searchKey}`, {
            headers: headers
          })
        .then((res)=>{
            setIsLoading(false);
            setSearchResults(res.data);
            //console.log(res);
        })
        .catch((error)=>{
            setIsLoading(false);
            console.log(error);
            setError(error.response.data.message);
        });

        setIsLoading(false);
    }
    return {fetchUsers, searchResults, isLoading, error};
};