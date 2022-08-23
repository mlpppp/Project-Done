import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"

//! provide user auth from firestore

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}