
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

   console.log("props=============",props)
  const router = useRouter();

  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState("nfts");
  useEffect(()=>{
    if(props){
      calGoals(props.nfts)
    }

  },[]);

  const calGoals = (nfts)=>{

    nfts.forEach((nft, i) => {
  
      nft.project.sdgs.split(',').forEach((goal, i) => {
        console.log("goal==========", goal)
        var name = goal;
        if(goal<10){
          name ="0"+ goal;
        }
       var index =goals.findIndex(x => x.id === name);
       if(index >-1){
        goals[index].amount +=1;
        console.log("goals[index]==========",  goals[index])
        console.log("amount==========",  goals.amount)
       }
      })
    })
  }

  const goals =[{
    id:"01",
    name:"1. NO POVERTY",
    projects:0,
    amount:0
  },{
    id:"02",
    name:"2. ZERO HUNGER",
    projects:1,
    amount:0
  },{
    id:"03",
    name:"3. GOOD HEALTH AND WELL-BEING",
    projects:1,
    amount:0
  },{
    id:"04",
    name:"4. QUALITY EDUCATION",
    projects:1,
    amount:0
  },{
    id:"05",
    name:"5.  GENER EQUAITY",
    projects:0,
    amount:0
  },{
    id:"06",
    name:"6. CLEAN WATER AND SANITATION",
    projects:2,
    amount:0
  },{
    id:"07",
    name:"7. AFFORDABLE AND CLEAN ENERGY",
    projects:2,
    amount:0
  },{
    id:"08",
    name:"8. DECENT WORK AND ECONOMIC GROWTH",
    projects:1,
    amount:0
  },{
    id:"09",
    name:"9. INDUSTRY, INNOVATION AND INFRASTRUCTURE",
    projects:5,
    amount:1
  },{
    id:"10",
    name:"10. REDUCED INEQUALITIES",
    projects:0,
    amount:2
  },{
    id:"11",
    name:"11.  SUSTAINABLE CITIES AND COMMUNITIES",
    projects:3,
    amount:1
  },{
    id:"12",
    name:"12. RESPONSEIBLE CONSUMPTION AND PRODUCTION",
    projects:3,
    amount:0
  },{
    id:"13",
    name:"13. CLIMATE ACTION",
    projects:6,
    amount:0
  },{
    id:"14",
    name:"14. LIFE BELOW WATER",
    projects:0,
    amount:2
  },{
    id:"15",
    name:"15 LIFE ON LAND",
    projects:1,
    amount:0
  },{
    id:"16",
    name:"16 PEACE, JUSTICE AND STRONG INTITUIONS",
    projects:0,
    amount:0
  },{
    id:"17",
    name:"17 PARTNERSHIPS FOR THE GOALS",
    projects:6,
    amount:1
  }]
    
  const goalImgs =(goals)=>{
    if(!goals && goals=="")
    return "";
    let outputgoalHTML =[];
        goals.split(",").forEach((goal, i) => {
            var name = goal;
            if(goal <10){
                name ="0"+ goal;
            }
            outputgoalHTML.push(<Image className="rounded" width={50}  height={50} src={`/icons/E-WEB-Goal-${name}.png`} alt="" />);
        });

     return outputgoalHTML;
  }

    return (
      <div className="overflow-auto h-full  mt-40 profile-page">
            <div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200 text-center">
            <p >{props.member.name}</p>

            <div className="flex  justify-between"> <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total NFTs :  </span><span >{props.nfts.length}</span></div>
            </div>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                      <a href="#" onClick={(e)=>setCurrentTab("nfts")} className={"inline-block p-4 " + (currentTab=="nfts" ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                      : 'border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300') }>NFT</a>
                  </li>
                  <li className="mr-2">
                      <a href="#"  onClick={(e)=>setCurrentTab("goals")} className={"" + (currentTab=="goals" ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                      : 'inline-block p-4  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300') } aria-current="page">ESG Goals</a>
                  </li>
                
              </ul>
          </div>
           <div  className="mt-10 w-full flex gap-10 p-4   justify-center ">
           {currentTab =="nfts" &&
           <>
            { props.nfts && (
            props.nfts.map((nft=>(

              <div key={nft.id} className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link href={`/project/${nft.project._id}`}>
                      <img className="rounded-t-lg" src={nft.project.image} alt="" />
                  </Link>
                  <div className="p-5">
                      <Link href={`/project/${nft.project._id}`}>
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
   
            )))
          )}
          { !props.nfts && (<>No NFTs</>)}
          </>
            }

{currentTab =="goals" &&
           <>
            { props.nfts && (
           <div className="relative overflow-x-auto">
           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                       <th scope="col" className="px-6 py-3">
                           ESG Goal
                       </th>
                       {/* <th scope="col" className="px-6 py-3">
                           Projects
                       </th> */}
                       <th scope="col" className="px-6 py-3">
                           Amount
                       </th>
                   </tr>
               </thead>
               <tbody>
                   {goals &&(
                       goals.map((goal, i)=>(
                  
                      <tr key={goal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {goal.name}
                           </th>
                           {/* <td className="px-6 py-4">
                           {goal.projects}
                           </td> */}
                           <td className="px-6 py-4">
                           {goal.amount}
                           </td>
                       </tr>
                       ))
                   )}
                   
                 
                 
               </tbody>
           </table>
       </div>
          )}
          { !props.nfts && (<>No Projects</>)}
          </>
            }
         </div>
         <style>{`
         .profile-page{
          padding: 80px 200px;
         }
         `}</style>
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
