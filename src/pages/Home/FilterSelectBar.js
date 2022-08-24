import { useState } from 'react'
import './FilterSelectBar.css'
const projectFilterOptions = ['all', 'mine', 'development', 'design', 'sales', 'marketing', ]
const projectSortOptions = ['createdAt', 'dueDate']
export default function FilterSelectBar( {setFilter, setSort} ) {
    const [selectFilter, setSelectFilter] = useState('all')
    const [selectSort, setSelectSort] = useState('dueDate')

    const handleClickFilter = (filter) => {
        setSelectFilter(filter)
        setFilter(filter)
    }

    const handleClickSort = (filter) => {
        setSelectSort(filter)
        setSort(filter)
    }

    return (
        <div className='project-filter'>
            <div className="filter-section">
            <span>Filter by:</span>
                {projectFilterOptions.map((filter)=>(
                    <button 
                        className={selectFilter === filter ? 'active':''}
                        key={filter} 
                        onClick={()=>handleClickFilter(filter)}>{filter}
                    </button>
                ))}
            </div>
            <div className="sort-section">
                <span>Sort by:</span>
                {projectSortOptions.map((filter)=>(
                    <button 
                        className={selectSort === filter ? 'active':''}
                        key={filter} 
                        onClick={()=>handleClickSort(filter)}>{filter}
                    </button>
                ))}
            </div>


        </div>
    )
}
