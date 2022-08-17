import { useState } from 'react'
import './FilterSelectBar.css'
const projectCategoriesOptions = ['development', 'design', 'sales', 'marketing', 'all', 'mine']
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
