import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
    }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className='sticky top-0 py-4 px-2 z-20 bg-white'>
      <Container >
        <nav className='flex justify-between items-center flex-wrap'>
          <Link to="/">
            <Logo />
          </Link>
          <div className='flex gap-1 mt-1 md:gap-0 z-10'>
            <div className='relative' ref={dropdownRef}>
              <button onClick={toggleDropdown} className='md:hidden bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC]'>
                Menu
              </button>
              <ul className={`absolute md:static w-28 md:w-full rounded-md shadow-lg md:shadow-none shadow-gray-600 p-2 right-2 mt-2 md:mt-0 ${isDropdownOpen ? 'block' : 'hidden'} md:flex md:gap-2`}>
                {navItems.map((item) => (
                  item.active ? (
                    <li key={item.name}>
                      <button className='bg-[#6a5acd] text-white w-full px-3 pb-1 py-0.5 mt-0.5 md:mt-0 rounded-md hover:bg-[#7878DC]' onClick={() => navigate(item.slug)}>{item.name}</button>
                    </li>
                  ) : null
                ))}
              </ul>
            </div>
            <div>
              {authStatus && (
                <li className='list-none md:mt-2'>
                  <LogoutBtn />
                </li>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;