import './ProjectBrief.css'

export default function ProjectBrief( {document, userAvatars, userNames} ) {

    return (              
    <div className="project-detail card">
        <h3>{document.prjName}</h3>
        <p>{`By ${userNames[document.createdBy]}`}</p>
        <p>{`Project due by ${document.dueDate.toDate().toDateString()}`}</p>
        <p>{document.prjDetail}</p>
        {document.assignTo.map((AssignUser)=>(                               
            <img src={userAvatars[AssignUser]} key={AssignUser} />
        ))} 
    </div>
  )
}
