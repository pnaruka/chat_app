import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../contexts_store/reducer/user';
import { useFetchChats } from '../hooks/useFetchChats';
import { getChats } from '../contexts_store/reducer/chats';
import addIcon from '../icons/addIcon.svg'
import GroupModal from '../components/GroupModal';
import { useFetchMsgs } from '../hooks/useFetchMsgs';

const ChatPage = () => {
  const user = useSelector(getUser);
  const chats = useSelector(getChats);
  const { fetchChats, error } = useFetchChats();
  const {fetchMsgs} = useFetchMsgs();

  useEffect(() => {
    //if (user)
    //console.log(user);
    fetchChats(user);
  }, [user]);

  return (
    <div className='container'>
      <div className='header container'>
        <img src={addIcon} alt='add' data-bs-toggle="modal" data-bs-target="#addGroupModal" /> Group
        <GroupModal />
      </div>
      <div className='chats container p-3'>
        {chats ?
          <div className="row row-cols-1 row-cols-md-1 g-4">
            {chats.map((chat) =>
              <div className="col" key={chat._id} onClick={()=>{fetchMsgs(user,chat._id)}}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{chat.chatName}</h5>
                    <p className="card-text">{chat.lastMessage? chat.lastMessage.content : "No message"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          : error ?
            <div>
              <p>No chats to show</p>
            </div>
            : <></>
        }
      </div>
    </div>
  )
}

export default ChatPage