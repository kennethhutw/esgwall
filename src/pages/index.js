
import {useUser} from '@auth0/nextjs-auth0/client';
import {  useEffect } from 'react';
import { useRouter } from "next/router";

import {AppHeader}  from "./../components/AppHeader";
import { Navbar, ProjectCard } from "../components";
export default function Home() {

  const {user} = useUser();
  const router = useRouter();
  useEffect(()=>{
   
    // if(user){
    //   router.replace('/post');
    // }
  },[user]);

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
    <div className="w-screen h-screen  flex
     relative">
      <AppHeader></AppHeader>
      <Navbar></Navbar>
      <div className="w-screen h-screen  grid justify-center items-center
     relative">
      <section className="bg-white dark:bg-gray-900 mt-20">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Discover, Engage, Build: ESGWall</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Connecting ESG Project Owners and Users, Creating a Sustainable Community</p>
                <a href="/project" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-blue-500 text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                <a href="/project" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Explore
                </a> 
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="img/un-esg-icons.jpg" alt="mockup"></img>
            </div>                
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900 flex flex-wrap max-w-5xl mx-auto gap-10">
          { projects && (
            projects.map((project=>(
              <ProjectCard key={project.id} className="w-full" {...project}></ProjectCard>
            )))
          )}
      </section>
</div>
    </div>
  )
}
