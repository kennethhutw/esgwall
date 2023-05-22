
import { PublicLayout } from "../../components/PublicLayout";
import { getSession } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import {getAppProps} from './../../utils/getAppProps';
import Link from "next/link";
export default function Post(props) {

  
    return (
      <div className="overflow-auto h-full">
            <div className="max-w-3xl mx-auto bg-white p-8">
                <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome to ContentWriter</h1>
            <p className="mb-4 text-center">Here are the steps to get started:</p>
           
            <div className="list-decimal pl-4 mb-4 text-center">
                <p>1. Register or log in to your account</p>
                <p>2. Find the "Write" button in the sidebar and click it</p>
                <p>3. You will receive 5 tokens for your first time writing</p>
                <p>4. Start creating valuable content!</p>
                <p>5. view <Link style={{
           
              color: 'blue',
              fontSize: 20,

            }} href="https://youtu.be/9LVUi-N1LUM" rel="noopener noreferrer" target="_blank">demo</Link>  </p>
            </div>
            <p className="mb-4 text-center">If you have any questions or requests, please contact us.</p>
            </section>
            </div>

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
    let userId ="";
    if(userSession?.user){
        //   user= await db.collection("users").findOne({
        //     auth0Id:userSession.user.sub
        // });

        userId = userSession.user.sub;
      }
    return{
        props:{
            id:null,
            postContent: null,
            title: null,
            metaDescription: null,
            keywords:null,
            postCreated: null,
            publish:null,
            userId:userId,
            ...props
        }
    }
}
;
