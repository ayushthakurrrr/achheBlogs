import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Navigate, useNavigate } from 'react-router-dom'

const LogoutBtn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout()
            .then(
                dispatch(logOut())
            )
        navigate('/')
    }
    return (
        <button onClick={logoutHandler}>LogoutBtn</button>
    )
}

export default LogoutBtn