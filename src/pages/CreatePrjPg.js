import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { useFirestore } from "../hooks/useFirestore"
import { useCollection } from "../hooks/useCollection"
import { timestamp } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"

import './CreatePrjPg.css'

export const projectCategoriesOptions = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function CreatePrjPg() {
  const [prjName, setPrjName] = useState('')  
  const [prjDetail, setPrjDetail] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [prjCategories, setprjCategories] = useState('')

  const [assignTo, setAssignTo] = useState('')
  const { documents } = useCollection('users')
  const [userOptions, setUserOptions] = useState('')

  const [formError, setFormError] = useState(null)
  const {addDocument, response} = useFirestore('projects')

  const { user } = useAuthContext()
  const history = useHistory()

  useEffect(() => {
    if(documents) {
      setUserOptions(documents.map(user => {
        return { value: user.id, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmitProject = async (e) => {
    e.preventDefault()
    setFormError(null)
    if (prjCategories.length < 1) {
      setFormError('Please select a project category.')
      return
    }
    if (assignTo.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    let prjCategoriesList = prjCategories.map((cate)=>{
      return cate.value
    })
    let assignedToList = assignTo.map((assignUser)=>{
      return assignUser.value
    })

    // add document
    const projectDoc = {
      prjName, 
      prjDetail, 
      dueDate: timestamp.fromDate(new Date(dueDate)), 
      prjCategories: prjCategoriesList, 
      assignTo: assignedToList, 
      isCompleted: false,
      createdBy: user.uid,
      comments:[]
    }
    await addDocument(projectDoc)
    if (!response.error) {
      history.push('/')
    }
  }

  const clearForm = () => {
    setPrjName('')
    setPrjDetail('')
    setDueDate('')
    setprjCategories('')
    setAssignTo('')
  }

  return (
    <form onSubmit={handleSubmitProject}>
        <div className="create-form">
          <h3>Create a new Project</h3>

          <div className="form-field">
            <label htmlFor="prjName">Project name:</label>
            <input type="text" id="prjName" required
                    value={prjName}
                    onChange={(e)=>setPrjName(e.target.value)}/>
          </div>

          <div className="form-field">
            <label htmlFor="prjDetail">Project details:</label>
            <textarea id="prjDetail" required
                    value={prjDetail}
                    onChange={(e)=>setPrjDetail(e.target.value)}/>
          </div>

          <div className="form-field">
            <label htmlFor="dueDate">Due date:</label>
            <input required type="date" id="dueDate" 
                    value={dueDate}
                    onChange={(e)=>setDueDate(e.target.value)}/>
          </div>

          <div className="form-field">
            <label htmlFor="">Project category:</label>
            <Select
                value={prjCategories}
                onChange={(option) => setprjCategories(option)}
                options={projectCategoriesOptions}
                isMulti
            />
          </div>

          <div className="form-field">
            <label htmlFor="">Assign to:</label>
            <Select
                value={assignTo}
                onChange={(option) => setAssignTo(option)}
                options={userOptions}
                isMulti
            />
          </div>

          {formError && <p className='error'>{formError}</p> }
          {response.error && <p className='error'>{response.error}</p> }    
          {!response.isPending && <button className="btn">Submit</button>}
          {response.isPending && <button className="btn" disabled>Loading...</button>}    
        </div>

      </form>
  )
}
