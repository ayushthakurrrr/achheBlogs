import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn as storeLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Input, Button, Logo } from './index'
import appwriteService from '../appwrite/config'
import { setPosts } from '../store/postSlice'

const Login = () => {
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const login = async (data) => {
    setDisabled(true)
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(storeLogin({ userData: userData }))
        }
        appwriteService.getPosts()
          .then((data) => {
            if (data) {
              dispatch(setPosts(data.documents))
            }
            else {
              dispatch(setPosts([]))
            }
          })
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
    setDisabled(false)
  }

  return (
    <div className='flex items-center justify-center w-full py-20 min-h-screen'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl py-10 px-2 sm:px-10 sm:py-12 border border-black/10`}>
        <h2 className="text-center text-xl font-bold">Sign in to your account</h2>
        <p className="text-center text-base text-black/60">
          Don't have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(login)}>
          <div className='space-y-3 mt-4 text-center'>
            <Input
              placeholder={'Enter your email'}
              label={'Email : '}
              type={'email'}

              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

            <Input
              placeholder={'Enter your password'}
              label={'Password : '}
              type={"password"}

              {...register('password', {
                required: true
              })}
            />
            {errors.password && <p className="text-red-600">Password is required</p>}

            <Button
              type={'submit'}
              Children={'Next'}
              disabled={disabled}
              className='bg-[#6a5acd] w-full mt-2 text-white rounded-md hover:bg-[#7878DC]'
            />
          </div>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login