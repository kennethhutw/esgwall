
import { AppLayout } from "@/components/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import {getAppProps} from './../../utils/getAppProps';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
export default function NewPost(props) {
  const router = useRouter();
  // const [postContent, setPostContent] = useState("");
  const [topic, setTopic] = useState("");
  const [descr, setDescr] = useState("");
  const [sdgs, setSDGs] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleSDGs = (e)=>{
     e.preventDefault();
     if(e.target.value){
      // insert
     }else{
      // remove
     }
  }
  const handleClick = async (e)=>{
    e.preventDefault();
    setGenerating(true)
    try{
      const response = await fetch('/api/generatePost',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({topic, descr})
      })

      const json = await response.json();

      if(json?.postId){
        router.push(`/post/${json?.postId}`);
      }
    }catch(e){
      setGenerating(false);
    }
  }
    


    return (
      <div className="h-full w-full">

        <div className="w-full h-full flex flex-col overflow-auto mt-10">
          <form onSubmit={handleClick} className="m-auto w-ful max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border-slate shadow-slate-200">
            <div>
              <label>
                <strong>
                Title :
                </strong>
                <input className="resize-none border border-slate-500 w-full my-2 px-4 py-2 rounded-sm " value={topic} onChange={(e)=>setTopic(e.target.value)} ></input>
                </label> 
            </div> 
            <div>
              <label>
                <strong>
                  Description:
                </strong>
                <textarea className="resize-none border border-slate-500 w-full my-2 px-4 py-2 rounded-sm " 
                value={descr} 
                onChange={(e)=>setDescr(e.target.value)}
                maxLength={90}
                ></textarea>
               
                </label> 
            </div> 
            <div>
              <label>
                <strong>
                SUSTAINABLE DEVELOPMENT GOALS (SDGS):
                </strong>
                </label>
                </div>
            <div className="flex flex-wrap gap-2">
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-01.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-02.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-03.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-04.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-05.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-06.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-07.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-08.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-09.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-10.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-11.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-12.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-13.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-14.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-15.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded" width={75}
                      height={75} src="/icons/E-WEB-Goal-16.png" alt="" /></span>
                </label>
              </div>
              <div className="mt-2 mb-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="w-4 h-4"  />
                  <span className="ml-2"><Image className="rounded"    width={75}
                      height={75} src="/icons/E-WEB-Goal-17.png" alt="" /></span>
                </label>
              </div>
            </div>
            <button className="btn" type="submit" disabled={!topic.trim()|| !keywords.trim()}>Generate</button>
          </form>
        </div>

      </div>
    )
  }

  NewPost.getLayout = function getLayout(page, pageProps){

    return <AppLayout {...pageProps}>{page}</AppLayout>
  }


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx){
    const props =await getAppProps(ctx);
  
    return {
      props
    }
  }
});
