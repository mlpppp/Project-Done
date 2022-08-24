import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import useUpdate from '../../hooks/useUpdate'
import { useHistory } from 'react-router-dom'
import './ProjectBrief.css'
export default function ProjectBrief( {document, userAvatars, userNames, userOnline} ) {
    const  {user} = useAuthContext()
    const {update, error} = useUpdate('projects', document.id)
    const [remoteError, setRemoteError] = useState('')
    const history = useHistory()

    const handleMarkComplete = async () => {
        await update('isCompleted', 'set', true)
        if (error) {
            setRemoteError(error)
        } else {
            history.push('/')
        }
    }
    return (   
    <div className="project-brief">          
        <div className="project-detail card">
            <h3>{document.prjName}</h3>
            <p>{`By ${userNames[document.createdBy]}`}</p>
            <p className='timestamp'>{`Project due by ${document.dueDate.toDate().toDateString()}`}</p>
            <p className='text-content'>{document.prjDetail}</p>
            <h4>Project is assigned to:</h4>
            {document.assignTo.map((AssignUser)=>(                               
                <img src={userAvatars[AssignUser]} 
                        key={AssignUser} 
                        className={`avatar-large ${userOnline[AssignUser] ? 'avatar-aurora':''}`}/>
            ))} 
        </div>
            { document.createdBy===user.uid && !document.isCompleted &&
                <button className='complete-btn btn' 
                        onClick={()=>handleMarkComplete()}>Mark as Complete</button>}
            {remoteError && <p className='error'>{remoteError}</p>  }
    </div> 
  )
}
