import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

// ! firestore collection subscription, 
  //! additional query and order option

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call

  let query = useRef(_query).current
  let orderBy = useRef(_orderBy).current

  useEffect(() => {
    let ref = projectFirestore.collection(collection)
    console.log("collection is queried 1 time");
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }
    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, query, orderBy])

  return { documents, error }
}