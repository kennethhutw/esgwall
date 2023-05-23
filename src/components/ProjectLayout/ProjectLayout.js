import {useUser} from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo';
import { useContext, useEffect } from 'react';
import PostContext from '../../postContext';
import {AppHeader}  from "../AppHeader";
import { Navbar } from "../../components";
export const ProjectLayout = ({children, availableTokens, posts: postsFromSSR, postId, postCreated})=> {
  const {user} = useUser();

  const {setPostsFromSSR, posts, getPosts, noMorePosts, addViewCount} = useContext(PostContext);
  useEffect(()=>{
    setPostsFromSSR(postsFromSSR)
    if(postId){
      addViewCount({postId});
      const exists = postsFromSSR.find(post=> post._id === postId);
      if(!exists){
        getPosts({getNewerPosts: true, lastPostDate:postCreated});
      }
    }
  },[postsFromSSR, postId, postCreated, getPosts]);


    return (
      <div className="grid grid-cols-[1fr_300px] h-screen max-h-screen">
        <AppHeader></AppHeader>
        <Navbar></Navbar> 
        {children}
        <div className="flex flex-col text-white overflow-hidden">
          <div className="bg-gray-800 px-2">
           
              <Link href="/token-topup" className='btn'>Topup Token </Link>
              <Link href="/post/new" className='btn my-2'>new post </Link>
              <Link href="/token-topup" className='block mt-2 text-center'> <FontAwesomeIcon icon={faCoins}  className="text-yellow-500"/><span className='pl-1'>{availableTokens}  tokens available</span>  </Link>
          </div>
         
        </div>
      </div >
    )
  }