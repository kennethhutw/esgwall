
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";
import { AppLayout } from "../../components/AppLayout";
import { PublicLayout } from "../../components/PublicLayout";
import {getAppProps} from './../../utils/getAppProps';
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostContext from '@/context/postContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router';
export default function Post(props) {
  console.log("project props ==========", props)
  const router = useRouter();

  
  useEffect(()=>{

   if(props){
    
   }
  },[]);




    return (
      <div className="overflow-auto h-full">
       {props.id}
      </div>
    )
  }

  Post.getLayout = function getLayout(page, pageProps){

    if(pageProps.userId!=""){
      return <AppLayout {...pageProps}>{page}</AppLayout>
    } else{
      return <PublicLayout {...pageProps}>{page}</PublicLayout>
      
    }
}
  
  export const getServerSideProps = 
    async function getServerSideProps(ctx){

      const props = await getAppProps(ctx);
        

        return{
            props:{

                ...props
            }
        }
    }
  ;
