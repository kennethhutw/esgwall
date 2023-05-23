
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


  
  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);
  
  useEffect(()=>{

   if(props){
     const _sdgs = props.sdgs.split(",");
     setSDGs(_sdgs);

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
        <div className="grid grid-cols-[1fr_500px] h-screen max-h-screen">
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

          <div className="flex flex-col text-block overflow-hidden p-8">
           
           <div>
              <div className="h2">$10,591</div>
              <div className="body-txt body-txt--small body-txt--no-letter-space bold">raised from 78 donors</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
              </div>

                <span className="body-txt body-txt--small body-txt--no-letter-space bold">45% of $10,000</span>
            </div>
            
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-white dark:text-white bg-blue-700 p-4">USDC Donation</h5>
        <ul class="grid w-full gap-6 md:grid-cols-2">
    <li>
        <input type="radio" id="usdc-10" name="hosting" value="usdc-10" class="hidden peer" required></input>
        <label for="usdc-10" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
                <div class="w-full text-lg font-semibold">$10</div>
             
            </div>
           
        </label>
    </li>
    <li>
        <input type="radio" id="usdc-30" name="hosting" value="usdc-30" class="hidden peer"></input>
        <label for="usdc-30" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
            <div class="w-full text-lg font-semibold">$30</div>
            </div>
           
        </label>
    </li>
    <li>
        <input type="radio" id="usdc-50" name="hosting" value="usdc-50" class="hidden peer"></input>
        <label for="usdc-50" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
            <div class="w-full text-lg font-semibold">$50</div>
            </div>
           
        </label>
    </li>
    <li>
        <input type="radio" id="usdc-100" name="hosting" value="usdc-100" class="hidden peer"></input>
        <label for="usdc-100" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
            <div class="w-full text-lg font-semibold">$100</div>
            </div>
          
        </label>
    </li>
</ul>
<div>
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter donation amount (Minimum $10)</label>
            <input type="number" name="amount" id="amount"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">DONATE TODAY</button>
        
    </form>
</div>

            </div>

            
         </div>
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
