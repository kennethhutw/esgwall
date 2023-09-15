
import { AppLayout } from "../../components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import {getAppProps} from './../../utils/getAppProps';
import Image from 'next/image';
import clientPromise from "../../../lib/mongodb";
export default function Members(props) {
  const router = useRouter();



    return (
      <div className="h-full w-full mt-40">
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
       <nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <a href="/launchpad" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        ESG Contributors
      </a>
    </li>
  
   
  </ol>
</nav>
                                </div>
{/* <div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200 text-center">
<span>ESG Contributors</span>
</div> */}
<section className="bg-white dark:bg-gray-900 flex flex-wrap max-w-5xl mx-auto gap-10 mt-10   justify-center ">
          { props.users && (
            props.users.map((user=>(
                <div key={user.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
                <div className="flex flex-col items-center pb-10">
                    <h1>{user.name.charAt(0)}</h1>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                    {/* <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span> */}
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <a href={`/member/${user.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wall</a>
                        {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
                    </div>
                </div>
            </div>
            )))
          )}
      </section>

      </div>
    )
  }

  Members.getLayout = function getLayout(page, pageProps){

    return <AppLayout {...pageProps}>{page}</AppLayout>
  }


export const getServerSideProps =     async function getServerSideProps(ctx){
    const props =await getAppProps(ctx);
    const client = await clientPromise;
    const db = client.db("ContentAI");

    const users = await db.collection("users").find({}).toArray();
   

    const _users =[];

    users.map((user)=>{
   
        _users.push({id:user._id,name:user.name,email:user.email});
       
    })
 
    return{
        props:{
            users:JSON.parse(JSON.stringify(_users)),
            ...props
        }
    }
  };
