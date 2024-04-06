import { useDispatch } from "react-redux";
import { assignUSer } from "../contexts_store/reducer/user";

export const useLogout = () =>{
    const dispatch = useDispatch();

    const logout = () =>{
        localStorage.removeItem('userToken');
        dispatch(assignUSer(null));
    }

    return {logout};
}