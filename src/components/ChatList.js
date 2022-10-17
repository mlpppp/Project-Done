import useFetchListId from '../hooks/useFetchListId'
import { useAuthContext } from '../hooks/useAuthContext'
import { useFirestore } from "../hooks/useFirestore";
import useUpdate from '../hooks/useUpdate';
import './ChatList.css'
export default function ChatList({chatsId, userAvatars, userNames, commentId}) {
    const {documents:chatDocs, error} = useFetchListId('chats', chatsId)
    const { user } = useAuthContext()
    const { deleteDocument: deleteChatRemote, response:deleteChatResponse } = useFirestore('chats')
    const {update:updateComment, UpdateError:updateCommentError} = useUpdate('comments', commentId)

    const deleteChat = async (chatId)=>{
      await deleteChatRemote(chatId)
      await updateComment("chats", 'pop', chatId)
      if (deleteChatResponse.error || updateCommentError) {
        console.log('an error occurs')
      }
    }
  return (
    <>
    {chatDocs && 
      <div className="chat-list">
          {chatDocs && chatDocs.map((chat)=>(
              <div className="chat" key={chat.id}>
                  <p>{`${chat.comment} -`} <i>{userNames[chat.createdBy]}</i> </p>
                  {user.uid === chat.createdBy &&
                    <p id='delete-chat' onClick={()=>deleteChat(chat.id)}>delete</p>}

              </div>
          ))}
      </div>
    }
    </>
  )
}
