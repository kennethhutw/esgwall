import {useUser} from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo';
import { useContext, useEffect } from 'react';
import PostContext from '../context/postContext';
import {AppHeader} from "./../AppHeader";
export const PublicLayout = ({children, postId, postCreated})=> {
  

  const { posts, getPublishedPosts, noMorePosts, addViewCount} = useContext(PostContext);
  useEffect(()=>{
    if(postId){
        addViewCount({postId});
    }
        getPublishedPosts({getNewerPosts: true, lastPostDate:postCreated});
    
  },[]);


    return (
      <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
        <AppHeader></AppHeader>
        <div className="flex flex-col text-white overflow-hidden">
          <div className="bg-gray-800 px-2">
              <Logo/>
          </div>
          <div className="px-4 flex-1 overflow-auto bg-gray-800">{posts.map((post)=>(
        
            <Link key={post._id} href={`/post/${post._id}` } 
            className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm hover:border-white ${postId === post._id? "bg-white/20 border-white":""}`}>{post.topic}    </Link>
          ))}
          {!!noMorePosts &&(
          <div onClick={()=>{getPosts({lastPostDate: posts[posts.length -1].created})}} 
              className='hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4'> Load more posts</div>
          )}
          </div>
          <div className="bg-gray-800 flex items-center gap-2 border-t border-black/50 h-20 px-2"> 
       
              <Link className='btn' href="/api/auth/login">Login</Link>
          
          </div>
        </div>
        {children}
      </div >
    )
  }