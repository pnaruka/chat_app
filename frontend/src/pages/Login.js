import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Handle submit:", {username,password});
    //login({ username, password });

    console.log({ username, password });
  }

  return (
    <div className='login-div container mt-5'>
      <div className='login-header row justify-content-center'>
        <div className="col-md-6">
        <h3>Login</h3>
        </div>
      </div>
      <div className='login-form row justify-content-center'>
        <div className='col-md-6'>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"
              value={username}
              onChange={(e) => (setUsername(e.target.value))} />
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
          {/* {error && <div className='error'>{error}</div>} */}
        </form>
        </div>
      </div>
      <div className='to-signup row justify-content-center'>
        <div  className='col-md-6 offset-md-3'>
          <Link to='/signup'> <button className='btn btn-light'>Signup</button> </Link>
        </div>
      </div>
    </div>
  )
}

export default Login