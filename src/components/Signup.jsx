import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn as storeLogin } from '../store/authSlice'
import { setPosts } from '../store/postSlice'
import authService from '../appwrite/auth'
import appwriteService from '../appwrite/config'
import { Input, Button, Logo } from './index'

const Signup = () => {
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function createAcc(data) {
    setError('')
    setDisabled(true)
    try {
      const session = await authService.createAccount(data)

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
      <div className="flex items-center justify-center min-h-screen">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-2 py-16 sm:px-12 sm:pt-10 sm:pb-12 m-20 border border-black/10`}>
          <h2 className="text-center text-xl font-bold">Sign up to create account</h2>
          <p className="mb-4 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          
          <form onSubmit={handleSubmit(createAcc)}>
            <div className='space-y-3 text-center'>
              <Input
                label="Name : "
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && <p className="text-red-600">Name is required</p>}
              <Input
                label="Email : "
                placeholder="Enter your email"
                type="email"
                className=''
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
                })}
              />
              <Input
                label="Password : "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && <p className="text-red-600">Password is required</p>}
              <Button type="submit" className="w-full bg-[#6a5acd] text-white rounded-md hover:bg-[#7878DC]" disabled={disabled} Children={'Create Account'} />

            </div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          </form>
        </div>

      </div>
    )
  }

export default Signup