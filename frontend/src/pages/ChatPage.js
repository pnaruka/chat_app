import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';
import { useFetchChats } from '../hooks/useFetchChats';
import { getChats } from '../contexts_store/reducer/chats';

const ChatPage = () => {
  const user = useSelector(getUser);
  const chats = useSelector(getChats);
  const {fetchChats, error} = useFetchChats();

  useEffect(() => {
    //if (user)
    console.log(user);
    fetchChats(user);
  }, [user]);

  return (
    <div>
      <h6>Chats</h6>
      {
        error ?
        <div>
          <p>No chats to show</p>
        </div>
        : <></>
      }
      {chats ?
        <ul className='list-group list-group-flush list-group-item-light'>
          {chats.map((chat) => <li className='list-group-item' key={chat._id}>
            <div className="row row-cols-1 row-cols-md-1 g-4">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{chat.chatName}</h5>
                    <p className="card-text">{chat.lastMessage || "No message"}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>)}
        </ul>
        :
        <></>
      }
    </div>
  )
}

export default ChatPage