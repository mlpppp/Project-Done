import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup' 

export default function SignupPg() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {signup, error, isPending} = useSignup()

  console.log(email);
  console.log(password);
  console.log(name);

  const handleSignup = async () => {
    await signup(email, password, name)
  }

  return (
    <div>
      <form action="">
        <div className="form-field">
          <label htmlFor="email">email*:</label>
          <input type="text" id="email" required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-field">
          <label htmlFor="pw">password*:</label>
          <input type="password" id="pw" required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="form-field">
          <label htmlFor="name">display name*:</label>
          <input type="text" id="name" required
                  value={name}
                  onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="form-field">
          <label htmlFor="thumbnail">profile thumbnail:</label>
          <input type="file" id="thumbnail"/>
        </div>
        {error && <p className='error'>{error}</p> }

        {!isPending && <button className="btn" onClick={handleSignup}>Sign up</button>}
        {isPending && <button className="btn" disabled>Loading</button>}
      </form>
    </div>
  )
}
