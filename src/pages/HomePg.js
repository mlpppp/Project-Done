import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import LogoutBtn from '../components/LogoutBtn'

export default function HomePg() {
  const { user } =  useAuthContext()
  return (
    <div>
      {`Hello, ${user.uid}`}
      <LogoutBtn/>
    </div>
  )
}
