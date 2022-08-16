import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup' 
import './SignupPg.css'
export default function SignupPg() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {signup, error, isPending} = useSignup()

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    if (!selected.type.includes("image")) {
      setThumbnailError('File must be an image')
      return
    }
    if (selected.size > 500000) {
      setThumbnailError('Size of file must be less than 500kb')
      return
    }  
    setThumbnailError(null)
    setThumbnail(selected)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    await signup(email, password, name, thumbnail)
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div className="signup-form">
          <h3>Sign up</h3>
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
            <input type="file" id="thumbnail" 
                    onChange={handleFileChange}/>
          </div>
          {error && <p className='error'>{error}</p> }
          {thumbnailError && <p className='error'>{thumbnailError}</p> }
          
          {!isPending && <button className="btn">Sign up</button>}
          {isPending && <button className="btn" disabled>Loading</button>}
        </div>
      </form>
    </div>
  )
}
