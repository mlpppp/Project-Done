import { useEffect, useState} from "react"
import { projectFirestore } from "../firebase/config"

//! firestore fetch single document
    // optional: _query: array containing query, according to firestore API
export default function useFetchById(collection, id) {
    const [document, setDocument] =  useState(null)
    const [error, setError] =  useState(null)


    useEffect(() => { 
        let ref = projectFirestore.collection(collection).doc(id)
        console.log("collection is queried 1 time");

        const unsub = ref.onSnapshot((doc)=>
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
