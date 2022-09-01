import { useState,useEffect } from "react"

import ChatList from "./ChatList";

import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from "../hooks/useFirestore";
import useUpdate from "../hooks/useUpdate";
import useFetchById from "../hooks/useFetchById";

import tDown from '../assets/thumb_down.svg'
import tUp from '../assets/thumb_up.svg'
import chat from '../assets/chat.svg'

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import './CommentModal.css'


export default function CommentModal({commentId, comment, userAvatars, userNames}) {
    const { user } = useAuthContext()
    const {document:comment_realtime, fetchCommentError} = useFetchById('comments',commentId) 
        if (fetchCommentError) {console.log(fetchCommentError)}

    const { deleteDocument: deleteCommentRemote, response:deleteCommentResponse } = useFirestore('comments')
    const {update:updateCommentList, updateCommentListError} = useUpdate('projects', comment.prjId)

    
    const [lowAreaDisplay, setLowAreaDisplay] = useState('chat')

    // chat
        // update
    const { addDocument: addToChat, addToChatResponse } = useFirestore('chats')
    const {update:updateChatList, updateChatListError} = useUpdate('comments', comment.id)
    const [chatInput, setChatInput] = useState('')

    // functions
    const deleteComment = async () => {
        await updateCommentList('comments', 'pop', comment.id)
        await deleteCommentRemote(comment.id)
        if (deleteCommentResponse.error || updateCommentListError) {
            console.log('error')
        }
        window.location.reload(false);
    }

    const submitChat = async ()=> {
        if (chatInput.length===0) {
            return
        }
        const doc = {        
            comment:chatInput,
            createdBy:user.uid,
            commentId: comment.id
        }
        const addedDoc = await addToChat(doc)
        if (addedDoc) {
            console.log(addedDoc);
            await updateChatList('chats', 'append', addedDoc.id)
        }
        console.log('Warning: here is a uncaught error');
    }

    console.log(comment_realtime)
  return (
    <div className="comment-modal" >
        {comment.createdBy === user.uid &&
            <button type="button" className="btn delete-comment" onClick={()=>deleteComment()}>Delete Comment</button>
        }

        <div className="comment-content">
            <div className="row avatar-name">
                <img src={userAvatars[comment.createdBy]} className='avatar-small' />
                <span>{userNames[comment.createdBy]}</span>
            </div>
            <p className="timestamp" >{`${formatDistanceToNow(comment.createdAt.toDate(), {addSuffix:true})}`}</p>
            <p className="text-content">{comment.comment}</p>   
        </div>
        
        <div className="low-area-switch">
            <img src={chat} onClick={()=>setLowAreaDisplay('chat')}/>    
            <img src={tUp} onClick={()=>setLowAreaDisplay('up')}/>                
        </div> 
        <hr />
        <div className="low-area">
            {lowAreaDisplay === 'chat' && 
                <div className="chat-area">
                    {comment_realtime && comment_realtime.chats &&  
                        <ChatList chatsId={comment_realtime.chats} userAvatars={userAvatars} userNames={userNames} commentId={comment_realtime.id}/>
                    }
                    <div className="say">
                        <textarea type="text" 
                               value={chatInput}
                               placeholder='Say something:'
                               onChange={(e)=>setChatInput(e.target.value)}/>
                        <button className="btn" onClick={()=>submitChat()}>Submit</button>
                    </div>
                </div> }
                {lowAreaDisplay === 'up' && comment_realtime.likeBy &&
                    <div className="liked-list">
                        {comment_realtime.likeBy.map((likedUser)=>(
                            <div className="liked-user" key={likedUser}>
                                <img src={userAvatars[likedUser]} className='avatar-small' />
                                <span>{`${userNames[likedUser]}`}</span> 
                                <p>{' liked the comment'}</p>
                            </div>              
                        ))}
                    </div>
                }

        </div>
    </div>

  )
}
