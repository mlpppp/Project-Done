import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useLogin} from '../hooks/useLogin'
import './LoginPg.css'

export default function LoginPg() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()


  const handleLogin = async (e) => {
    e.preventDefault()
    login(email, password)
  }
  return (
      <form onSubmit={handleLogin}>
        <div className="login-form">
          <h3>Login</h3>
          <div className="form-field">
            <label htmlFor="email">email:</label>
            <input type="text" id="email" required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="form-field">
            <label htmlFor="pw">password:</label>
            <input type="password" id="pw" required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          {error && <p className='error'>{error}</p> }
          {!isPending && <button className="btn">Login</button>}
          {isPending && <button className="btn" disabled>Loading</button>}
          <p className='signup-link'>Don't have an account? <Link exact to={'/signup'}>Sign Up</Link></p>
        </div>
      </form>
  )
}
