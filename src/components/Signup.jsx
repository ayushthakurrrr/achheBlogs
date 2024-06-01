import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn as storeLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Input, Button, Logo } from './index'
import Loader from './Loader'

const Signup = () => {
  const [error, setError] = useState('')
  const[loader, setLoader] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function createAcc(data) {
    setError('')
    setLoader(true)
    try {
      const session = await authService.createAccount(data)

      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(storeLogin({ userData: userData }))
        }
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
    setLoader(false)
  }

  if (loader) {
    return <Loader />
  }
  else {
    return (
      <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <h2 className="text-center text-2xl font-bold">Sign up to create account</h2>
          <p className="mt-2 mb-1 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          

          <form onSubmit={handleSubmit(createAcc)}>
            <div className='space-y-5'>
              <Input
                label="Full Name : "
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
              <Button type="submit" className="w-full bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC]" Children={'Create Account'} />

            </div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          </form>
        </div>

      </div>
    )
  }
}

export default Signup