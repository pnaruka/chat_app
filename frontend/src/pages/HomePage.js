import React from 'react'
//import { assignUSer, getUser } from '../contexts_store/reducer/user'
//import { assignChats, getChats } from '../contexts_store/reducer/chats'
//import { assignMsg, getMsg } from '../contexts_store/reducer/messages'
//import { useDispatch, useSelector } from 'react-redux'
import ChatPage from './ChatPage';
import Messages from './Messages';
import Drawer from './Drawer';
import './Homepage.css'

const HomePage = () => {
  //const dispatch = useDispatch();

  const handleClick = async () => {
    console.log('Click');
  }

  return (
    <div>
      <Drawer />
      <div className='container mt-5 p-3'>
        <div className='home-container'>
          <div className='chat-page'>
            <ChatPage />
          </div>
          <div className='msg-page'>
            <Messages />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage