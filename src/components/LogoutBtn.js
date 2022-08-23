import {useLogout} from '../hooks/useLogout'

// this one is not used

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
