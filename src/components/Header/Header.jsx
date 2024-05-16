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
      name: "All Posts",
      slug: "/all-posts",
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
        <nav>
          <Link to="/">
            <Logo />
          </Link>
          <ul>
            {navItems.map((item) => ((item.active) ? (<li key={item.name}>
              <button onClick={() => ( navigate(item.slug) )}>{item.name}</button>
            </li>) : null))}
          </ul>

          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </nav>

      </Container>
    </header >

  )
}

export default Header