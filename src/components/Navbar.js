import { NavLink } from 'react-router-dom'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Archive from '../assets/archive.svg'
import useFetchById from '../hooks/useFetchById'
import useUpdate from '../hooks/useUpdate'
import Pin from '../assets/pin.svg' 
import Close from '../assets/close.svg' 
import './Navbar.css'

export default function Navbar({user}) {
    // user pinned projects
    const {document, error} = useFetchById("users", user.uid)
    const {update, UpdateError} = useUpdate('users', user.uid)

    if (document) {
        var pinList = document.pinList;
    } 
    
    if (error || UpdateError) {
        error && console.log(error)
        UpdateError && console.log(error)
    }

    const deletePin = async (e, pinPrj) => {
        e.preventDefault() 
        await update("pinList", "pop", pinPrj)
        if (UpdateError) {
            console.log(UpdateError);
        }
    }

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

                        <NavLink exact to="/archive">
                            <img src={Archive} id='archive-icon' alt="" />
                            <p>Archived</p>
                        </NavLink>

                        {pinList && pinList.map((pinPrj)=>(
                            <NavLink exact to={`/projects/${pinPrj.id}`} key={pinPrj.id} >
                                <img src={Pin} id='archive-icon' alt="" />
                                <p>{pinPrj.prjName.substring(0, 12)+'...'}</p>
                                <img src={Close} id='kill-pin' onClick={(e)=>deletePin(e, pinPrj)}/>
                            </NavLink>
                        ))}
                </div>
            </div>


        </nav>
  )
}
