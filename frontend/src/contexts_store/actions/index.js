export const getUser = (data)=>{
    return{
        type: "GETUSER",
        payload: data
    }
}

export const getChats = (data)=>{
    return{
        type: "GETCHATS",
        payload: data
    }
};

export const getMessages = (data)=>{
    return{
        type: "GETMESSAGES",
        payload: data
    }
};