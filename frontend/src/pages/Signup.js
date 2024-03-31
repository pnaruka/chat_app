import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup({user:{name:username, email, password}})
    //console.log({username, email, password});
  }

  return (
    <div className='login-div container mt-5'>
      <div className='login-header row justify-content-center'>
        <div className="col-md-6">
          <h3>Signup</h3>
        </div>
      </div>
      <div className='login-form row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputUsername" className="form-label">Name</label>
              <input type="text" className="form-control" id="inputUsername"
                value={username}
                onChange={(e) => (setUsername(e.target.value))} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
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
      {error ?
        <div className='error-div row justify-content-center mt-3 --bs-danger-bg-subtle'>
          <div className="col-md-6 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            {error}
          </div>
        </div>
        :
        <></>}
    </div>
  )
}

export default Signup