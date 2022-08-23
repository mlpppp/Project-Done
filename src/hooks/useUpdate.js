import { useEffect, useState} from "react"
import { projectFirestore } from "../firebase/config"
import firebase from "firebase"

// ! update firestore document 
    // ? option:
        // "set": set field
        // "append": append to list

export default function useUpdate(collection, id) {
    const [error, setError] = useState('')
 
    const ref = projectFirestore.collection(collection).doc(id)
    
    const update = async (field, option, payload) => {
        try {
            if (option==='set') {
                await ref.update({[field]: payload})
            } else if (option==='append') {
                await ref.update({
                    [field]: firebase.firestore.FieldValue.arrayUnion(payload)
                })
            }
        } 
        catch (error) {
            setError(error.message)
            return 
        }
    }

    if(error) {
        console.log(error);
    }

    return {update, error}
}

