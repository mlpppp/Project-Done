import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'

import arrowRight from '../assets/arrow_circle_right.svg'
import arrowLeft from '../assets/arrow_circle_left.svg'

import Modal from './Modal'
import UserInfoModal from './UserInfoModal'

import './UserBar.css'

export default function UserBar() {
    const {documents:users, error} = useCollection('users')
    const [isCollapse, setIsCollapse] =  useState(false)
    const [infoModalOpen, setInfoModalOpen] = useState(false)
    const [infoModalUid, setInfoModalUid] = useState('')

    const handleFolding = ()=>{
        setIsCollapse(!isCollapse)
    }

    const handleClickUser = (uid) => {
        setInfoModalUid(uid)
        setInfoModalOpen(true)
    }

    return (
        <div id="user-bar">
            <div className={`user-bar-container ${isCollapse ? 'user-bar-container-collapse':''}`}>
                <h3>All Users</h3>
                <div className="user-status-list">
                    {error && <p className='error'>{error}</p> }
                    {users && users.map((usr)=>(
                        <div key={usr.id} className="user-status" >
                            {usr.online && !isCollapse && <span></span>}
                            {!isCollapse && <p>{usr.displayName}</p>}
                            <img src={usr.photoURL}  
                                onClick={()=>handleClickUser(usr.id)}
                                className={`avatar${(isCollapse && usr.online) ? ' avatar-aurora':''}`}/> 
                        </div>
                    ))}
                </div>
            
                { !isCollapse && <img src={arrowRight} alt="" className='collapse-btn'
                    onClick={handleFolding}/>}
                { isCollapse && <img src={arrowLeft} alt="" className='collapse-btn'
                    onClick={handleFolding}/>}
            </div>
            {infoModalOpen && 
            <Modal closeModal={()=>setInfoModalOpen(false)}> 
                <UserInfoModal uid={infoModalUid}/>  
            </Modal>}
        </div>
    )
}
