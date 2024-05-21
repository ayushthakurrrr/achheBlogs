import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status) // other in channel
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }]

  return (
    <header>
      <Container >
        <nav className='flex justify-between flex-wrap'>
          <Link to="/">
            <Logo />
          </Link>
          <ul className='flex  gap-6'>
            {navItems.map((item) => ((item.active) ? (<li className='bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC]' key={item.name}>
              <button onClick={() => ( navigate(item.slug) )}>{item.name}</button>
            </li>) : null))}
          </ul>

          {authStatus && (
            <li className='list-none'>
              <LogoutBtn />
            </li>
          )}
        </nav>

      </Container>
    </header >

  )
}

export default Header