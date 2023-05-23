
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
export default function Project(props) {


  console.log("project ================", props)
  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);
  
  useEffect(()=>{

   if(props){
     const _sdgs = props.sdgs.split(",");
     setSDGs(_sdgs);
     console.log("sdgs ================", sdgs)
   }
  },[]);




    return (
      <div className="overflow-auto h-full  mt-20">
        {!!generating &&(
          <div className="text-slate-800 h-full w-full flex flex-col animate-pulse justify-center items-center">
            <FontAwesomeIcon icon={faBlog} className="text-8xl"></FontAwesomeIcon>
            <h6>loading....</h6>
          </div>
        )}

      {!generating &&(
        <div className="max-w-3xl mx-auto bg-white p-8">
           <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
           <Image  className="rounded w-full h-auto" width="0"
            height="0"
            sizes="100vw"
          src={`${props.image}`} alt="" />
           </section>
        <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
        <span className="text-gray-800 text-lg font-bold mb-4">Topic :</span>
          <p className=" text-gray-800 text-2xl">{props.topic}</p>

          </section>

          <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
            <span className="text-gray-800 text-lg font-bold mb-4">Content :</span>
            <div className="text-gray-800 mb-4" dangerouslySetInnerHTML={{__html: props.description}}></div>
          </section>

          <section className="my-4">
          <h2 className="text-gray-800 text-lg font-bold mb-4"> In support of SDGs:</h2>
            <div className="flex flex-wrap gap-2">
          
                {props.sdgs.split(',').map((goal, i)=>(
                  <Image className="rounded" key={i}   width={75}
                  height={75} src={`/icons/E-WEB-Goal-${goal}.png`} alt="" />
                  
                  ))}
              </div>
          </section>

        </div>
         )}
      </div>
    )
  }

  Project.getLayout = function getLayout(page, pageProps){

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
          //   user= await db.collection("users").findOne({
          //     auth0Id:userSession.user.sub
          // });

          userId = userSession.user.sub;
        }
        console.log("ctx.params !!!!! ================", ctx.params)
        console.log("userSession.user !!!!! ================", userSession.user)
          const project =await db.collection('projects').findOne({
              _id: new ObjectID(ctx.params.projectId)
          })
      
        // if(!project){
        //     return {
        //         redirect:{
        //             destination:"/post/new",
        //             permanent:false
        //         }
        //     }
        // }
        console.log("project !!!!! ================", project)
        return{
            props:{
              id:ctx.params.projectId,
              sdgs:project?.sdgs,
              description:project?.description,
              topic:project?.topic,
              image:project?.image,
                ...props
            }
        }
    }
  ;
