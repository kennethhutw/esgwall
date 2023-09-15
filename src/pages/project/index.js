
import { AppLayout } from "../../components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import {getAppProps} from './../../utils/getAppProps';
import { ProjectCard } from "../../components";
import Image from 'next/image';
export default function NewPost(props) {
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
        Projects
      </a>
    </li>
  
   
  </ol>
</nav>
                                </div>
{/* <div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200 text-center">
<span>Projects</span>
</div> */}
<section className="bg-white dark:bg-gray-900 flex flex-wrap max-w-5xl mx-auto gap-10 mt-10">
          { projects && (
            projects.map((project=>(
              <ProjectCard key={project.id} className="w-full" {...project}></ProjectCard>
            )))
          )}
      </section>

      </div>
    )
  }

  NewPost.getLayout = function getLayout(page, pageProps){

    return <AppLayout {...pageProps}>{page}</AppLayout>
  }


export const getServerSideProps =     async function getServerSideProps(ctx){
    const props =await getAppProps(ctx);
  
    return {
      props
    }
  };
