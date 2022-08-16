import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import arrowRight from '../assets/arrow_circle_right.svg'
import arrowLeft from '../assets/arrow_circle_left.svg'
import './UserBar.css'

export const dummyAvatar = 'https://avatars.dicebear.com/api/human/42.svg'
export const dummyUsers = [{name: "marine", isOnline:true},{name: "yorha", isOnline:false},{name: "foo", isOnline:true},{name: "doo", isOnline:false}]

export default function UserBar() {
    const {documents:users, error} = useCollection('users')
    const [isCollapse, setIsCollapse] =  useState(false)
    const handleFolding = ()=>{
        setIsCollapse(!isCollapse)
    }
    return (
        <div className={`user-bar ${isCollapse ? 'user-bar-collapse':''}`}>
            <h3>All Users</h3>
            <div className="user-status-list">
                {error && <p className='error'>{error}</p> }
                {users && users.map((usr)=>(
                    <div className="user-status" key={usr.name}>
                        {usr.online && !isCollapse && <span></span>}
                        {!isCollapse && <p>{usr.displayName}</p>}
                        <img src={usr.photoURL} alt="" className={`avatar${(isCollapse && usr.online) ? ' avatar-aurora':''}`}/> 
                    </div>
                ))}
            </div>
        
            { !isCollapse && <img src={arrowRight} alt="" className='collapse-btn'
                onClick={handleFolding}/>}
            { isCollapse && <img src={arrowLeft} alt="" className='collapse-btn'
                onClick={handleFolding}/>}
        </div>
    )
}
