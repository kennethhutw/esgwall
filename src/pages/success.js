
import { AppLayout } from "@/components/AppLayout";
import { getAppProps } from "@/utils/getAppProps";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
export default function Success() {

    return (

       <div  className="overflow-auto h-full">
       <div className="max-w-3xl mx-auto bg-white p-8">
       <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
       <h1  className="text-center">Thank you for your purchase</h1>
        <p className="text-center text-lg mb-10">Start writing your new post now.</p>
        <Link href="/post/new" className='btn my-2'>new post </Link>
        </section>
     
       </div>
      </div>

    )
  }
  

  Success.getLayout = function getLayout(page, pageProps){

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
