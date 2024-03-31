import React from 'react'
import { assignUSer, getUser } from '../contexts_store/reducer/user'
import { assignChats, getChats } from '../contexts_store/reducer/chats'
import { assignMsg, getMsg } from '../contexts_store/reducer/messages'
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {
  const user = useSelector(getUser);
  const chats = useSelector(getChats);
  const msg = useSelector(getMsg);
  const dispatch = useDispatch();

  const handleClick = async()=>{
    dispatch(assignUSer({name: "Pran B", email: "pranb@gmail.com"}));
    dispatch(assignChats([{a:"1"},{a:"2"},{a:"3"}]));
    dispatch(assignMsg([{b:"1"},{b:"2"},{b:"3"}]));

    console.log(user);
    console.log(chats);
    console.log(msg);
  }

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default HomePage