import { Link } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import doubleArrow from '../assets/double_arrow_down.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import './Header.css'
export default function Header() {
  const  {user} = useAuthContext()
  const { logout, error, isPending } = useLogout()
  const handleLogout = () => {
      logout()
  }
  return (
    <header className='header'>
        <div className="logo">
          <Link to='/'><img src={doubleArrow} alt="" /></Link>
          <h4>Project Done</h4>
        </div>

        {!user &&
        <div className="header-buttons">
          <Link to='/login' className='btn'>Login</Link> 
          <Link to='/signup' className='btn'>SignUp</Link> 
        </div>}

        {user &&  <button className='btn logout-button' onClick={handleLogout}>Logout</button>}
    </header>
  )
}
