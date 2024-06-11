import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import { deletePosts } from '../../store/postSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const logoutHandler = async () => {
    setDisabled(true)
    try {
      await authService.logout()
      dispatch(logOut())
      dispatch(deletePosts())
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
    setDisabled(false)
  }

  return (
    <button disabled={disabled} className='bg-[#E32636] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#F53E4D]' onClick={logoutHandler}>{disabled ? <div className='flex justify-center p-0.5'><div className={`animate-spin rounded-full h-5 w-5 border-t-2 border-white`}></div></div> : <div>Logout</div>}</button>
  )
}

export default LogoutBtn

