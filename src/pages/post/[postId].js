
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";
import { AppLayout } from "../../components/AppLayout";
import { PublicLayout } from "../../components/PublicLayout";
import {getAppProps} from './../../utils/getAppProps';
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import PostContext from '../../context/postContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBlog} from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router';
export default function Post(props) {

  const router = useRouter();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showPublishButton, setShowPublishButton] = useState(true);

  const [showReWriteButton, setReWriteButton] = useState(true);
  const [showReasonInput, setReasonInput] = useState(false);
  const [reasons, setReasons] = useState();
  const [generating, setGenerating] = useState(false);
  
  useEffect(()=>{

   if(props){
    if(props.publish=="1"){
      setShowPublishButton(false);
      setReWriteButton(false);
    }
   }
  },[]);


  const {deletePost} = useContext(PostContext);

  const handlePublishConfirm = async()=>{
    try{
     // setShowPublishButton(false);
       const response = await fetch('/api/publishPost',{
         method:"POST",
         headers:{
           "content-type":"application/json"
         },
         body:JSON.stringify({postId:props.id})
       });

       const json = await response.json();
       console.log("publish json")
       if(json){
         setShowPublishButton(false);
      }
    }catch(e){

    }
  }


  const handleRewrite = async(e)=>{
    try{
     // setShowPublishButton(false);
     e.preventDefault();
     setGenerating(true);
       const response = await fetch('/api/regeneratePost',{
         method:"POST",
         headers:{
           "content-type":"application/json"
         },
         body:JSON.stringify({postId:props.id,
          topic:props.title,
           keywords:props.keywords, content:props.postContent, reasons:reasons })
       });
  
       const json = await response.json();

       if(json){
        setReasonInput(false);
         Router.reload(window.location.pathname)
      }
    }catch(e){
      setGenerating(false);
    }
  }



  const handleDeleteConfirm = async()=>{
    try{
      const response = await fetch('/api/deletePost',{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({postId:props.id})
      });

      const json = await response.json();
      if(json){
        deletePost(props.id);
        router.replace('/post/new');
      }
    }catch(e){

    }
  }

    return (
      <div className="overflow-auto h-full">
        {!!generating &&(
          <div className="text-slate-800 h-full w-full flex flex-col animate-pulse justify-center items-center">
            <FontAwesomeIcon icon={faBlog} className="text-8xl"></FontAwesomeIcon>
            <h6>Generating....</h6>
          </div>
        )}

      {!generating &&(
        <div className="max-w-3xl mx-auto bg-white p-8">
        <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
            <h2 className="text-gray-800 text-lg font-bold mb-4"> SEO title and meta description</h2>
          <p className=" text-gray-800 text-2xl">{props.title}</p>
          <p className=" text-gray-800 text-sm">{props.metaDescription}</p>
          </section>

          <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
            <h2 className="text-gray-800 text-lg font-bold mb-4"> Keywords</h2>
            <ul className="flex flex-wrap">
              {props.keywords.split(',').map((keyword, i)=>(
                <i key={i} className="bg-gray-400 text-gray-800 rounded-full py-1 px-3 mr-2 mb-2">#{keyword}</i>
              ))}
            </ul>
          </section>


          <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
            <h2 className="text-gray-800 text-lg font-bold mb-4">Content :</h2>
            <div className="text-gray-800 mb-4" dangerouslySetInnerHTML={{__html: props.postContent}}></div>
          </section>

          <section className="my-4">

          {!showPublishButton &&(
              <button className="btn my-2">Published</button>
          )}
          {showPublishButton &&(

            <>

                    {showReWriteButton && !showReasonInput && (
                        <button className="btn my-2"
                        onClick={()=>setReasonInput(true)}>Rewrite</button>
                      )}

                    {!!showReasonInput && (
                      <div className="my-2">
                        <p>Are you sure you want to rewrit this post?</p>
                        <div className="grid  gap-2">
                        <textarea className="resize-none border border-slate-500 w-full my-2 px-4 py-2 rounded-sm " 
                        value={reasons} 
                        onChange={(e)=>setReasons(e.target.value)} 
                        maxLength={90}></textarea>
                        <div className="grid grid-cols-2 gap-2">
                              <button className="btn bg-stone-600 hover:bg-stone-700"
                                                  onClick={()=>setReasonInput(false)}>
                                                    Cancel
                              </button>
                              <button className="btn "
                                onClick={handleRewrite}>
                                 Confirm Rewrite
                               </button>
                        </div>
                        </div>

                      </div>
                      )}


              {showPublishButton && !showPublishConfirm && (
                        <button className="btn my-2"
                        onClick={()=>setShowPublishConfirm(true)}>Publish</button>
                      )}

              {!!showPublishConfirm && (
                      <div className="my-2">
                        <p>Are you sure you want to publish this post?</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="btn bg-stone-600 hover:bg-stone-700"
                          onClick={()=>setShowPublishConfirm(false)}>
                            Cancel
                          </button>
                          <button className="btn "
                          onClick={handlePublishConfirm}>
                            Confirm Publish
                          </button>

                        </div>

                      </div>
                      )}

                    {!showDeleteConfirm && (
                        <button className="btn bg-red-600 hover:bg-red-700"
                        onClick={()=>setShowDeleteConfirm(true)}>Delete Post</button>
                      )}

                    {!!showDeleteConfirm && (
                      <div>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="btn bg-stone-600 hover:bg-stone-700"
                          onClick={()=>setShowDeleteConfirm(false)}>
                            Cancel
                          </button>
                          <button className="btn bg-red-600 hover:bg-red-700"
                          onClick={handleDeleteConfirm}>
                            Confirm delete
                          </button>

                        </div>

                      </div>
                      )}
            </>
          )}
          
          </section>

        </div>
         )}
      </div>
    )
  }

  Post.getLayout = function getLayout(page, pageProps){

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

        const post =await db.collection('posts').findOne({
            _id: new ObjectID(ctx.params.postId)
        })
       
        if(!post){
            return {
                redirect:{
                    destination:"/post/new",
                    permanent:false
                }
            }
        }

        return{
            props:{
                id:ctx.params.postId,
                postContent: post?.postContent,
                title: post?.title,
                metaDescription: post?.metaDescription,
                keywords:post.keywords,
                postCreated: post.created.toString(),
                publish:post?.publish,
                userId:userId,
                ...props
            }
        }
    }
  ;
