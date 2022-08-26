import { useState } from "react"
import Select from 'react-select'
import useUpdate from "../../hooks/useUpdate"
import './MinimalModUserForm.css'
export default function MinimalModUserForm({type, docId, assignTo, userAvatars, userNames, onCancel}) {
  const {update, error} = useUpdate("projects", docId)
  const [selectedUser, setSelectedUser] = useState('')




  const handleSubmit = async () => {
    if (type === 'add') {  var remoteOption = 'append';}
    else if (type === 'delete') {  var remoteOption = 'pop';}

    const updatePromises = selectedUser.map(async(option)=>update('assignTo', remoteOption, option.value))
    await Promise.all(updatePromises)
    onCancel()
  }

  const calculateUserOptions = () => {
    const _userAvatars = { ...userAvatars }
    const _userNames = { ...userNames }
    if (type === 'add') {
      assignTo.forEach(function(uid) {
        delete _userNames[uid];
      });
      assignTo.forEach(function(uid) {
        delete _userAvatars[uid];
      });
      return {_userNames, _userAvatars}
    } 
    
    else if (type === 'delete') {
      for (var uid in userNames) {
        if (assignTo.indexOf(uid) < 0) {
            delete _userNames[uid];
        }
      }
      for (var uid in userAvatars) {
        if (assignTo.indexOf(uid) < 0) {
            delete _userAvatars[uid];
        }
      }
      return {_userNames, _userAvatars}
    }
  }

  const {_userNames, _userAvatars} = calculateUserOptions()
  var selectList = Object.keys(_userNames)
  var options = []
  selectList.forEach((uid)=>{
    options = [...options, {value:uid, label:_userNames[uid]} ]
  })

  return (
    <div className="card mod-user-form" >
      {type === 'add' && <h4>Add users</h4> }
      {type === 'delete' && <h4>Delete users</h4> }

      <Select
          className="select"
          value={selectedUser}
          onChange={(option) => setSelectedUser(option)}
          options={options}
          isMulti/>
      <button type="button" className="btn" onClick={handleSubmit}>Submit</button>
      <button type="button" className="btn" onClick={onCancel}>Cancel</button>
  </div> 
  )
}
