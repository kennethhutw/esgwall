
import { AppLayout } from "../../components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import {getAppProps} from './../../utils/getAppProps';

import Image from 'next/image';
export default function Ranking(props) {
  const router = useRouter();
  const projects = [{
    id:"646bac7878ef36f8fade3c99",
    name:"City in Nature",
    title:"We will create a green, liveable and sustainable home for Singaporeans.",
    image :"img/framework_cityinnature.jpg",
    sdgs:"11,13,14,15,17"
  },
  {
    id:"646c0d3378ef36f8fade3c9a",
    name:"Energy Reset",
    title:"Under the Energy Reset pillar, we aim to use cleaner energy sources across all sectors.",
    image :"img/framework_energyreset.jpg",
    sdgs:"7,9,11,12,13,17"
  },{
    id:"646c0e6578ef36f8fade3c9b",
    name:"Green Economy",
    title:"We will seek green growth to create new jobs, transform our industries and harness sustainability as a competitive advantage",
    image :"img/framework_greeneconomy.jpg",
    sdgs:"7,8,9,13,17"
  },{
    id:"646c0e9278ef36f8fade3c9c",
    name:"Resilient Future", 
    title:"We are starting our preparations now to deal with climate change that will last into the next century, and building up our national resilience for the future.",
    image :"img/framework_resilientfuture.jpg",
    sdgs:"2,9,13,17"
  },{
    id:"646c0eb778ef36f8fade3c9d",
    name:"Sustainable Living",
    title:"We will reduce carbon emissions and embrace sustainability by consuming less, recycling more, and taking public transport. We will also work towards our vision of becoming a Zero Waste Nation powered by a circular economy, with “Reduce, Reuse and Recycle” as a norm for citizens and businesses.",
    image :"img/framework_sustainableliving.jpg",
    sdgs:"3,4,6,9,11,12,13,17"
  },{
    id:"646c0edb78ef36f8fade3c9e",
    name:"Green Government",
    title:"The public sector will lead the way to pursue sustainable development with the GreenGov.SG initiative.",
    image :"img/greengovlogo1.png",
    sdgs:"6,9,12,13,17"
  }]

  const goals =[{
    id:"01",
    name:"1. NO POVERTY",
    projects:0,
    events:0
  },{
    id:"02",
    name:"2. ZERO HUNGER",
    projects:1,
    events:0
  },{
    id:"03",
    name:"3. GOOD HEALTH AND WELL-BEING",
    projects:1,
    events:0
  },{
    id:"04",
    name:"4. QUALITY EDUCATION",
    projects:1,
    events:0
  },{
    id:"05",
    name:"5.  GENER EQUAITY",
    projects:0,
    events:0
  },{
    id:"06",
    name:"6. CLEAN WATER AND SANITATION",
    projects:2,
    events:0
  },{
    id:"07",
    name:"7. AFFORDABLE AND CLEAN ENERGY",
    projects:2,
    events:0
  },{
    id:"08",
    name:"8. DECENT WORK AND ECONOMIC GROWTH",
    projects:1,
    events:0
  },{
    id:"09",
    name:"9. INDUSTRY, INNOVATION AND INFRASTRUCTURE",
    projects:5,
    events:1
  },{
    id:"10",
    name:"10. REDUCED INEQUALITIES",
    projects:0,
    events:2
  },{
    id:"11",
    name:"11.  SUSTAINABLE CITIES AND COMMUNITIES",
    projects:3,
    events:1
  },{
    id:"12",
    name:"12. RESPONSEIBLE CONSUMPTION AND PRODUCTION",
    projects:3,
    events:0
  },{
    id:"13",
    name:"13. CLIMATE ACTION",
    projects:6,
    events:0
  },{
    id:"14",
    name:"14. LIFE BELOW WATER",
    projects:0,
    events:2
  },{
    id:"15",
    name:"15 LIFE ON LAND",
    projects:1,
    events:0
  },{
    id:"16",
    name:"16 PEACE, JUSTICE AND STRONG INTITUIONS",
    projects:0,
    events:0
  },{
    id:"17",
    name:"17 PARTNERSHIPS FOR THE GOALS",
    projects:6,
    events:1
  }]
    


    return (
      <div className="h-full w-full mt-40">
   
<section className="bg-white dark:bg-gray-900 flex flex-wrap max-w-5xl mx-auto gap-10">
<div>ESG GOALS RANKING</div>
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ESG Goal
                </th>
                <th scope="col" className="px-6 py-3">
                    Projects
                </th>
                <th scope="col" className="px-6 py-3">
                    Events
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
                    <td className="px-6 py-4">
                    {goal.projects}
                    </td>
                    <td className="px-6 py-4">
                    {goal.events}
                    </td>
                </tr>
                ))
            )}
            
          
          
        </tbody>
    </table>
</div>
      </section>

      </div>
    )
  }

  Ranking.getLayout = function getLayout(page, pageProps){

    return <AppLayout {...pageProps}>{page}</AppLayout>
  }


export const getServerSideProps =     async function getServerSideProps(ctx){
    const props =await getAppProps(ctx);
  
    return {
      props
    }
  };
