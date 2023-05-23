
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";
import { AppLayout } from "../../components/AppLayout";
import { PublicLayout } from "../../components/PublicLayout";
import {getAppProps} from '../../utils/getAppProps';
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router';
export default function Profile(props) {


  console.log("project ================", props)
  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);
  
  useEffect(()=>{


  },[]);




    return (
      <div className="overflow-auto h-full  mt-40 profile-page">
            <div className="m-auto w-ful max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200">
            <span>{props.member.name}</span></div>
      </div>
    )
  }

  Profile.getLayout = function getLayout(page, pageProps){

    if(pageProps.userId!=""){
      return <AppLayout {...pageProps}>{page}</AppLayout>
    } else{
      return <PublicLayout {...pageProps}>{page}</PublicLayout>
      
    }
}
  
  export const getServerSideProps = 
    async function getServerSideProps(ctx){

      const props = await getAppProps(ctx);
        const userSession = await getSession(ctx.req, ctx.res);
        const client = await clientPromise;
        const db = client.db("ContentAI")
    
        let userId ="";
        if(userSession?.user){
        //      user= await db.collection("users").findOne({
        //        auth0Id:userSession.user.sub
        //    });

          userId = userSession.user.sub;
        }

        const member =  await db.collection("users").findOne({
            _id: new ObjectID(ctx.params.userId)
        });
     
          const nfts =await db.collection('nfts').find({
              userId: new ObjectID(ctx.params.userId)
          })


      
        // if(!project){
        //     return {
        //         redirect:{
        //             destination:"/post/new",
        //             permanent:false
        //         }
        //     }
        // }
        console.log("nfts !!!!! ================", nfts)
        return{
            props:{
                member:JSON.parse(JSON.stringify(member)),
                ...props
            }
        }
    }
  ;
