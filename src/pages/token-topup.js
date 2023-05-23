
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from 'react';

export default function Topup() {

  const [showMessage, setShowMessage] = useState("");


  const handleClick = async()=>{
     try{
      setShowMessage("");
    const response = await fetch('/api/addTokens',{
      method:'POST',
      header:{
        'content-type':'application/json'
      }
    })

    const json = await response.json();
    console.log("json ======", json)
    if(!json.message){
      window.location.href = json.session.url;
    }else{
      setShowMessage(json.message+"!  Please try again later or inform the admin.");
    }
  }catch(e){
    console.error("init stripe failed", e)
    setShowMessage(e.message);
  }
    }

    return (
      <div  className="overflow-auto h-full">
       <div className="max-w-3xl mx-auto bg-white p-8">
       <section className="bg-gray-300 rounded-lg px-6 py-8 mb-8">
        <h1 className="text-center text-3xl font-bold mb-10">Token Pricing</h1>
        <p className="text-center text-lg mb-10">Top up 10 tokens for only 9 USD and generate quality content effortlessly. Each token enables you to create one piece of content, while the advanced version requires two tokens per creation. Start creating valuable content today with our affordable token pricing!</p>
        <button className="btn" onClick={handleClick}>Add tokens</button>
        {showMessage && <p className="text-center  text-lg text-red-500">{showMessage}</p>}
    </section>
     
       </div>
      </div>
    )
  }
  

  Topup.getLayout = function getLayout(page, pageProps){

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
