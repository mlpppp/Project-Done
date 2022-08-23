import { useState } from 'react'
import './ArchivePg.css'

// components
import FilterSelectBar from './Home/FilterSelectBar'


export default function ArchivePg() {
  const [filter, setFilter] = useState('all')
  return (
    <div className='archive'>    
        <h2>Archived Projects</h2>
        <FilterSelectBar setFilter={setFilter}/>
    </div>
  )
}
