import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useLogin} from '../hooks/useLogin'


export default function LoginPg() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()


  const handleLogin = async () => {
    console.log("handle loging");
    await login(email, password)
    console.log('login successful')
  }
  return (
    <div>
      <form action="">
        <div className="form-field">
          <label htmlFor="email">email:</label>
          <input type="text" id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-field">
          <label htmlFor="pw">password:</label>
          <input type="password" id="pw"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {error && <p className='error'>{error}</p> }
        {!isPending && <button className="btn" onClick={handleLogin}>Login</button>}
        {isPending && <button className="btn" disabled>Loading</button>}
        <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>
        
      </form>
    </div>
  )
}
