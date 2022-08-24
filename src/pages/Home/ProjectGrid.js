import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useHistory } from 'react-router-dom'
import { mapUserMetaToHash } from '../../hooks/utils'
import {sortArrayByObjectValue_date} from '../../hooks/utils'
import './ProjectGrid.css' 

export default function ProjectGrid({filter, sort:sortBy, useCompleted}) {
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
    const filterCompleted = (documents) => {
        if (useCompleted) {
          return documents.filter((doc)=>doc.isCompleted)
        } else {
          return documents.filter((doc)=>(doc.isCompleted === false))
        }
    }

    const sortArrayDocuments = (array, sortBy) => {
      array.sort((a, b) => {
        if (a[sortBy].toDate() > b[sortBy].toDate()) {
          if (sortBy === 'dueDate') return 1
          else return -1
        }
        if (a[sortBy].toDate() < b[sortBy].toDate()) {
          if (sortBy === 'dueDate') return -1
          else return 1
        }
        return 0
      })
    }
    
    let filteredDocuments; 
    let UserMetaHash;
    if (documents && userMeta) {
        filteredDocuments = filterFunction(documents)
        filteredDocuments = filterCompleted(filteredDocuments)
        sortArrayDocuments(filteredDocuments, sortBy)  
        UserMetaHash = mapUserMetaToHash(userMeta, 'photoURL')
    }

    const handleRedirect = (id)=>{
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
