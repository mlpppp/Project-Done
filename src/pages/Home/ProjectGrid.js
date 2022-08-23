import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useHistory } from 'react-router-dom'
import './ProjectGrid.css' 

export default function ProjectGrid({filter}) {
    const { documents, error } = useCollection('projects')
    const { documents:userMeta, userMetaError } = useCollection('users')
    const { user } =  useAuthContext()
    const history = useHistory()

    if (userMetaError) throw new Error(userMetaError)

    const filterFunction = (documents) => {
        switch(filter) {
          case 'all':
            return documents
          case 'mine':
            return documents.filter((doc)=>doc.assignTo.includes(user.uid))
          case 'development':
            return documents.filter((doc)=>doc.prjCategories.includes('development'))
          case 'design':
              return documents.filter((doc)=>doc.prjCategories.includes('design'))
          case 'sales':
            return documents.filter((doc)=>doc.prjCategories.includes('sales'))
          case 'marketing':
            return documents.filter((doc)=>doc.prjCategories.includes('marketing'))
        }
    }
    
    const mapUserMetaToHash = (userMeta) => {
        // map array of user document to object: {uid:photoURL}
        const initValue = {}
        return userMeta.reduce((accumulator, user) => {
            // console.log(user);
            return {
                ...accumulator,
                [user.uid]:user.photoURL}
        }, initValue)
    }
    
    let filteredDocuments; 
    let UserMetaHash;
    if (documents && userMeta) {
        filteredDocuments = filterFunction(documents)
        UserMetaHash = mapUserMetaToHash(userMeta)
    }

    const handleRedirect = (id)=>{
        console.log("handleRedirect");
        history.push(`/projects/${id}`)
    }
    

  return (
    <div className='project-grid'>
        {(filteredDocuments===undefined ||filteredDocuments.length===0) && <p>"Nothing to be displayed"</p> }
        {error && <p>{error}</p> }
        {filteredDocuments && UserMetaHash && filteredDocuments.map((doc)=>(
            <div className="card project-card" key={doc.id} onClick={()=>handleRedirect(doc.id)}>
                <h4>{doc.prjName}</h4>
                <p className='timestamp'>{`Due by ${doc.dueDate.toDate().toDateString()}`}</p>    
                <hr/>
                
                {doc.assignTo.map((AssignUser)=>(                               
                    <img src={UserMetaHash[AssignUser]} key={AssignUser} className='avatar' />
                ))}         
            </div>
        )) }
    </div>
  )
}
