import React from 'react'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import doubleArrow from '../assets/double_arrow_down.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import './Header.css'
export default function Header() {
  const  {user} = useAuthContext()
  console.log(user)
  return (
    <header className='header'>
        <div className="logo">
          <Link to='/'><img src={doubleArrow} alt="" /></Link>
          <h4>Project Done</h4>
        </div>

        {!user && <Link to='/login' className='btn'>Login</Link>} 
        {user && <LogoutBtn/>}
    </header>
  )
}
