import './App.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth";
import { logIn, logOut } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        console.log(data,'getcurrentuser')
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
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : null

}

export default App
