import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import './Searchbar.css'
export default function Searchbar() {
const [keyword, setKeyword] = useState('')  
const history =  useHistory()

useEffect(() => {
  if (typeof(keyword)==="string" && keyword.length !== 0) {
    history.replace(`/`)
    history.replace(`search?key=${keyword}`)
  }
  // if (keyword === null) {
  //   history.replace(`/`)
  // }
}, [keyword])

return (
	<div className='search-bar'>
      <label htmlFor="keyword">Search:</label>
      <input type="text" 
             id="keyword"
             value={keyword}
             onFocus = {() => setKeyword("")} 
             onChange={(e)=>setKeyword(e.target.value)}/>  

	</div>
)
}
