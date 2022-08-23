import { useState } from "react";
import firebase from 'firebase/app';
import { timestamp, projectFirestore } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchListId from "../../hooks/useFetchListId";
import useUpdate from "../../hooks/useUpdate";
import {useFirestore} from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import './ProjectComment.css'

export default function ProjectComment({userAvatars, userNames, commentIdList, prjId, assignToList}) {
    const  [comment, setComment] = useState('')
    const  [commentError, setCommentError] = useState(null)
    const  [remoteError, setRemoteError] = useState(null)
    const { user } =  useAuthContext()
    const {documents:commentList, error:commentListError} = useFetchListId('comments', commentIdList)
    const {update, error} = useUpdate('projects', prjId)
    const {addDocument, response} = useFirestore('comments')
    // submit
    const handleComment = async (e) => {
        e.preventDefault()
        setCommentError(null)
        setRemoteError(null)

        // check comment 
        if (comment.trim().split(' ').length < 2) {
            setCommentError('Please add comment of at least 2 words.')
            setComment('')
            return
        }
        if (! assignToList.includes(user.uid)) {
            setCommentError('Only member of the project can leave a comment.')
            setComment('')
            return
        }

        // make document
        const commentDoc = {
            comment:comment,
            createdBy:user.uid,
            prjId:prjId,
        }

        // submit document, get comment id
        let addResponse;
        try {
            addResponse = await addDocument(commentDoc)
        } catch (err) {
            setRemoteError(err.message)
            return
        }

        if (addResponse) {
            try {
                // add comment id to project document
                await update('comments', 'append', addResponse.id)
                setComment('')
            } 
            catch (error) {
                setRemoteError(error.message)
                return 
            }
        }       
        else {
            setRemoteError("cannot get response from upload comment")
            return
        }
    }
    return (
        <div className="comment-block">
            <h3>Project Comments</h3>
            <div className="comment-list">
                {commentList && commentList.map((cmt) => (
                    <div className="project-comment card" key={comment.id}>
                        <div className="avatar-name">
                            <img src={userAvatars[cmt.createdBy]} className='avatar-small' />
                            <span>{userNames[cmt.createdBy]}</span>
                        </div>
                        <p className="timestamp" >{`${formatDistanceToNow(cmt.createdAt.toDate(), {addSuffix:true})}`}</p>
                        <p className="text-content">{cmt.comment}</p>
                    </div>
                ))}
            </div>
            <div className="add-project-comment">
                <h3>Leave a Comment:</h3>
                <form onSubmit={handleComment}>
                    <textarea id="comment"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}/>
                    { commentError && <p className="error">{commentError}</p> }
                    { remoteError && <p className="error">{remoteError}</p> }
                    <button className='btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}
