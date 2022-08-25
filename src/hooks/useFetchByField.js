// import { useEffect, useState} from "react"
// import { projectFirestore } from "../firebase/config"


// export default function useFetchByField(collection, id, fieldName) {
//     const [document, setDocument] =  useState(null)
//     const [error, setError] =  useState(null)


//     useEffect(() => { 
//         let ref = projectFirestore.collection(collection).doc(id)
//         console.log("collection is queried 1 time");

//         ref.get(fieldName).then((doc)=>{
//             if(doc.exists) {
//                 console.log(doc);
//                 setDocument(doc)
//             } else {
//                 setError('No document matched.')
//             }})
//     }, [collection, id])


//   return {document, error}
// }
