import React from 'react'
import {useLogout} from '../hooks/useLogout'


export default function LogoutBtn() {
    const { logout, error, isPending } = useLogout()
    const handleLogout = () => {
        logout()
    }
  return (
    <>
        <button className='btn logout-button' onClick={handleLogout}>Logout</button>
    </>
  )
}
