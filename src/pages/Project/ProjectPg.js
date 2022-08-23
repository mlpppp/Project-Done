import { useCollection } from '../../hooks/useCollection'
import { useParams } from "react-router-dom"
import useFetchById from '../../hooks/useFetchById'
import { mapUserMetaToHash } from '../../hooks/utils'

import ProjectComment from './ProjectComment'
import ProjectBrief from './ProjectBrief'
import './ProjectPg.css'

export default function ProjectPg() {  
    const {id} = useParams()
    const {document, error} = useFetchById('projects', id)
    const { documents:userMeta, userMetaError } = useCollection('users')

    let userAvatars;
    let userNames;
    let userOnline;
    if(userMeta) {
        userAvatars = mapUserMetaToHash(userMeta, 'photoURL')
        userNames = mapUserMetaToHash(userMeta, 'displayName')
        userOnline = mapUserMetaToHash(userMeta, 'online')
    }

    return (
        <div className="project-pg">
            {document && userMeta &&
                <ProjectBrief 
                    document={{...document, id:id}}
                    userAvatars={userAvatars}
                    userNames={userNames}
                    userOnline={userOnline}/>
            }

            {document && userMeta && 
                <ProjectComment
                    commentIdList={document.comments}
                    assignToList={document.assignTo}
                    userAvatars={userAvatars}
                    userNames={userNames}
                    prjId={id}/>
            }
        </div>
    )
}
