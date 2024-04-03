import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';

const ChatPage = () => {
  const user = useSelector(getUser);
  const [chats, setChats] = useState(null);

  const fetchChat = async () => {
    const headers = { 'Authorization': `Bearer ${user.token}` };
    console.log(headers);
    const data = await axios.get('http://localhost:5000/chat/show', {
      headers: headers
    })
      .then((res) => {
        console.log(res.data);
        return res.data.map((chat) => chat.users.find(u => u.email !== user.email))
      })
      .catch((error) => {
        //console.log(error);
      });
    setChats(data);

    console.log(data);
  };

  useEffect(() => {
    if (user)
      fetchChat();
  }, [user]);

  return (
    <div>
      <h6>Chats</h6>
        {chats ?
        <ul className='list-group'>
          {chats.map((chat) => <li className='list-group-item' key={chat._id}>{chat.name}</li>)}
          </ul>
          :
          <></>
        }
    </div>
  )
}

export default ChatPage