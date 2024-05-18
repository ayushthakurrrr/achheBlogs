import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const logoutHandler = () => {
  //     authService.logout()
  //         .then(
  //             dispatch(logOut())
  //         )
  //     navigate('/')
  // }

  const logoutHandler = async () => {
    try {
      await authService.logout()
      dispatch(logOut())
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  return (
    <button onClick={logoutHandler}>LogoutBtn</button>
  )
}

export default LogoutBtn