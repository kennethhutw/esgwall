import React, { useState } from 'react';
import Link from 'next/link';
//import { isAuthorized } from '@/utils/auth0';
//import ReactResizeDetector from 'react-resize-detector';
import {useUser} from '@auth0/nextjs-auth0/client';
import ActiveLink from './ActiveLink';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Navbar = () => {
  const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isNavOpen, setIsNavOpen] = useState(false); 
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  return (
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link href="/" className="flex items-center">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ESGWall</span>
  </Link>
  <div className="flex md:order-2">

  {!!user?
              <>
              {/* <div className='min-w-[50px]'>
                  <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                        ></Image>
                        <Link className="text-sm" href="/api/auth/logout">Logout</Link>
              </div>
               */}
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3">
                  <div>
                    <button type="button" onClick={() => setNavbarOpen((prev) => !prev)} className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                        ></Image>
                    </button>
                  </div>

                  <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${navbarOpen ? ' ' : 'hide-menu'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <Link className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0" href="/profile" onClick={() => setNavbarOpen((prev) => !prev)}>Your Profile</Link>
                    <Link className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0" href="/admin/projects" onClick={() => setNavbarOpen((prev) => !prev)}>Admin</Link>
                    <Link className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0" href="/api/auth/logout" onClick={() => setNavbarOpen((prev) => !prev)}>Logout</Link>
                  </div>
                </div>
              </div>
              </>
              :
              <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/api/auth/login">Login</Link>
          }
   
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false"   onClick={() => setIsNavOpen((prev) => !prev)} >
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/">Home</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/project">Projects</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/member">ESGers</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/ranking">Ranking</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link href="/team">Team</Link>
              </li>
            </ul>
          </div>
  </div>

  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link href="/" className={router.pathname == "/" ? "active-link" : "link"} aria-current="page">Home</Link>
      </li>
      <li>
        <Link href="/project" className={router.pathname == "/project" ? "active-link" : "link"}>Projects</Link>
      </li>
      <li>
        <Link href="/member" className={router.pathname == "/member" ? "active-link" : "link"}>ESGers</Link>
      </li>
      <li>
        <Link href="/ranking" className={router.pathname == "/ranking" ? "active-link" : "link"}>Ranking</Link>
      </li>
      <li>
        <Link href="/team" className={router.pathname == "/team" ? "active-link" : "link"}>Team</Link>
      </li>
      <li>
      <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/project/new">Create Project</Link>
      </li>
    </ul>
  </div>
  </div>
  <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
      
.hide-menu {
  display: none;
  transform: translateX(0px);
}
    `}</style>
</nav>
  );
}

export default Navbar;