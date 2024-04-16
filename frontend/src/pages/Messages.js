import React, { useEffect } from 'react'
import { getMsg } from '../contexts_store/reducer/messages'
import { useSelector } from "react-redux";
import './Messages.css';
import { getUser } from '../contexts_store/reducer/user';

const Messages = () => {
  const user = useSelector(getUser);
  const msgs = useSelector(getMsg);
 
  return (
    <div>
      <div>
        Messages
      </div>
      <div className="chat-container">
        <div className="chat-box">
          {msgs.length > 0 ?
          msgs.map((msg)=>
          <div id={msg._id} className={user.email === msg.sender.email?"message current-user":"message"}>
          <div className="message-sender">{msg.sender.name}</div>
          <div className="message-text">{msg.content}</div>
        </div>
        )
            :
            <>Start Chatting now</>}
        </div>
        <div className="input-box">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Messages