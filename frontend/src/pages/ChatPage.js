import React, { useEffect } from 'react'
import axios from 'axios';

const ChatPage = () => {

  const fetchChat = async()=>{
    const data = await axios.get('/');
    console.log(data);
  }
  useEffect(()=>{
    fetchChat();
  },[])
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage