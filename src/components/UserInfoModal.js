import { useAuthContext } from '../hooks/useAuthContext';
import  useFetchById  from '../hooks/useFetchById';
import  useUpdate  from '../hooks/useUpdate';
import { useState,useEffect } from 'react';
import Pen from '../assets/pen.svg' 
import Done from '../assets/done.svg' 

import './UserInfoModal.css'
 

export default function UserInfoModal({uid}) {
    const { user } = useAuthContext()
    const {document:userMetas, error} = useFetchById("users", uid)
    const {update, error:updateError} = useUpdate("users", uid)
    const [isEditBio, setIsEditBio] = useState(false)

    const [isFirstEdit, setIsFirstEdit] = useState(false)
    const [noBioRecord, setNoBioRecord] = useState(false)

    const [userTitle, setUserTitle] = useState('meyTitle')
    const [userEmail, setUserEmail] = useState('aa@gmail.com')
    const [userBio, setUserBio] = useState('Add some descrition to yourself') 
    const [userStacks, setUserStacks] = useState('c--,pythonScript4,rwby')

    useEffect(()=> {
        if(userMetas && userMetas.bios) {
            console.log('update from d');
            setUserTitle(userMetas.bios.userTitle)
            setUserEmail(userMetas.bios.userEmail)
            setUserBio(userMetas.bios.userBio)
            setUserStacks(userMetas.bios.userStacks) 
            setIsFirstEdit(false)

            console.log(userMetas)
            // console.log(userEmail)
            // console.log(userBio)
            // console.log(userStacks)
        }
        if(userMetas && !userMetas.bios) {
            setIsFirstEdit(true)
            setNoBioRecord(true)
            setUserStacks(userStacks) 
        }
    }, [userMetas]) 

    if(userMetas) {
    // console.log(userTitle)
    // console.log(userEmail)
    // console.log(userBio)
    // console.log(userStacks)
}



    const submitUserBio = async () => {
        const doc =  {
            userTitle,
            userEmail,
            userBio,
            userStacks      
        }
        await update('bios', 'set', doc)
        if (updateError) {
            console.log(updateError);
        }
    }
    const cancelBioEdit = () => {
        if (userMetas && userMetas.bios) {
            setUserTitle(userMetas.bios.userTitle)
            setUserEmail(userMetas.bios.userEmail)
            setUserBio(userMetas.bios.userBio)
            setUserStacks(userMetas.bios.userStacks) 
        }
        if(userMetas && !userMetas.bios) {
            setUserTitle('meyTitle')
            setUserEmail('aa@gmail.com')
            setUserBio('Add some descrition to yourself')
            setUserStacks('c--,pythonScript4,rwby') 
        }
        setIsEditBio(false)
    }

    
    // TODO
        //! add hyperlinks to websites

    return (
        <div className='user-modal'>
            {!userMetas && <p>{"Noting to be display..."}</p>  }
            {userMetas && uid == user.uid &&
                <div>
                    <div className="row name-avatar">
                        <img src={userMetas.photoURL} className='avatar' />
                        <div className="col name-title">
                            <h3 className='user-name'>{userMetas.displayName}</h3>
                            {isEditBio && isFirstEdit && 
                                        <input type="text" 
                                                 placeholder={userTitle}   
                                                 onChange={(e)=>setUserTitle(e.target.value)}
                                                 required/> }
                            {isEditBio && !isFirstEdit && 
                                        <input type="text" 
                                                 value={userTitle}   
                                                 onChange={(e)=>setUserTitle(e.target.value)}
                                                 required/> }

                            {!isEditBio && <h4 className='user-title'>{userTitle}</h4>}
                        </div>
                    </div>
                    <hr/>
                
                    <div className='user-bio'>  
                        {user.uid === uid && 
                                <img src={Pen} 
                                     id={'modify-pen'}
                                     onClick={()=>setIsEditBio(true)} /> }

                        <div className="bio-contact">
                            <h3>Contact</h3> 
                            {isEditBio &&                      
                            <div className="edit-userbio-contact">
                                <span>{"Email: "}</span> 
                                 {isFirstEdit &&
                                    <input type="text" 
                                            placeholder={userEmail}
                                            onChange={(e)=>setUserEmail(e.target.value)}
                                            required/>}
                                 {!isFirstEdit &&
                                    <input type="text" 
                                            value={userEmail}
                                            onChange={(e)=>setUserEmail(e.target.value)}
                                            required/>}                               
                            </div> }

                            {!isEditBio && <p>{`Email: ${userEmail}`}</p>}
                        </div>

                        <div className="bio-bio">
                            <h3>{`${userMetas.displayName}'s Bio`}</h3>
                            {isEditBio && isFirstEdit &&
                                <textarea cols="30" 
                                          rows="10"
                                          placeholder={userBio}
                                          onChange={(e)=>setUserBio(e.target.value)}
                                          required/>} 
                            {isEditBio && !isFirstEdit &&
                                <textarea cols="30" 
                                          rows="10"
                                          value={userBio}
                                          onChange={(e)=>setUserBio(e.target.value)}
                                          required/>} 
                            {!isEditBio && <p>{userBio}</p>}
                        </div>

                        <div className="bio-stack">
                            <h3>{`${userMetas.displayName}'s Stack`}</h3>
                            <div className="bio-stack">
                                {isEditBio && isFirstEdit && 
                                            <input type="text" 
                                                    placeholder={'separated by space, eg: c--,pythonScript4,rwby'}   
                                                    onChange={(e)=>setUserStacks(e.target.value)}
                                                    required/> }
                                {isEditBio && !isFirstEdit && 
                                            <input type="text" 
                                                    value={userStacks}   
                                                    onChange={(e)=>setUserStacks(e.target.value)}
                                                    required/> } 
                                {!isEditBio && 
                                    <div className="row">
                                        {userStacks.split(',').map((stack)=>(
                                            <div className="stack row" key={stack}>
                                                <img src={Done} className={'done'}/>
                                                <span>{stack}</span>
                                            </div> 
                                        ))}
                                    </div>
                                }       
                            </div>
                        </div>

                        {isEditBio && <div className="bio-sumbit">
                            <button type='button' 
                                    onClick={submitUserBio}
                                    className={'btn'}>Submit</button>
                            <button type='button' 
                                    onClick={cancelBioEdit}
                                    className={'btn'}>Cancel</button>
                        </div>}
                    </div>
                </div>
            }
            
            {!noBioRecord && !(uid == user.uid) && userMetas &&
                <div>
                    <div className="row name-avatar">
                        <img src={userMetas.photoURL} className='avatar' />
                        <div className="col name-title">
                            <h3 className='user-name'>{userMetas.displayName}</h3>
                            <h4 className='user-title'>{userTitle}</h4>
                        </div>
                    </div>
                    <hr/>
                
                    <div className='user-bio'>  
                        <div className="bio-contact">
                            <h3>Contact</h3> 
                            <p>{`Email: ${userEmail}`}</p>
                        </div>

                        <div className="bio-bio">
                            <h3>{`${userMetas.displayName}'s Bio`}</h3>
                            <p>{userBio}</p>
                        </div>

                        <div className="bio-stack">
                            <h3>{`${userMetas.displayName}'s Stack`}</h3>
                            <div className="bio-stack">
                            <p>{userStacks}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {noBioRecord && !(uid === user.uid) && userMetas &&
                <div>
                    <div className="row name-avatar">
                        <img src={userMetas.photoURL} className='avatar' />
                        <div className="col name-title">
                            <h3 className='user-name'>{userMetas.displayName}</h3>
                        </div>
                    </div>
                    <hr/>
                    <p>The user did not add any profile.</p>
                </div>
            }

        </div>
    )}
