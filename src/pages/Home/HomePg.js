import { useState } from 'react'
import './HomePg.css'
// components
import FilterSelectBar from './FilterSelectBar'
import ProjectGrid from './ProjectGrid'

export default function HomePg({useCompleted}) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('dueDate')
  return (
      <div className="dash-board">
        <h2>Dashboard</h2>
        <FilterSelectBar setFilter={setFilter} setSort={setSort}/>
        <ProjectGrid filter={filter} sort={sort} useCompleted={useCompleted}/>
      </div>
  )
}
