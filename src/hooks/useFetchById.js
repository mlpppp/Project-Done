import { useEffect, useState} from "react"
import { projectFirestore } from "../firebase/config"
export default function useFetchById(collection, id) {
    const [document, setDocument] =  useState(null)
    const [error, setError] =  useState(null)
    useEffect(() => { 
        const unsub = projectFirestore.collection(collection).doc(id).onSnapshot((doc)=>
            {
                if(doc.exists) {
                    setDocument(doc.data())
                } else {
                    setError('No document matched.')
            }})
        return () => unsub()
    }, [collection, id])


  return {document, error}
}
