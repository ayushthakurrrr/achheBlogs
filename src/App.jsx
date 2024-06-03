import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth";
import { logIn, logOut } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import Loader2 from './components/Loader2';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(logIn({ userData: data }))
        }
        else {
          dispatch(logOut())
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (!isLoading) ? (
    <div className='min-h-screen'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : <Loader2 />

}

export default App
