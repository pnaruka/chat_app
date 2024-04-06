import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../contexts_store/reducer/user'
import './Drawer.css';
import { useLogout } from '../hooks/useLogOut';

const Drawer = () => {
    const user = useSelector(getUser);
    const {logout} = useLogout();
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
                        <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Type a name" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
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