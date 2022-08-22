import './ProjectBrief.css'
import { useAuthContext } from '../../hooks/useAuthContext'
export default function ProjectBrief( {document, userAvatars, userNames} ) {
    const  {user} = useAuthContext()
    return (              
    <div className="project-detail card">
        <h3>{document.prjName}</h3>
        <p>{`By ${userNames[document.createdBy]}`}</p>
        <p>{`Project due by ${document.dueDate.toDate().toDateString()}`}</p>
        <p>{document.prjDetail}</p>
        <h4>Project is assigned to:</h4>
        {document.assignTo.map((AssignUser)=>(                               
            <img src={userAvatars[AssignUser]} key={AssignUser} className='avatar-large'/>
        ))} 
        { document.createdBy===user.uid && <button className='btn'>Mark as Complete</button>}
    </div>
  )
}
