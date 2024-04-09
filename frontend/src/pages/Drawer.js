import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../contexts_store/reducer/user'
import './Drawer.css';
import { useLogout } from '../hooks/useLogOut';
import { useSearchUsers } from '../hooks/useSearchUsers';
import { useCreateChat } from '../hooks/useCreateChats';

const Drawer = () => {
    const {fetchUsers, searchResults} = useSearchUsers();
    const {createChat} = useCreateChat();
    const user = useSelector(getUser);
    const {logout} = useLogout();
    const [searchKey, setSearchKey] = useState('');

    const newChatHandler = async(chatId)=>{
        await createChat(user, chatId);
        window.location.reload(false);
    }

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">baat</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    {/*<span className="navbar-toggler-icon"></span> -->*/}<img src={user.profilePic} alt='img' className='nav-profile-pic' />
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Find someone to talk to</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="d-flex mt-3">
                            <input className="form-control me-2" type="search" placeholder="Type a name" aria-label="Search"
                            value={searchKey}
                            onChange={(e)=> setSearchKey(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit" onClick={()=>{fetchUsers(searchKey,user)}}>Search</button>
                        </div>
                        { searchResults ?
                            <div className="d-flex mt-3">
                            <div className="row row-cols-1 row-cols-md-1 g-4">
                            {searchResults.map((item) =>
                                <div className="col" key={item._id}>
                                  <div className="card parent-container">
                                    <div className='left-child' onClick={()=>{newChatHandler(item._id)}}>
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
                        <div className="d-flex mt-3">
                            <button className="btn btn-danger" data-bs-dismiss="offcanvas" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Drawer