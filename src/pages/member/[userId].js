
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
import Link from "next/link";
export default function Profile(props) {


  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);
  
  useEffect(()=>{


  },[]);




    return (
      <div className="overflow-auto h-full  mt-40 profile-page">
            <div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200 text-center">
            <p >{props.member.name}</p>

            <div className="flex  justify-between"> <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total NFTs :  </span><span >{props.nfts.length}</span></div>
            </div>

           <div  className="mt-10 w-full flex gap-10 p-4">
            { props.nfts && (
            props.nfts.map((nft=>(

              <div key={nft.id} className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link href={`/project/${nft.project.id}`}>
                      <img className="rounded-t-lg" src={nft.project.image} alt="" />
                  </Link>
                  <div className="p-5">
                      <Link href={`/project/${nft.project.id}`}>
                          <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nft.project.topic.substring(0,30)+ "...."}</span>
                      </Link>
                      <div className="flex  justify-between"> <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">Contract Address :  </span><Link href={`https://goerli.etherscan.io/address/${nft.address}`}>{nft.address.substring(0,10)+ "...."}</Link></div>
                      <div className="flex  justify-between"> <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">TokenId :  </span><Link href={`https://esgwall.vercel.app/api/nft/${nft.tokenId}`}>{nft.tokenId}</Link></div>
                       <p></p>
                      <Link target="_blank" rel="noopener noreferrer" href={`https://testnets.opensea.io/assets/goerli/${nft.address}/${nft.tokenId}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View NFTs
                          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      </Link>
                  </div>
                </div>
                      //          <>
        //         <Image className="rounded"    width={175}
        //               height={175} src={nft.project.image} alt="" />
        //                  <div className="flow-root">
        // <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        // <li className="py-3 sm:py-4">
        //               <span>Project Name: </span>
        //                  <span>{nft.project.topic.substring(0,10)+ "...."}</span>
        //                  </li>
        //                  <li className="py-3 sm:py-4">
        //               <span>Address : </span>
        //                  <span>{nft.address.substring(0,10)+ "...."}</span>
        //                  </li>
                      
        //                  <li className="py-3 sm:py-4">
        //               <span>TokenId : </span>
        //                  <span>{nft.tokenId}</span>
        //                  </li>
        //               </ul>
        //               </div>
        //          </>
            )))
          )}
         </div>
         
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
     


          let nfts =await db.collection('nfts').find({
              userId: new ObjectID(ctx.params.userId)
          }).toArray();

          for (let nft of nfts){
            const metadata = await db.collection("metadata").findOne({
              tokenId:nft.tokenId
            })
            
            const project = await db.collection("projects").findOne({
                _id:metadata.projectId
              })
            
              nft["project"] = project;
    
            };


      
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
              nfts:JSON.parse(JSON.stringify(nfts)),
                member:JSON.parse(JSON.stringify(member)),
                ...props
            }
        }
    }
  ;
