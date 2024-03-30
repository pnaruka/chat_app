const getUser = (data)=>{
    return{
        type: "GETUSER",
        payload: data
    }
}

const getChats = (data)=>{
    return{
        type: "GETCHATS",
        payload: data
    }
};

const getMessages = (data)=>{
    return{
        type: "GETMESSAGES",
        payload: data
    }
};