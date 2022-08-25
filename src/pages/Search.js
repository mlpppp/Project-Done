import ProjectGrid from "./Home/ProjectGrid"
import TextHighlighter from '../components/TextHighlighter'
import { useLocation, Link } from "react-router-dom"
import { useCollection } from "../hooks/useCollection"
import './Search.css'
export default function Search() {
    const queryString = useLocation().search  
    const queryParam =  new URLSearchParams(queryString) 
    const keyword = queryParam.get("key") 
    const { documents, error } = useCollection('projects')

    
    function filterDataByKeyword(data, keyword) {
        console.log(keyword)
        let filteredId = new Set()
        let keyRex = new RegExp(keyword, 'i') 
        data.forEach((prj)=>{
              if (prj["prjDetail"].match(keyRex) || prj["prjName"].match(keyRex)) {
                filteredId.add(prj["id"])
              }            
        })
        filteredId = [...filteredId]
        if (filteredId.length !== 0) {
          let filteredData = data.filter(prj => filteredId.indexOf(prj["id"]) !== -1);
          return filteredData
        }
        return null  
      }

    let docsWithKeyword;
    if (documents !== null) {
        docsWithKeyword =  filterDataByKeyword(documents, keyword)
    }

  return (
    <div className="search-page">
        <h2>Search Result</h2>
        <ProjectGrid filter={'all'} sort={"dueDate"} externalDocs={docsWithKeyword} TextHighlighter={TextHighlighter} keyword={keyword}/>
        {!docsWithKeyword && <p>Cannot find any project...</p> }
    </div>
  )
}
