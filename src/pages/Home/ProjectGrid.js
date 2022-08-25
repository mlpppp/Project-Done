import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useHistory } from 'react-router-dom'
import { mapUserMetaToHash } from '../../hooks/utils'
import './ProjectGrid.css' 

// ! field <filter>, <sort> is currently required, which provide filter by prjCategories and sort by either createdAt or dueDate
//  <useCompleted> is optional, if provided, it is boolean that filter the isCompleted field
// <TextHighlighter> is component, used in combination with <keyword>, to provide keyword highlight function. both optional
// <externalDocs> optional, if provided, external project document will be used instead of fetched document
  // TODO prevent fetching document when <externalDocs> provided

export default function ProjectGrid({filter, sort:sortBy, useCompleted, TextHighlighter, keyword, externalDocs}) {
    let { documents, error } = useCollection('projects')
    const { documents:userMeta, userMetaError } = useCollection('users')
    const { user } =  useAuthContext()
    const history = useHistory()
    if (userMetaError) throw new Error(userMetaError)

    // May use external documents instead of fetching data from database
    if (externalDocs !== undefined) {
      documents = externalDocs;
    }

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
        if (useCompleted === undefined) {
          return documents
        } else if (!useCompleted) {
          return documents.filter((doc)=>(doc.isCompleted === false))
        } else if (useCompleted) {
          return documents.filter((doc)=>doc.isCompleted)
        }
          
    }

    const sortArrayDocuments = (array, sortBy) => {
      array.sort((a, b) => {
        if (a[sortBy].toDate() > b[sortBy].toDate()) {
          if (sortBy === 'dueDate') return 1
          else if (sortBy === 'createdAt') return -1
        }
        if (a[sortBy].toDate() < b[sortBy].toDate()) {
          if (sortBy === 'dueDate') return -1
          else if (sortBy === 'createdAt') return 1
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
                {(!TextHighlighter || !keyword) && <h4>{doc.prjName}</h4>}
                {TextHighlighter && keyword && 
                  <h4><TextHighlighter 
                              keyword={keyword}
                              raw={doc.prjName}/></h4>}

                {sortBy === 'dueDate' && <p className='timestamp'>{`Due by ${doc.dueDate.toDate().toDateString()}`}</p>    }
                {sortBy === 'createdAt' && <p className='timestamp'>{`Created at ${doc.createdAt.toDate().toDateString()}`}</p>    }
                <hr/>
                {TextHighlighter && keyword && 
                  <p><TextHighlighter 
                              keyword={keyword}
                              raw={doc.prjDetail}/></p>}
                {(!TextHighlighter || !keyword) && <p>{doc.prjDetail.substring(0, 80)+'...'}</p>}
                {doc.assignTo.map((AssignUser)=>(                               
                    <img src={UserMetaHash[AssignUser]} key={AssignUser} className='avatar' />
                ))}         
            </div>
        )) }
    </div>
  )
}
