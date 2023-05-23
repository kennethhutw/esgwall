import {useUser} from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo';
import { useContext, useEffect } from 'react';

import {AppHeader}  from "./../AppHeader";
import { Navbar } from "../../components";
export const AppLayout = ({children, availableTokens, posts: postsFromSSR, postId, postCreated})=> {
  const {user} = useUser();


    return (
      <div className=" w-screen h-screen max-h-screen">
      <AppHeader></AppHeader>
       <Navbar></Navbar> 
        {children}
      </div >
    )
  }