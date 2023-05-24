import { withApiAuthRequired , getSession} from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../lib/mongodb";
export default withApiAuthRequired( async function handler(req, res) {
   try{
    const {user} = await getSession(req, res);

    const client = await clientPromise;
    const db = client.db("ContentAI")
    const {memberId} = req.body;

      let nfts =await db.collection('nfts').find({
          userId: new ObjectID(memberId)
      }).toArray();

       await nfts.forEach(async (nft) => {
        const metadata = await db.collection("metadata").findOne({
          tokenId:nft.tokenId
        })
        
        const project = await db.collection("projects").findOne({
            _id:metadata.projectId
          })
        
          nft["project"] = project;
        
      });
    
console.log("nfts api ==========", nfts);
    res.status(200).json(nfts)
   }catch(e){
     console.log("============",e);
   }
  })
  