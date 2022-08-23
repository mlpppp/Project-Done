import { NavLink } from 'react-router-dom'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import './Navbar.css'
export default function Navbar({user}) {
    return (
        <nav>
            <div id="nav-container">
                <div className="user-info">
                    <img src={user.photoURL} alt="" className='avatar'/>
                    <h3>{`Hey, ${user.displayName}`}</h3>
                </div>
                <div className="nav-selector">
                        <NavLink exact to="/">
                            <img src={DashboardIcon} alt="" />
                            <p>Dashboard</p>
                        </NavLink>              

                        <NavLink exact to="/create">
                            <img src={AddIcon} alt="" />
                            <p>New Project</p>
                        </NavLink>
                </div>
            </div>


        </nav>
  )
}
