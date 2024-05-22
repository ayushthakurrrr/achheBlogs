import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      authService.logout()
      dispatch(logOut())
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <button className='bg-[#E32636] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#F53E4D]' onClick={logoutHandler}>Logout</button>
  )
}


export default LogoutBtn