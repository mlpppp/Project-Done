import { useState } from 'react'
import './FilterSelectBar.css'
const projectCategoriesOptions = ['all', 'mine', 'development', 'design', 'sales', 'marketing', ]

export default function FilterSelectBar( {setFilter} ) {
    const [selected, setSelected] = useState('all')
    const handleClickFilter = (filter) => {
        setSelected(filter)
        setFilter(filter)
    }
    return (
        <div className='project-filter'>
            <span>Filter by:</span>
            {projectCategoriesOptions.map((filter)=>(
                <button 
                    className={selected === filter ? 'active':''}
                    key={filter} 
                    onClick={()=>handleClickFilter(filter)}>{filter}
                </button>
            ))}
        </div>
    )
}
