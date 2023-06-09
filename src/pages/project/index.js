
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

<div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200 text-center">
<span>Projects</span>
</div>
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
