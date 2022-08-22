import { useAuthContext } from '../../hooks/useAuthContext'
import './ProjectBrief.css'
export default function ProjectBrief( {document, userAvatars, userNames} ) {
    const  {user} = useAuthContext()
    return (   
    <div className="project-brief">          
        <div className="project-detail card">
            <h3>{document.prjName}</h3>
            <p>{`By ${userNames[document.createdBy]}`}</p>
            <p className='timestamp'>{`Project due by ${document.dueDate.toDate().toDateString()}`}</p>
            <p className='text-content'>{document.prjDetail}</p>
            <h4>Project is assigned to:</h4>
            {document.assignTo.map((AssignUser)=>(                               
                <img src={userAvatars[AssignUser]} key={AssignUser} className='avatar-large'/>
            ))} 
        </div>
            { document.createdBy===user.uid && <button className='complete-btn btn'>Mark as Complete</button>}
    </div> 
  )
}
