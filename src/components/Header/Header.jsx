// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Container, Logo, LogoutBtn } from '../index'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// const Header = () => {

//   const authStatus = useSelector((state) => state.auth.status) // other in channel
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "My Posts",
//       slug: "/my-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     }]

//   return (
//     <header>
//       <Container >
//         <nav className='flex justify-between flex-wrap'>
//           <Link to="/">
//             <Logo />
//           </Link>
//           <div>
//             <div>
//             <div className='relative'>
//               <button className='bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC] md:hidden'>Menu</button>
//               <ul className='md:flex gap-6 absolute right-2 top-8 w-24 bg-slate-400'>
//                 {navItems.map((item) => ((item.active) ? (<li className='bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC]' key={item.name}>
//                   <button onClick={() => (navigate(item.slug))}>{item.name}</button>
//                 </li>) : null))}
//               </ul>
//             </div>
//             {authStatus && (
//               <li className='list-none'>
//                 <LogoutBtn />
//               </li>
//             )}
//             </div>
//           </div>
//         </nav>

//       </Container>
//     </header >

//   )
// }

// export default Header

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Container, Logo, LogoutBtn } from '../index';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "My Posts",
//       slug: "/my-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     }
//   ];

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <header>
//       <Container >
//         <nav className='flex justify-between items-center flex-wrap'>
//           <Link to="/">
//             <Logo />
//           </Link>
//           <div className='flex gap-1 mt-1 md:gap-0 z-10'>
//             <div className='relative' >
//               <button onClick={toggleDropdown} className='md:hidden bg-[#6a5acd] text-white px-3 pb-1 py-0.5 rounded-md hover:bg-[#7878DC]'>
//                 Menu
//               </button>
//               <ul className={`absolute md:static w-28 md:w-full rounded-md shadow-lg md:shadow-none shadow-gray-600 p-2 right-2 mt-2 md:mt-0 ${isDropdownOpen ? 'block' : 'hidden'} md:flex md:gap-2`}>
//                 {navItems.map((item) => (
//                   item.active ? (
//                     <li className='bg-[#6a5acd] text-white px-3 pb-1 py-0.5 mt-0.5 md:mt-0 rounded-md hover:bg-[#7878DC]' key={item.name}>
//                       <button onClick={() => navigate(item.slug)}>{item.name}</button>
//                     </li>
//                   ) : null
//                 ))}
//               </ul>
//             </div>
//             <div>
//               {authStatus && (
//                 <li className='list-none md:mt-2'>
//                   <LogoutBtn />
//                 </li>
//               )}
//             </div>
//           </div>
//         </nav>
//       </Container>
//     </header>
//   );
// };

// export default Header;




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

  // useRef hook to create a ref for the dropdown container
  const dropdownRef = useRef(null);

  // useEffect hook to handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]); // Re-run effect when dropdownRef changes

  return (
    <header className='sticky top-0 py-4 z-20 bg-white'>
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
                    <li className='bg-[#6a5acd] text-white px-3 pb-1 py-0.5 mt-0.5 md:mt-0 rounded-md hover:bg-[#7878DC]' key={item.name}>
                      <button onClick={() => navigate(item.slug)}>{item.name}</button>
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