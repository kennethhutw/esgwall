
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

<section className="bg-white dark:bg-gray-900 flex flex-wrap max-w-5xl mx-auto gap-10">
          { props.users && (
            props.users.map((user=>(
                <div key={user.id} class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
                <div class="flex flex-col items-center pb-10">
                    <h1>{user.name.charAt(0)}</h1>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                    {/* <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span> */}
                    <div class="flex mt-4 space-x-3 md:mt-6">
                        <a href={`/member/${user.id}`} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wall</a>
                        {/* <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
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
