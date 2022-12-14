import { useState, useEffect } from 'react'
import { projectAuth, projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { projectFirestore } from '../firebase/config'

// ! manage firestore sign up by email, plus thumbnail and displayName setup
  // ! thumbnail using firebase storage, access by url
  // ! also setup user meta document in collection: user

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await projectStorage.ref(uploadPath).put(thumbnail)
      const thumbnailUrl = await img.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL:thumbnailUrl })

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: true,
        displayName,
        photoURL: thumbnailUrl,
        uid: res.user.uid,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}