import { withApiAuthRequired , getSession} from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default withApiAuthRequired( async function handler(req, res) {
   
    const {user} = await getSession(req, res);

    const client = await clientPromise;
    const db = client.db("ContentAI")

    const userProfile = await db.collection("users").findOne({
      auth0Id:user.sub
    })

    if(!userProfile.availableTokens){
        res.status(403);
        return;
    }


    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })

    const openai = new OpenAIApi(config);

    const {postId, topic, keywords, content, reasons} = req.body;

    // if(!topic || !keywords ){
    //   res.status(422);
    //   return;
    // }

    // if(topic.length > 90 || !keywords.length > 90){
    //   res.status(422);
    //   return;
    // }

   
    const postContentResponse = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        messages:[{
            "role":"system",
            "content":"You are a blog post generator"
        },{
            "role":"user",
            "content":`ReWrite a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-seperated keywords: ${keywords} , content will be different from ${content} and reason for rewrite: ${reasons}. 
            The content should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, strong, li, ol, ul i. `
        }]
    })
  
    const postContent = postContentResponse.data.choices[0]?.message?.content || "";
 

    const titleContentResponse = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        messages:[{
            "role":"system",
            "content":"You are a blog post generator"
        },{
            "role":"user",
            "content":`ReWrite a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-seperated keywords: ${keywords}  , content will be different from ${content} and reason for rewrite: ${reasons}. 
            The content should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, strong, li, ol, ul i. `
        },{
            "role":"assistant",
            "content":postContent
        },{
            "role":"user",
            "content":"Generate appropriate title tag text for the above blog post"
        }]
    })

    const metaContentResponse = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        messages:[{
            "role":"system",
            "content":"You are a blog post generator"
        },{
            "role":"user",
            "content":`ReWrite a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-seperated keywords: ${keywords}  , content will be different from ${content} and reason for rewrite: ${reasons}. 
            The content should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, strong, li, ol, ul i. `
        },{
            "role":"assistant",
            "content":postContent
        },{
            "role":"user",
            "content":"Generate SEO-friendly meta description content for the above blog post"
        }]
    })

    const titleContent = titleContentResponse.data.choices[0]?.message?.content || "";
    const metaContent = metaContentResponse.data.choices[0]?.message?.content || "";
 


     await db.collection("users").updateOne({
        auth0Id:user.sub
      },{
        $inc:{
            availableTokens:-2
        }
      })


      const post = await db.collection("posts").updateOne({
        userId: userProfile._id,
        _id:new ObjectId(postId)
    },{
        $set:{
            postContent: postContent,
            title: titleContent,
            metaDescription: metaContent,
        }
    });
   

    

    res.status(200).json({postId: postId})
  })
  