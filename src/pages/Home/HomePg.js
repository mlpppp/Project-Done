import React, { useState } from 'react'
// components
import FilterSelectBar from './FilterSelectBar'
import ProjectGrid from './ProjectGrid'

export default function HomePg() {
  const [filter, setFilter] = useState('all')
  return (
    <div>
      <div className="dash-board">
        <h2>Dashboard</h2>
        <FilterSelectBar setFilter={setFilter}/>
        <ProjectGrid filter={filter}/>
      </div>
    </div>
  )
}
