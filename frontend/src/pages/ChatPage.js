import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';

const ChatPage = () => {
  const user = useSelector(getUser);
  const [chats, setChats] = useState(null);

  const fetchChat = async () => {
    const headers = { 'Authorization': `Bearer ${user.token}` };
    //const data = 
    await axios.get('http://localhost:5000/chat/show', {
      headers: headers
    })
      .then((res) => {
        console.log(res);
        setChats(res.data.map((chat) => {
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
        }))
      })
      .catch((error) => {
        //console.log(error);
      });
      
    console.log(chats);
  };

  useEffect(() => {
    if (user)
      fetchChat();
  }, [user]);

  return (
    <div>
      <h6>Chats</h6>
      {chats ?
        <ul className='list-group list-group-flush list-group-item-light'>
          {chats.map((chat) => <li className='list-group-item' key={chat._id}>{chat.chatName}</li>)}
        </ul>
        :
        <></>
      }
    </div>
  )
}

export default ChatPage