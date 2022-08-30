import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"
//! fetch array of documents from firestore, based of array of doc id
    //! input: 
        // collection: collection name  
        // idArray: list of doc ids  
        
export default function useFetchListId(collection, idArray) {
    const [documents, setDocuments] = useState('')
    const [error, setError] = useState('')
    useEffect(() => { 
        // console.log(`begin new fetching of ${idArray.length}`)
        const fetchAllData = async () => {
            const docsPromises = idArray.map( async (docId) => 
                projectFirestore.collection(collection).doc(docId).get())

            const responses = await Promise.all(docsPromises)
            setDocuments(responses.map((res)=>res.data()))
        }
        
        fetchAllData()
            .catch(err => {
                setError(err.message)
              })
            
    }, [collection, idArray])

    if(error) {
        console.log(error);
    }

    return {documents, error}
}
