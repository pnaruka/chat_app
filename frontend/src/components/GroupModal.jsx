import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../contexts_store/reducer/user'
import { useSearchUsers } from '../hooks/useSearchUsers';
import { useCreateChat } from '../hooks/useCreateChats';
import { useNavigate } from 'react-router-dom';

const GroupModal = () => {
    const [groupUsers, setGroupUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const { fetchUsers, searchResults, searchKey, setSearchKey } = useSearchUsers();
    const user = useSelector(getUser);
    const {createGroupChat} = useCreateChat();
    const navigate = useNavigate()

    const addUserHandler = (member) => {
        if(!groupUsers.includes(member))
        setGroupUsers([...groupUsers, member]);
    }
    const removeUserHandler = (member) => {
        setGroupUsers([...groupUsers.filter((m) => m.email !== member.email)]);
    }

    const createGroup = async ()=>{
        await createGroupChat(user, groupUsers.map((gu)=> gu._id), groupName);
        //$('#addGroupModal').modal('hide');
        navigate('/');
        window.location.reload(false);
    }

    return (
        <div className="modal fade" id="addGroupModal" tabIndex="-1" aria-labelledby="addGroupModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="d-flex mt-3">
                            <input className="form-control me-2" type="text" placeholder="Add group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)} />
                        </div>
                        <div className="d-flex mt-3">
                            <input className="form-control me-2" type="search" placeholder="Find users" aria-label="Search"
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit" onClick={() => { fetchUsers(user) }}>Search</button>
                        </div>
                        {
                            groupUsers.length > 0 ?
                                <div className="d-flex mt-3">
                                    <ul className='list-group'>
                                    {
                                        groupUsers.map(
                                            (gu)=>
                                            <li className='list-group-item list-group-item-primary' key={gu._id} onClick={()=>{removeUserHandler(gu)}}>
                                                {gu.name}
                                            </li>
                                        )
                                    }
                                    </ul>
                                </div>
                                :
                                <></>
                        }
                        {searchResults && searchKey ?
                            <div className="d-flex mt-3">
                                <div className="row row-cols-1 row-cols-md-1 g-4">
                                    {searchResults.map((item) =>
                                        <div className="col" key={item._id}>
                                            <div className="card parent-container">
                                                <div className='left-child' onClick={() => { addUserHandler(item) }}>
                                                    <img src={item.profilePic} alt={item.name} height="50px" width="50px" />
                                                </div>
                                                <div className="card-body right-child">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.email || ""}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={createGroup} data-bs-dismiss="modal">Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupModal