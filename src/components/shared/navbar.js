import React, { useState } from 'react';
import Link from 'next/link';
//import { isAuthorized } from '@/utils/auth0';
//import ReactResizeDetector from 'react-resize-detector';
import {useUser} from '@auth0/nextjs-auth0/client';
import ActiveLink from './ActiveLink';
import Image from 'next/image';

const BsNavLink = props => {
  const { href, title, className=''} = props;
  return (
    <ActiveLink activeclassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  )
}

const BsNavBrand = () =>
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Filip Jerga</a>
  </Link>

const LoginLink = () =>
  <a className="nav-link port-navbar-link" href="/api/v1/login">Login</a>

const LogoutLink = () =>
  <a className="nav-link port-navbar-link" href="/api/v1/logout">Logout</a>


const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
        <DropdownToggle className="port-dropdown-toggle" nav caret>
          Admin
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/portfolios/new"
              title="Create Portfolio"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/blogs/editor"
              title="Blog Editor"
            />
          </DropdownItem>
          <DropdownItem>
            <BsNavLink
              className="port-dropdown-item"
              href="/dashboard"
              title="Dashboard"
            />
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

const Navbar = () => {
  const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ESGWall</span>
  </a>
  <div className="flex md:order-2">

  {!!user?
              <>
              <div className='min-w-[50px]'>
                  <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                        ></Image>
              </div>
              
              </>
              :
              <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/api/auth/login">Login</Link>
          }
   
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
  );
}

export default Navbar;