import React from 'react'
import authService from '../../appwriteSer/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/storeSlice'
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch(() => { });
    }
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        >Logout</button>
    )
}

export default LogoutBtn
