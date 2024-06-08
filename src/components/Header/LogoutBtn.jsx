import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import { deletePosts } from '../../store/postSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const logoutHandler = async () => {
    setLoader(true)
    try {
      await authService.logout()
      dispatch(logOut())
      dispatch(deletePosts())
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
    setLoader(false)
  }

  if (loader) return <Loader className={"h-8 w-8"} />
  else {
  return (
      <button className='bg-[#E32636] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#F53E4D]' onClick={logoutHandler}>Logout</button>
    )}
}

export default LogoutBtn

